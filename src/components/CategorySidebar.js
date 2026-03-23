// CategorySidebar.js - Left sidebar with category menu (Alibaba-style)
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/categorySidebar.css';

const CategorySidebar = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);

  const categories = [
    {
      id: 1,
      name: 'Soil & Growing Media',
      subcategories: ['Coir Peat', 'Coir Chips', 'Coir Dust', 'Coir Blocks']
    },
    {
      id: 2,
      name: 'Garden Supplies',
      subcategories: ['Coir Pots', 'Pot Liners', 'Seedling Trays', 'Mulch Mats']
    },
    {
      id: 3,
      name: 'Landscaping & Construction',
      subcategories: ['Geo-Textiles', 'Erosion Control Nets', 'Slope Stabilization']
    },
    {
      id: 4,
      name: 'Rope & Twine',
      subcategories: ['Coir Rope', 'Coir Twine', 'Bundling Materials']
    },
    {
      id: 5,
      name: 'Agriculture & Bulk',
      subcategories: ['Farm Supplies', 'Bulk Orders', 'Wholesale Products']
    }
  ];

  const toggleCategory = (id) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  return (
    <aside className="category-sidebar">
      {/* Sidebar Header */}
      <div className="sidebar-header">
        <h3>ALL CATEGORIES</h3>
      </div>

      {/* Categories List */}
      <div className="categories-list">
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <button
              className="category-toggle"
              onClick={() => toggleCategory(category.id)}
              title={category.name}
            >
              <span className="category-name">{category.name}</span>
              <span className={`toggle-icon ${expandedCategory === category.id ? 'expanded' : ''}`}>
                ▶
              </span>
            </button>

            {/* Subcategories */}
            {expandedCategory === category.id && (
              <div className="subcategories">
                {category.subcategories.map((subcat, idx) => (
                  <Link
                    key={idx}
                    to={`/products?category=${encodeURIComponent(subcat)}`}
                    className="subcategory-link"
                  >
                    {subcat}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <Link to="/products" className="view-all-btn">
          View All Products
        </Link>
      </div>
    </aside>
  );
};

export default CategorySidebar;
