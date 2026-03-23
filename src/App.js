// App.js - Main application component with routing
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/buyer/HomePage';
import LoginPage from './pages/buyer/LoginPage';
import RegisterPage from './pages/buyer/RegisterPage';
import ProductsPage from './pages/buyer/ProductsPage';
import CartPage from './pages/buyer/CartPage';
import CheckoutPage from './pages/buyer/CheckoutPage';
import TransactionHistoryPage from './pages/buyer/TransactionHistoryPage';
import ProfilePage from './pages/buyer/ProfilePage';

// Seller Pages
import StorefrontManagementPage from './pages/seller/StorefrontManagementPage';
import InventoryPage from './pages/seller/InventoryPage';
import ReportsPage from './pages/seller/ReportsPage';

import './styles/App.css';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <ProductProvider>
          <Router>
            <div className="app">
              <Navbar />
              
              <main className="main-content">
                <Routes>
                  {/* ===== PUBLIC ROUTES ===== */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/register" element={<RegisterPage />} />
                  <Route path="/products" element={<ProductsPage />} />

                  {/* Legacy routes redirect to new paths */}
                  <Route path="/buyer/login" element={<Navigate to="/login" replace />} />
                  <Route path="/buyer/register" element={<Navigate to="/register" replace />} />
                  <Route path="/seller/login" element={<Navigate to="/login" replace />} />

                  {/* ===== BUYER ROUTES (authenticated) ===== */}
                  <Route
                    path="/cart"
                    element={
                      <ProtectedRoute requiredUserType="buyer">
                        <CartPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/checkout"
                    element={
                      <ProtectedRoute requiredUserType="buyer">
                        <CheckoutPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/transactions"
                    element={
                      <ProtectedRoute requiredUserType="buyer">
                        <TransactionHistoryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute requiredUserType="buyer">
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* ===== SELLER ROUTES ===== */}
                  <Route
                    path="/seller/storefront"
                    element={
                      <ProtectedRoute requiredUserType="seller">
                        <StorefrontManagementPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller/inventory"
                    element={
                      <ProtectedRoute requiredUserType="seller">
                        <InventoryPage />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/seller/reports"
                    element={
                      <ProtectedRoute requiredUserType="seller">
                        <ReportsPage />
                      </ProtectedRoute>
                    }
                  />

                  {/* ===== 404 NOT FOUND ===== */}
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>

              <Footer />
            </div>
          </Router>
        </ProductProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
