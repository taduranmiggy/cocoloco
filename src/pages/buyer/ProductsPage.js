// pages/buyer/ProductsPage.js - All products listing page
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import ProductCard from '../../components/ProductCard';
import '../../styles/pages/products.css';

const ProductsPage = () => {
  const { products, searchProducts } = useProducts();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredList, setFilteredList] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Read ?category= param from URL and auto-filter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && products.length > 0) {
      setSelectedCategory(cat);
      setFilteredList(products.filter((p) => p.category === cat));
    } else {
      setSelectedCategory('All');
      setFilteredList(products);
    }
  }, [location.search, products]);

  // Get unique categories
  const categories = ['All', ...new Set(products.map((p) => p.category))];

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim()) {
      const results = searchProducts(query);
      setFilteredList(results);
    } else {
      setFilteredList(products);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredList(products);
    } else {
      setFilteredList(products.filter((p) => p.category === category));
    }
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Our Products</h1>
        <p>Browse our complete collection of coconut coir products</p>
      </div>

      <div className="products-container">
        {/* Sidebar Filters */}
        <aside className="products-sidebar">
          <div className="filter-section">
            <h3>Search</h3>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>

          <div className="filter-section">
            <h3>Categories</h3>
            <div className="category-list">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                  onClick={() => handleCategoryFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="products-main">
          {filteredList.length > 0 ? (
            <div className="products-grid">
              {filteredList.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="no-products">
              <h2>No products found</h2>
              <p>Try adjusting your search or filters</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
