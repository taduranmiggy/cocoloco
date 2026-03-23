// AuthContext.js - Handles authentication state with backend API
import React, { createContext, useState, useCallback } from 'react';
import { authAPI } from '../services/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    user: null,
    userType: null,
    token: null,
    activeMode: 'buyer',
  });

  // Switch between buyer and seller mode
  const switchMode = useCallback((mode) => {
    setAuthState((prev) => {
      const updated = { ...prev, activeMode: mode, userType: mode };
      localStorage.setItem('auth', JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Login via backend API
  const login = useCallback(async (email, password) => {
    if (!email || !password) {
      throw new Error('Email and password are required');
    }

    const data = await authAPI.login({ email, password });

    const state = {
      isAuthenticated: true,
      user: data.user,
      userType: 'buyer',
      token: data.token,
      activeMode: 'buyer',
    };

    setAuthState(state);
    localStorage.setItem('token', data.token);
    localStorage.setItem('auth', JSON.stringify(state));

    return data;
  }, []);

  // Register via backend API
  const register = useCallback(async (userData) => {
    const { email, password, confirmPassword, fullName, address, mobile } = userData;

    if (!email || !password || !confirmPassword || !fullName || !address || !mobile) {
      throw new Error('All fields are required');
    }
    if (password !== confirmPassword) {
      throw new Error('Passwords do not match');
    }
    if (!/^\d{11}$/.test(mobile)) {
      throw new Error('Mobile number must be 11 digits (e.g., 09XXXXXXXXX)');
    }

    const data = await authAPI.register({
      name: fullName,
      email,
      password,
      address,
      mobile,
    });

    const state = {
      isAuthenticated: true,
      user: data.user,
      userType: 'buyer',
      token: data.token,
      activeMode: 'buyer',
    };

    setAuthState(state);
    localStorage.setItem('token', data.token);
    localStorage.setItem('auth', JSON.stringify(state));

    return data;
  }, []);

  // Logout
  const logout = useCallback(() => {
    setAuthState({ isAuthenticated: false, user: null, userType: null, token: null, activeMode: 'buyer' });
    localStorage.removeItem('auth');
    localStorage.removeItem('token');
  }, []);

  // Initialize auth from localStorage + validate token
  React.useEffect(() => {
    const init = async () => {
      const savedAuth = localStorage.getItem('auth');
      const savedToken = localStorage.getItem('token');
      if (savedAuth && savedToken) {
        try {
          const parsed = JSON.parse(savedAuth);
          const data = await authAPI.getMe();
          const state = {
            isAuthenticated: true,
            user: data.user,
            userType: parsed.activeMode || 'buyer',
            token: savedToken,
            activeMode: parsed.activeMode || 'buyer',
          };
          setAuthState(state);
        } catch {
          localStorage.removeItem('auth');
          localStorage.removeItem('token');
        }
      }
    };
    init();
  }, []);

  const value = { authState, login, register, logout, switchMode };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
