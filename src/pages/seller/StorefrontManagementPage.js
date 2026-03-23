// pages/seller/StorefrontManagementPage.js - Manage featured products
import React, { useState } from 'react';
import { useProducts } from '../../context/ProductContext';
import '../../styles/pages/seller.css';

const StorefrontManagementPage = () => {
  const { products, updateProduct } = useProducts();
  const [saveMessage, setSaveMessage] = useState('');

  const toggleFeatured = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      try {
        await updateProduct(productId, { featured: !product.featured });
        setSaveMessage('Storefront updated!');
      } catch (err) {
        setSaveMessage('Error: ' + (err.message || 'Update failed'));
      }
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const toggleTrending = async (productId) => {
    const product = products.find((p) => p.id === productId);
    if (product) {
      try {
        await updateProduct(productId, { trending: !product.trending });
        setSaveMessage('Trending status updated!');
      } catch (err) {
        setSaveMessage('Error: ' + (err.message || 'Update failed'));
      }
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const featuredProducts = products.filter((p) => p.featured);

  return (
    <div className="seller-page">
      <div className="seller-container">
        <h1>Storefront Management</h1>
        <p className="page-description">Manage your featured and trending products</p>

        {saveMessage && (
          <div className="success-message">{saveMessage}</div>
        )}

        {/* Featured Products Section */}
        <section className="seller-section">
          <h2>Featured Products ({featuredProducts.length})</h2>
          <p>Products displayed on the home page</p>

          {featuredProducts.length > 0 ? (
            <div className="seller-products">
              {featuredProducts.map((product) => (
                <div key={product.id} className="featured-product-item">
                  <div className="product-image-small">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <div className="product-item-info">
                    <h4>{product.name}</h4>
                    <p className="price">₱{product.price}</p>
                    <p className="category">{product.category}</p>
                  </div>
                  <div className="feature-controls">
                    <button
                      className="btn btn-small btn-secondary"
                      onClick={() => toggleFeatured(product.id)}
                    >
                      {product.featured ? 'Remove from Featured' : 'Add to Featured'}
                    </button>
                    <button
                      className={`btn btn-small ${product.trending ? 'btn-primary' : 'btn-secondary'}`}
                      onClick={() => toggleTrending(product.id)}
                    >
                      {product.trending ? 'Trending' : 'Mark as Trending'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No featured products yet. Add products to your inventory first.</p>
          )}
        </section>

        {/* All Products Section */}
        <section className="seller-section">
          <h2>Manage Featured Status</h2>
          <p>Toggle featured status for any product</p>

          <div className="all-products-list">
            {products.map((product) => (
              <div key={product.id} className="manage-product-item">
                <div className="manage-product-info">
                  <h4>{product.name}</h4>
                  <p>₱{product.price} • {product.category}</p>
                </div>
                <div className="manage-product-toggles">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={product.featured}
                      onChange={() => toggleFeatured(product.id)}
                    />
                    <span>Featured</span>
                  </label>
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      checked={product.trending}
                      onChange={() => toggleTrending(product.id)}
                    />
                    <span>Trending</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default StorefrontManagementPage;
