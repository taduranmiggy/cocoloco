// pages/seller/ReportsPage.js - Sales and inventory reports via backend API
import React, { useState, useEffect } from 'react';
import { reportAPI } from '../../services/api';
import { useProducts } from '../../context/ProductContext';
import '../../styles/pages/seller.css';

const ReportsPage = () => {
  const [dateRange, setDateRange] = useState('monthly');
  const { myProducts: products, fetchMyProducts } = useProducts();
  const [salesData, setSalesData] = useState(null);
  const [inventoryStats, setInventoryStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [sales, inventory] = await Promise.all([
          reportAPI.getSales(),
          reportAPI.getInventory(),
        ]);
        setSalesData(sales);
        setInventoryStats(inventory);
      } catch (err) {
        console.error('Failed to load reports:', err.message);
        // Fallback: compute locally from products
        setSalesData({
          totalSales: 0, totalOrders: 0, averageOrderValue: 0,
          todaySales: 0, todayOrders: 0, currentMonthSales: 0,
          dailyData: {}, dailyOrderCounts: {},
          monthlyData: {}, monthlyOrderCounts: {},
          recentOrders: [],
        });
        const lowStock = products.filter((p) => p.inStock && p.quantity > 0 && p.quantity <= 10);
        const outOfStock = products.filter((p) => !p.inStock || p.quantity === 0);
        setInventoryStats({
          totalProducts: products.length,
          totalItems: products.reduce((s, p) => s + p.quantity, 0),
          lowStockCount: lowStock.length,
          outOfStockCount: outOfStock.length,
          totalStockValue: products.reduce((s, p) => s + p.price * p.quantity, 0),
          lowStockItems: lowStock.map((p) => ({ id: p.id, name: p.name, quantity: p.quantity })),
        });
      } finally {
        setLoading(false);
      }
    };
    fetchReports();
  }, [products]);

  if (loading || !salesData || !inventoryStats) {
    return (
      <div className="seller-page">
        <div className="seller-container">
          <h1>Sales & Inventory Reports</h1>
          <p>Loading reports...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="seller-page">
      <div className="seller-container">
        <h1>Sales & Inventory Reports</h1>
        <p className="page-description">Track your sales performance and inventory status</p>

        {/* Key Metrics */}
        <section className="metrics-section">
          <div className="metric-card">
            <h3>Today's Sales</h3>
            <p className="metric-value">₱{salesData.todaySales.toLocaleString()}</p>
            <p className="metric-change">{salesData.todayOrders} order(s) today</p>
          </div>

          <div className="metric-card">
            <h3>This Month</h3>
            <p className="metric-value">₱{salesData.currentMonthSales.toLocaleString()}</p>
            <p className="metric-change">{new Date().toLocaleString('default', { month: 'long' })}</p>
          </div>

          <div className="metric-card">
            <h3>Total Sales</h3>
            <p className="metric-value">₱{salesData.totalSales.toLocaleString()}</p>
            <p className="metric-change">{salesData.totalOrders} total orders</p>
          </div>

          <div className="metric-card">
            <h3>Average Order Value</h3>
            <p className="metric-value">₱{Number(salesData.averageOrderValue).toLocaleString()}</p>
            <p className="metric-change">Per order</p>
          </div>
        </section>

        {/* Date Range Selector */}
        <section className="report-filters">
          <div className="filter-group">
            <label>Report Period:</label>
            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        </section>

        {/* Daily Sales */}
        <section className="report-section">
          <h2>Daily Sales (Last 7 Days)</h2>
          <div className="chart-container">
            <div className="simple-chart">
              {Object.entries(salesData.dailyData).map(([date, amount]) => {
                const maxAmount = Math.max(...Object.values(salesData.dailyData), 1);
                const height = (amount / maxAmount) * 100;
                return (
                  <div key={date} className="chart-bar">
                    <div
                      className="bar"
                      style={{ height: `${height || 5}%` }}
                    />
                    <div className="bar-label">{date.split('/')[0]}</div>
                    <div className="bar-value">₱{amount.toLocaleString()}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Monthly Sales */}
        <section className="report-section">
          <h2>Monthly Sales Overview</h2>
          <div className="stats-table">
            <div className="table-header">
              <span>Month</span>
              <span>Sales</span>
              <span>Orders</span>
            </div>
            {Object.entries(salesData.monthlyData).map(([month, sales]) => (
              <div key={month} className="table-row">
                <span>{month}</span>
                <span className="price">₱{sales.toLocaleString()}</span>
                <span>{salesData.monthlyOrderCounts[month]}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Orders */}
        <section className="report-section">
          <h2>Recent Orders</h2>
          {salesData.recentOrders.length > 0 ? (
            <div className="orders-table">
              <div className="table-header">
                <span>Order ID</span>
                <span>Date</span>
                <span>Items</span>
                <span>Amount</span>
                <span>Status</span>
              </div>
              {salesData.recentOrders.map((order) => (
                <div key={order.id} className="table-row">
                  <span className="order-id">#{String(order.id).slice(-8)}</span>
                  <span>{order.date}</span>
                  <span>{order.items} items</span>
                  <span className="price">₱{order.total.toLocaleString()}</span>
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No orders yet. Your sales will appear here.</p>
          )}
        </section>

        {/* Inventory Status */}
        <section className="report-section">
          <h2>Inventory Report</h2>
          <div className="inventory-stats">
            <div className="stat-item">
              <h3>Products Listed</h3>
              <p className="stat-value">{inventoryStats.totalProducts}</p>
            </div>
            <div className="stat-item">
              <h3>Total Stock Units</h3>
              <p className="stat-value">{inventoryStats.totalItems.toLocaleString()}</p>
            </div>
            <div className="stat-item">
              <h3>Low Stock Items</h3>
              <p className="stat-value">{inventoryStats.lowStockCount}</p>
            </div>
            <div className="stat-item">
              <h3>Out of Stock</h3>
              <p className="stat-value">{inventoryStats.outOfStockCount}</p>
            </div>
            <div className="stat-item">
              <h3>Total Stock Value</h3>
              <p className="stat-value">₱{inventoryStats.totalStockValue.toLocaleString()}</p>
            </div>
          </div>

          {inventoryStats.lowStockItems && inventoryStats.lowStockItems.length > 0 && (
            <div className="low-stock-alert">
              <h3>Low Stock Items (10 units or less)</h3>
              <ul>
                {inventoryStats.lowStockItems.map((p) => (
                  <li key={p.id}>{p.name} — {p.quantity} left</li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default ReportsPage;
