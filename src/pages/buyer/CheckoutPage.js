// pages/buyer/CheckoutPage.js - Checkout page with backend API
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useProducts } from '../../context/ProductContext';
import { orderAPI } from '../../services/api';
import '../../styles/pages/checkout.css';

const CheckoutPage = () => {
  const { authState } = useAuth();
  const { cartItems, calculateTotal, clearCart } = useCart();
  const { reduceStock } = useProducts();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [deliveryType, setDeliveryType] = useState('delivery');
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState('');

  const total = calculateTotal();

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await orderAPI.create({
        paymentMethod,
        deliveryType,
        shippingAddress: authState.user.address,
      });

      // Refresh product stock from backend
      await reduceStock();

      setOrderPlaced(true);

      // Clear cart and redirect
      setTimeout(() => {
        clearCart();
        navigate('/transactions');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <h1>Checkout</h1>
          <div className="error-message">
            Your cart is empty. Please add items before checkout.
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="success-message">
            <h2>Order Placed Successfully!</h2>
            <p>Your order has been received and is being processed.</p>
            <p>Redirecting to transaction history...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <h1>Checkout</h1>

        {error && <div className="error-message">{error}</div>}

        <div className="checkout-content">
          {/* Checkout Form */}
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            {/* Delivery Address */}
            <section className="checkout-section">
              <h3>Delivery Address</h3>
              <div className="address-info">
                <p><strong>{authState.user.name}</strong></p>
                <p>{authState.user.address}</p>
                <p>{authState.user.mobile}</p>
              </div>
            </section>

            {/* Delivery Type */}
            <section className="checkout-section">
              <h3>Delivery Type</h3>
              <div className="delivery-options">
                <label className="option-label">
                  <input
                    type="radio"
                    name="delivery"
                    value="delivery"
                    checked={deliveryType === 'delivery'}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                  <span>Home Delivery (Free)</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="delivery"
                    value="pickup"
                    checked={deliveryType === 'pickup'}
                    onChange={(e) => setDeliveryType(e.target.value)}
                  />
                  <span>Pickup from Store</span>
                </label>
              </div>
            </section>

            {/* Payment Method */}
            <section className="checkout-section">
              <h3>Payment Method</h3>
              <div className="payment-options">
                <label className="option-label">
                  <input
                    type="radio"
                    name="payment"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Cash on Delivery</span>
                </label>
                <label className="option-label">
                  <input
                    type="radio"
                    name="payment"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                  <span>Online Payment</span>
                </label>
              </div>

              {paymentMethod === 'online' && (
                <div className="payment-info">
                  <p>Card Details (Simulated)</p>
                  <input type="text" placeholder="Card Number" disabled defaultValue="4111111111111111" />
                  <input type="text" placeholder="Expiry" disabled defaultValue="12/25" />
                  <input type="text" placeholder="CVV" disabled defaultValue="123" />
                </div>
              )}
            </section>

            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={loading}
            >
              {loading ? 'Processing...' : `Place Order - ₱${total.toLocaleString()}`}
            </button>
          </form>

          {/* Order Summary */}
          <aside className="checkout-summary">
            <h3>Order Summary</h3>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-product">
                  <span>{item.name} x{item.quantity}</span>
                  <span>₱{(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Total Amount:</span>
              <span className="amount">₱{total.toLocaleString()}</span>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
