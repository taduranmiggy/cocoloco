// pages/buyer/TransactionHistoryPage.js - Order history via backend API
import React, { useState, useEffect } from 'react';
import { orderAPI } from '../../services/api';
import '../../styles/pages/transactions.css';

const ORDER_STEPS = ['Pending', 'Processing', 'Shipped', 'Delivered'];

const OrderTimeline = ({ status }) => {
  const currentIdx = ORDER_STEPS.indexOf(status);
  const isCancelled = status === 'Cancelled';

  if (isCancelled) {
    return (
      <div className="order-timeline">
        <div className="timeline-step cancelled">
          <div className="step-dot">✕</div>
          <span className="step-label">Cancelled</span>
        </div>
      </div>
    );
  }

  return (
    <div className="order-timeline">
      {ORDER_STEPS.map((step, idx) => (
        <React.Fragment key={step}>
          <div className={`timeline-step ${idx <= currentIdx ? 'completed' : ''} ${idx === currentIdx ? 'current' : ''}`}>
            <div className="step-dot">{idx < currentIdx ? '✓' : idx + 1}</div>
            <span className="step-label">{step}</span>
          </div>
          {idx < ORDER_STEPS.length - 1 && (
            <div className={`timeline-line ${idx < currentIdx ? 'completed' : ''}`} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const TransactionHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await orderAPI.getAll();
        setOrders(data);
      } catch (err) {
        console.error('Failed to load orders:', err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="transactions-page">
        <div className="transactions-container">
          <h1>Order History</h1>
          <p>Loading orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="transactions-page">
        <div className="transactions-container">
          <h1>Order History</h1>
          <div className="no-transactions">
            <p>You haven't placed any orders yet.</p>
            <a href="/products" className="btn btn-primary">
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="transactions-page">
      <div className="transactions-container">
        <h1>Order History</h1>

        <div className="transactions-list">
          {orders.map((order) => (
            <div key={order._id || order.id} className="transaction-card">
              <div className="transaction-header">
                <div>
                  <h3>Order #{(order._id || order.id).slice(-8)}</h3>
                  <p className="transaction-date">
                    {new Date(order.createdAt || order.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="transaction-status">
                  <span className={`status-badge status-${order.status.toLowerCase()}`}>
                    {order.status}
                  </span>
                </div>
              </div>

              <div className="transaction-items">
                <h4>Items:</h4>
                <ul>
                  {order.items.map((item, idx) => (
                    <li key={item._id || idx}>
                      {item.name} x {item.quantity} - ₱
                      {(item.price * item.quantity).toLocaleString()}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="transaction-details">
                <OrderTimeline status={order.status} />
                <div className="detail-row">
                  <span>Payment Method:</span>
                  <span>{order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment'}</span>
                </div>
                <div className="detail-row">
                  <span>Delivery Type:</span>
                  <span>{order.deliveryType === 'delivery' ? 'Home Delivery' : 'Pickup'}</span>
                </div>
                <div className="detail-row total">
                  <span>Total Amount:</span>
                  <span className="amount">₱{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
