// Footer.js - Professional e-commerce footer
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-brand">
            <h3>CocoirStore</h3>
            <p>Your trusted Philippine supplier of premium coconut coir products for gardening, construction, landscaping, and agriculture.</p>
            <div className="footer-payment-badges">
              <span className="payment-badge">GCash</span>
              <span className="payment-badge">Maya</span>
              <span className="payment-badge">COD</span>
              <span className="payment-badge">BPI</span>
              <span className="payment-badge">BDO</span>
            </div>
          </div>

          <div className="footer-section">
            <h3>Customer Service</h3>
            <ul>
              <li><Link to="/products">Help Centre</Link></li>
              <li><Link to="/transactions">Track My Order</Link></li>
              <li><Link to="/products">Return & Refund</Link></li>
              <li><Link to="/products">Payment Methods</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Shop</h3>
            <ul>
              <li><Link to="/products?category=Coir+Peat">Coir Peat</Link></li>
              <li><Link to="/products?category=Coir+Fiber">Coir Fiber</Link></li>
              <li><Link to="/products?category=Growing+Medium">Growing Medium</Link></li>
              <li><Link to="/products?category=Garden+Supplies">Garden Supplies</Link></li>
              <li><Link to="/products">All Products</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact Us</h3>
            <p>Email: info@cocoirstore.ph</p>
            <p>Phone: +63 (2) 8123-4567</p>
            <p>Manila, Philippines</p>
            <div className="social-links">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} CocoirStore. All rights reserved.</p>
          <p className="disclaimer">
            For educational purposes only, and no copyright infringement is intended.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
