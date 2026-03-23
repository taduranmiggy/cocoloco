// ProductContext.js - Manages products with backend API
import React, { createContext, useState, useCallback, useEffect } from 'react';
import { productAPI } from '../services/api';

export const ProductContext = createContext();

// Normalize product id field (_id from MongoDB → id for React keys)
const normalize = (p) => ({ ...p, id: p._id || p.id });
const normalizeAll = (arr) => arr.map(normalize);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [myProducts, setMyProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch products from backend on mount
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await productAPI.getAll();
      const normalized = normalizeAll(data);
      setProducts(normalized);
      setFilteredProducts(normalized);
    } catch (err) {
      console.error('Failed to fetch products:', err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Fetch only the logged-in seller's products
  const fetchMyProducts = useCallback(async () => {
    try {
      const data = await productAPI.getMine();
      const normalized = normalizeAll(data);
      setMyProducts(normalized);
      return normalized;
    } catch (err) {
      console.error('Failed to fetch my products:', err.message);
      return [];
    }
  }, []);

  // Get all products
  const getAllProducts = useCallback(() => products, [products]);

  // Get featured products
  const getFeaturedProducts = useCallback(
    () => products.filter((p) => p.featured),
    [products]
  );

  // Get trending products
  const getTrendingProducts = useCallback(
    () => products.filter((p) => p.trending),
    [products]
  );

  // Search products (local filter on already-fetched data)
  const searchProducts = useCallback(
    (query) => {
      const q = query.toLowerCase();
      const filtered = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.description && p.description.toLowerCase().includes(q)) ||
          p.category.toLowerCase().includes(q)
      );
      setFilteredProducts(filtered);
      return filtered;
    },
    [products]
  );

  // Add product (seller) — calls backend
  const addProduct = useCallback(async (productData) => {
    const created = await productAPI.create(productData);
    const normalized = normalize(created);
    setProducts((prev) => [...prev, normalized]);
    setMyProducts((prev) => [...prev, normalized]);
    return normalized;
  }, []);

  // Update product (seller) — calls backend
  const updateProduct = useCallback(async (productId, productData) => {
    const updated = await productAPI.update(productId, productData);
    const normalized = normalize(updated);
    setProducts((prev) =>
      prev.map((p) => (p.id === productId || p._id === productId ? normalized : p))
    );
    setMyProducts((prev) =>
      prev.map((p) => (p.id === productId || p._id === productId ? normalized : p))
    );
  }, []);

  // Delete product (seller) — calls backend
  const deleteProduct = useCallback(async (productId) => {
    await productAPI.delete(productId);
    setProducts((prev) => prev.filter((p) => p.id !== productId && p._id !== productId));
    setMyProducts((prev) => prev.filter((p) => p.id !== productId && p._id !== productId));
  }, []);

  // Get product by ID
  const getProductById = useCallback(
    (productId) => products.find((p) => p.id === productId || p._id === productId),
    [products]
  );

  // reduceStock is now handled atomically by the order endpoint on the backend.
  // Kept as a no-op + refetch to update local state after checkout.
  const reduceStock = useCallback(async () => {
    await fetchProducts();
  }, [fetchProducts]);

  const value = {
    products,
    myProducts,
    filteredProducts,
    loading,
    getAllProducts,
    getFeaturedProducts,
    getTrendingProducts,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    reduceStock,
    fetchProducts,
    fetchMyProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProducts = () => {
  const context = React.useContext(ProductContext);
  if (!context) {
    throw new Error('useProducts must be used within ProductProvider');
  }
  return context;
};
