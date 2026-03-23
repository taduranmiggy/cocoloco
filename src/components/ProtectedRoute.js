// ProtectedRoute.js - Route guard for authentication and authorization
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, requiredUserType = null }) => {
  const { authState } = useAuth();

  // Check if user is authenticated
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Check if user is in the required mode (buyer/seller)
  if (requiredUserType && authState.activeMode !== requiredUserType) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
