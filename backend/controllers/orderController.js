const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const Cart = require('../models/Cart');

// POST /api/orders - Place an order (atomic stock deduction)
exports.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { paymentMethod, deliveryType, shippingAddress } = req.body;

    // Get user's cart
    const cart = await Cart.findOne({ user: req.user._id })
      .populate('items.product')
      .session(session);

    if (!cart || cart.items.length === 0) {
      await session.abortTransaction();
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Build order items and validate stock
    const orderItems = [];
    let total = 0;

    for (const cartItem of cart.items) {
      const product = await Product.findById(cartItem.product._id).session(session);
      if (!product) {
        await session.abortTransaction();
        return res.status(400).json({ message: `Product not found: ${cartItem.product.name}` });
      }
      if (product.quantity < cartItem.quantity) {
        await session.abortTransaction();
        return res.status(400).json({
          message: `Insufficient stock for ${product.name}. Available: ${product.quantity}`,
        });
      }

      // Atomic stock deduction
      const updated = await Product.findOneAndUpdate(
        { _id: product._id, quantity: { $gte: cartItem.quantity } },
        {
          $inc: { quantity: -cartItem.quantity },
        },
        { new: true, session }
      );

      if (!updated) {
        await session.abortTransaction();
        return res.status(400).json({ message: `Stock changed for ${product.name}. Please try again.` });
      }

      // Auto-set inStock
      if (updated.quantity === 0) {
        updated.inStock = false;
        await updated.save({ session });
      }

      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        quantity: cartItem.quantity,
        image: product.image,
      });

      total += product.price * cartItem.quantity;
    }

    // Create order
    const order = await Order.create(
      [
        {
          buyer: req.user._id,
          items: orderItems,
          total,
          paymentMethod: paymentMethod || 'cash',
          deliveryType: deliveryType || 'delivery',
          shippingAddress: shippingAddress || req.user.address,
          status: 'Pending',
        },
      ],
      { session }
    );

    // Clear cart
    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();

    res.status(201).json(order[0]);
  } catch (error) {
    await session.abortTransaction();
    res.status(500).json({ message: error.message });
  } finally {
    session.endSession();
  }
};

// GET /api/orders - Get user's order history (buyer) or all orders (seller)
exports.getOrders = async (req, res) => {
  try {
    let orders;
    if (req.user.role === 'seller') {
      orders = await Order.find().populate('buyer', 'name email').sort({ createdAt: -1 });
    } else {
      orders = await Order.find({ buyer: req.user._id }).sort({ createdAt: -1 });
    }
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/orders/:id - Get single order
exports.getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('buyer', 'name email');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    // Buyers can only see their own orders
    if (req.user.role === 'buyer' && order.buyer._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// PUT /api/orders/:id/status - Update order status (seller only)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
