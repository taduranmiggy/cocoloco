// pages/buyer/CartPage.js - Shopping cart page
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import '../../styles/pages/cart.css';

const CartPage = () => {
  const { cartItems, clearCart, calculateTotal } = useCart();
  const total = calculateTotal();

  if (cartItems.length === 0) {
    return (
      <div className="cart-page">
        <div className="empty-cart">
          <h1>Your Cart is Empty</h1>
          <p>Add some products to get started!</p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h1>Shopping Cart</h1>

        <div className="cart-content">
          {/* Cart Items */}
          <div className="cart-items">
            <div className="cart-header">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Total</span>
              <span>Action</span>
            </div>

            {cartItems.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          {/* Cart Summary */}
          <aside className="cart-summary">
            <h3>Order Summary</h3>
            
            <div className="summary-item">
              <span>Subtotal:</span>
              <span className="summary-value">₱{total.toLocaleString()}</span>
            </div>

            <div className="summary-item">
              <span>Shipping:</span>
              <span className="summary-value">₱0 (Free)</span>
            </div>

            <div className="summary-item">
              <span>Tax:</span>
              <span className="summary-value">₱0</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-item total">
              <span>Total:</span>
              <span className="summary-value">₱{total.toLocaleString()}</span>
            </div>

            <Link to="/checkout" className="btn btn-primary btn-block">
              Proceed to Checkout
            </Link>

            <Link to="/products" className="btn btn-secondary btn-block">
              Continue Shopping
            </Link>

            <button
              className="btn btn-danger btn-block"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
