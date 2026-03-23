// Footer.js - Footer component on all pages
import React from 'react';
import '../styles/footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About CocoirStore</h3>
            <p>Your trusted Philippine supplier of premium coconut coir products for gardening, construction, landscaping, and agriculture.</p>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#products">Products</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3>Contact</h3>
            <p>Email: info@cocoirstore.ph</p>
            <p>Phone: +63 (2) 8123-4567</p>
            <p>Manila, Philippines</p>
          </div>

          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#instagram">Instagram</a>
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
