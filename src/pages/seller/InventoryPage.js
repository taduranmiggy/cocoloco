// pages/seller/InventoryPage.js - Manage products (add, edit, delete)
import React, { useState, useEffect } from 'react';
import { useProducts } from '../../context/ProductContext';
import '../../styles/pages/seller.css';

const InventoryPage = () => {
  const { myProducts: products, addProduct, updateProduct, deleteProduct, fetchMyProducts } = useProducts();

  useEffect(() => {
    fetchMyProducts();
  }, [fetchMyProducts]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [saveMessage, setSaveMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: 'Coir Peat',
    quantity: '',
    description: '',
    image: '',
    inStock: true,
  });

  const categories = [
    'Coir Peat',
    'Coir Fiber',
    'Growing Medium',
    'Coir Blocks',
    'Geo-Textiles',
    'Rope & Twine',
    'Garden Supplies',
    'Landscaping',
    'Bundle',
  ];

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.price || !formData.quantity) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      if (editingId) {
        await updateProduct(editingId, {
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
        });
        setSaveMessage('Product updated successfully!');
        setEditingId(null);
      } else {
        await addProduct({
          ...formData,
          price: parseFloat(formData.price),
          quantity: parseInt(formData.quantity),
          featured: false,
          trending: false,
        });
        setSaveMessage('Product added successfully!');
      }
    } catch (err) {
      setSaveMessage('Error: ' + (err.message || 'Operation failed'));
    }

    setFormData({
      name: '',
      price: '',
      category: 'Coir Peat',
      quantity: '',
      description: '',
      image: '',
      inStock: true,
    });
    setShowForm(false);

    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      price: product.price.toString(),
      category: product.category,
      quantity: product.quantity.toString(),
      description: product.description,
      image: product.image,
      inStock: product.inStock,
    });
    setEditingId(product.id);
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId);
        setSaveMessage('Product deleted successfully!');
      } catch (err) {
        setSaveMessage('Error: ' + (err.message || 'Delete failed'));
      }
      setTimeout(() => setSaveMessage(''), 3000);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData({
      name: '',
      price: '',
      category: 'Coir Peat',
      quantity: '',
      description: '',
      image: '',
      inStock: true,
    });
  };

  return (
    <div className="seller-page">
      <div className="seller-container">
        <h1>Inventory Management</h1>
        <p className="page-description">Manage your product inventory</p>

        {saveMessage && (
          <div className="success-message">{saveMessage}</div>
        )}

        <div className="inventory-actions">
          {!showForm && (
            <button
              className="btn btn-primary btn-large"
              onClick={() => setShowForm(true)}
            >
              + Add New Product
            </button>
          )}
        </div>

        {/* Product Form */}
        {showForm && (
          <section className="product-form-section">
            <h2>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSubmit} className="product-form">
              <div className="form-row">
                <div className="form-group">
                  <label>Product Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleFormChange}
                    placeholder="Enter product name"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleFormChange}
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Price (₱) *</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleFormChange}
                    placeholder="Enter price"
                    step="0.01"
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Quantity *</label>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleFormChange}
                    placeholder="Enter quantity"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleFormChange}
                  placeholder="Enter product description"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleFormChange}
                  placeholder="Enter image URL"
                />
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={formData.inStock}
                    onChange={handleFormChange}
                  />
                  <span>In Stock</span>
                </label>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? 'Update Product' : 'Add Product'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Products List */}
        <section className="inventory-section">
          <h2>Products ({products.length})</h2>

          {products.length > 0 ? (
            <div className="inventory-table">
              <div className="table-header">
                <span>Product</span>
                <span>Category</span>
                <span>Price</span>
                <span>Stock</span>
                <span>Actions</span>
              </div>

              {products.map((product) => (
                <div key={product.id} className="table-row">
                  <div className="product-cell">
                    <img src={product.image} alt={product.name} className="table-image" />
                    <span>{product.name}</span>
                  </div>
                  <span>{product.category}</span>
                  <span className="price">₱{product.price}</span>
                  <span className={`stock ${!product.inStock ? 'out-of-stock' : ''}`}>
                    {product.inStock ? product.quantity : 'Out of Stock'}
                  </span>
                  <div className="action-buttons">
                    <button
                      className="btn btn-small btn-primary"
                      onClick={() => handleEdit(product)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-small btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-data">No products in inventory. Add one to get started!</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default InventoryPage;
