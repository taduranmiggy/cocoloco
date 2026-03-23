const Order = require('../models/Order');
const Product = require('../models/Product');

// GET /api/reports/sales - Sales analytics (seller only)
exports.getSalesReport = async (req, res) => {
  try {
    const allOrders = await Order.find().sort({ createdAt: -1 });

    const totalSales = allOrders.reduce((sum, o) => sum + o.total, 0);
    const totalOrders = allOrders.length;
    const averageOrderValue = totalOrders > 0 ? +(totalSales / totalOrders).toFixed(2) : 0;

    // Today's sales
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayOrders = allOrders.filter((o) => new Date(o.createdAt) >= todayStart);
    const todaySales = todayOrders.reduce((sum, o) => sum + o.total, 0);

    // Daily breakdown (last 7 days)
    const dailyData = {};
    const dailyOrderCounts = {};
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const key = date.toLocaleDateString();
      dailyData[key] = 0;
      dailyOrderCounts[key] = 0;
    }
    allOrders.forEach((order) => {
      const key = new Date(order.createdAt).toLocaleDateString();
      if (dailyData[key] !== undefined) {
        dailyData[key] += order.total;
        dailyOrderCounts[key] += 1;
      }
    });

    // Monthly breakdown (current year)
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December',
    ];
    const currentYear = new Date().getFullYear();
    const monthlyData = {};
    const monthlyOrderCounts = {};
    monthNames.forEach((m) => { monthlyData[m] = 0; monthlyOrderCounts[m] = 0; });

    allOrders.forEach((order) => {
      const d = new Date(order.createdAt);
      if (d.getFullYear() === currentYear) {
        const m = monthNames[d.getMonth()];
        monthlyData[m] += order.total;
        monthlyOrderCounts[m] += 1;
      }
    });

    const currentMonth = monthNames[new Date().getMonth()];

    // Recent 5 orders
    const recentOrders = allOrders.slice(0, 5).map((o) => ({
      id: o._id,
      date: new Date(o.createdAt).toLocaleDateString(),
      items: o.items.length,
      total: o.total,
      status: o.status,
    }));

    res.json({
      totalSales,
      totalOrders,
      averageOrderValue,
      todaySales,
      todayOrders: todayOrders.length,
      currentMonthSales: monthlyData[currentMonth] || 0,
      dailyData,
      dailyOrderCounts,
      monthlyData,
      monthlyOrderCounts,
      recentOrders,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /api/reports/inventory - Inventory report (seller only)
exports.getInventoryReport = async (req, res) => {
  try {
    const products = await Product.find();

    const totalProducts = products.length;
    const totalItems = products.reduce((sum, p) => sum + p.quantity, 0);
    const lowStock = products.filter((p) => p.inStock && p.quantity > 0 && p.quantity <= 10);
    const outOfStock = products.filter((p) => !p.inStock || p.quantity === 0);
    const totalStockValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

    res.json({
      totalProducts,
      totalItems,
      lowStockCount: lowStock.length,
      outOfStockCount: outOfStock.length,
      totalStockValue,
      lowStockItems: lowStock.map((p) => ({ id: p._id, name: p.name, quantity: p.quantity })),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
