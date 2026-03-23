// src/services/api.js - Centralized API service layer for backend communication

const API_BASE = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const getToken = () => localStorage.getItem('token');

const request = async (endpoint, options = {}) => {
  const token = getToken();
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...options,
  };

  const res = await fetch(`${API_BASE}${endpoint}`, config);
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// =================== AUTH API ===================
export const authAPI = {
  register: (userData) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),

  login: (credentials) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),

  getMe: () => request('/auth/me'),

  updateProfile: (data) =>
    request('/auth/profile', { method: 'PUT', body: JSON.stringify(data) }),
};

// =================== PRODUCT API ===================
export const productAPI = {
  getAll: (params = {}) => {
    const query = new URLSearchParams(params).toString();
    return request(`/products${query ? `?${query}` : ''}`);
  },

  getMine: () => request('/products/mine'),

  getById: (id) => request(`/products/${id}`),

  create: (data) =>
    request('/products', { method: 'POST', body: JSON.stringify(data) }),

  update: (id, data) =>
    request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  delete: (id) => request(`/products/${id}`, { method: 'DELETE' }),
};

// =================== CART API ===================
export const cartAPI = {
  get: () => request('/cart'),

  addItem: (productId, quantity = 1) =>
    request('/cart', { method: 'POST', body: JSON.stringify({ productId, quantity }) }),

  updateItem: (itemId, quantity) =>
    request(`/cart/${itemId}`, { method: 'PUT', body: JSON.stringify({ quantity }) }),

  removeItem: (itemId) => request(`/cart/${itemId}`, { method: 'DELETE' }),

  clear: () => request('/cart/clear', { method: 'DELETE' }),
};

// =================== ORDER API ===================
export const orderAPI = {
  create: (data) =>
    request('/orders', { method: 'POST', body: JSON.stringify(data) }),

  getAll: () => request('/orders'),

  getById: (id) => request(`/orders/${id}`),

  updateStatus: (id, status) =>
    request(`/orders/${id}/status`, { method: 'PUT', body: JSON.stringify({ status }) }),
};

// =================== REPORT API ===================
export const reportAPI = {
  getSales: () => request('/reports/sales'),
  getInventory: () => request('/reports/inventory'),
};
