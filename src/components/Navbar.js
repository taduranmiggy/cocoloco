// Navbar.js - Top navigation component — Modern coconut-coir brand
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

const Navbar = () => {
  const { authState, logout, switchMode } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleSwitchToSeller = () => {
    switchMode('seller');
    setMenuOpen(false);
    navigate('/seller/storefront');
  };

  const handleSwitchToBuyer = () => {
    switchMode('buyer');
    setMenuOpen(false);
    navigate('/products');
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Logo and Brand */}
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <span className="logo-icon">C</span>
          <span className="logo-text">CocoirStore</span>
        </Link>

        {/* Center: Search Bar */}
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search coconut coir products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>

        {/* Right: Navigation Links */}
        <div className="navbar-right">
          {/* Hamburger Toggle (mobile) */}
          <button
            className={`menu-toggle ${menuOpen ? 'active' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          <div className={`navbar-menu ${menuOpen ? 'menu-open' : ''}`}>
            <Link to="/" className="nav-link" onClick={closeMenu}>
              Home
            </Link>
            {!authState.isAuthenticated ? (
              <>
                <Link to="/login" className="nav-link" onClick={closeMenu}>
                  Login
                </Link>
                <Link to="/register" className="nav-link nav-link-register" onClick={closeMenu}>
                  Register
                </Link>
              </>
            ) : authState.activeMode === 'seller' ? (
              <>
                <Link to="/seller/storefront" className="nav-link" onClick={closeMenu}>
                  Storefront
                </Link>
                <Link to="/seller/inventory" className="nav-link" onClick={closeMenu}>
                  Inventory
                </Link>
                <Link to="/seller/reports" className="nav-link" onClick={closeMenu}>
                  Reports
                </Link>
                <button onClick={handleSwitchToBuyer} className="nav-link mode-toggle-btn">
                  Switch to Buying
                </button>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/products" className="nav-link" onClick={closeMenu}>
                  Products
                </Link>
                <Link to="/cart" className="nav-link cart-link" onClick={closeMenu}>
                  Cart <span className="badge">{cartCount}</span>
                </Link>
                <Link to="/profile" className="nav-link" onClick={closeMenu}>
                  Profile
                </Link>
                <Link to="/transactions" className="nav-link" onClick={closeMenu}>
                  Orders
                </Link>
                <button onClick={handleSwitchToSeller} className="nav-link mode-toggle-btn">
                  Seller Centre
                </button>
                <button onClick={handleLogout} className="nav-link logout-btn">
                  Logout
                </button>
              </>
            )}
          </div>

          {/* User Info */}
          {authState.isAuthenticated && (
            <div className="user-info">
              <span className="user-name">
                {authState.user.name}
              </span>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
