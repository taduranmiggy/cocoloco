// CartContext.js - Manages shopping cart state with backend API
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { cartAPI } from '../services/api';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  // Transform backend cart to flat array used by UI
  const transformCart = (cart) => {
    if (!cart || !cart.items) return [];
    return cart.items
      .filter((item) => item.product) // guard against deleted products
      .map((item) => ({
        ...item.product,
        id: item.product._id || item.product.id,
        quantity: item.quantity,
        _cartItemId: item._id, // keep reference for update/delete
      }));
  };

  // Load cart from backend when token exists
  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      setCartLoading(true);
      const cart = await cartAPI.get();
      setCartItems(transformCart(cart));
    } catch {
      // Not logged in or not a buyer — ignore
    } finally {
      setCartLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();
  }, [fetchCart]);

  // Add to cart
  const addToCart = useCallback(async (product, quantity = 1) => {
    try {
      const productId = product._id || product.id;
      const cart = await cartAPI.addItem(productId, quantity);
      setCartItems(transformCart(cart));
    } catch (err) {
      // Fallback: optimistic local update
      setCartItems((prev) => {
        const existing = prev.find((item) => (item._id || item.id) === (product._id || product.id));
        if (existing) {
          return prev.map((item) =>
            (item._id || item.id) === (product._id || product.id)
              ? { ...item, quantity: item.quantity + quantity }
              : item
          );
        }
        return [...prev, { ...product, id: product._id || product.id, quantity }];
      });
    }
  }, []);

  // Remove from cart
  const removeFromCart = useCallback(async (productId) => {
    const item = cartItems.find((i) => (i.id || i._id) === productId);
    if (item && item._cartItemId) {
      try {
        const cart = await cartAPI.removeItem(item._cartItemId);
        setCartItems(transformCart(cart));
        return;
      } catch { /* fallback below */ }
    }
    setCartItems((prev) => prev.filter((i) => (i.id || i._id) !== productId));
  }, [cartItems]);

  // Update quantity
  const updateQuantity = useCallback(async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    const item = cartItems.find((i) => (i.id || i._id) === productId);
    if (item && item._cartItemId) {
      try {
        const cart = await cartAPI.updateItem(item._cartItemId, quantity);
        setCartItems(transformCart(cart));
        return;
      } catch { /* fallback below */ }
    }
    setCartItems((prev) =>
      prev.map((i) => ((i.id || i._id) === productId ? { ...i, quantity } : i))
    );
  }, [cartItems, removeFromCart]);

  // Clear cart
  const clearCart = useCallback(async () => {
    try {
      await cartAPI.clear();
    } catch { /* ignore */ }
    setCartItems([]);
  }, []);

  // Calculate totals
  const calculateTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);

  const value = {
    cartItems,
    cartLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    calculateTotal,
    fetchCart,
    cartCount: cartItems.length,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
