// pages/buyer/ProductDetailPage.js - Individual product page
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useToast } from '../../components/Toast';
import ProductCard from '../../components/ProductCard';
import '../../styles/pages/productDetail.css';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, getProductById } = useProducts();
  const { authState } = useAuth();
  const { addToCart } = useCart();
  const { addToast } = useToast();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    const found = getProductById(id);
    if (found) {
      setProduct(found);
      setQuantity(1);
      setAddedToCart(false);
    }
  }, [id, getProductById]);

  if (!product) {
    return (
      <div className="product-detail-page">
        <div className="product-detail-container">
          <p className="loading-text">Loading product...</p>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!authState.isAuthenticated) {
      addToast('Please sign in to add items to your cart', 'warning');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setAddedToCart(true);
    addToast(`${product.name} added to cart!`, 'success');
    setTimeout(() => setAddedToCart(false), 3000);
  };

  const handleBuyNow = () => {
    if (!authState.isAuthenticated) {
      addToast('Please sign in to purchase', 'warning');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    navigate('/checkout');
  };

  // Generate a fake rating from product name hash (consistent per product)
  const generateRating = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return (3.5 + (Math.abs(hash) % 15) / 10).toFixed(1);
  };

  const generateSoldCount = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
    return 50 + (Math.abs(hash) % 950);
  };

  const rating = parseFloat(generateRating(product.name));
  const soldCount = generateSoldCount(product.name);
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  // Related products: same category, exclude current
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 6);

  return (
    <div className="product-detail-page">
      <div className="product-detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Home</Link>
          <span className="sep">/</span>
          <Link to="/products">Products</Link>
          <span className="sep">/</span>
          <Link to={`/products?category=${encodeURIComponent(product.category)}`}>{product.category}</Link>
          <span className="sep">/</span>
          <span className="current">{product.name}</span>
        </nav>

        {/* Main product section */}
        <div className="product-detail-main">
          {/* Product Image */}
          <div className="product-detail-image">
            <div className="image-wrapper">
              <img src={product.image} alt={product.name} />
              {!product.inStock && <div className="out-of-stock-overlay">Out of Stock</div>}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-detail-info">
            <h1 className="detail-product-name">{product.name}</h1>

            <div className="detail-rating-row">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`star ${i < fullStars ? 'filled' : i === fullStars && hasHalf ? 'half' : ''}`}>★</span>
                ))}
              </div>
              <span className="rating-number">{rating}</span>
              <span className="divider">|</span>
              <span className="sold-count">{soldCount.toLocaleString()} Sold</span>
            </div>

            <div className="detail-price-box">
              <span className="detail-price">₱{product.price.toLocaleString()}</span>
            </div>

            <div className="detail-meta">
              <div className="meta-row">
                <span className="meta-label">Category</span>
                <span className="meta-value">{product.category}</span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Stock</span>
                <span className={`meta-value ${product.quantity <= 10 ? 'low-stock' : ''}`}>
                  {product.inStock ? `${product.quantity} available` : 'Out of Stock'}
                </span>
              </div>
              <div className="meta-row">
                <span className="meta-label">Shipping</span>
                <span className="meta-value shipping-free">Free Shipping</span>
              </div>
            </div>

            {/* Quantity + Actions */}
            {product.inStock && (
              <>
                <div className="detail-quantity">
                  <span className="qty-label">Quantity</span>
                  <div className="qty-controls">
                    <button className="qty-btn" onClick={() => setQuantity(Math.max(1, quantity - 1))}>−</button>
                    <input
                      type="number"
                      min="1"
                      max={product.quantity}
                      value={quantity}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 1;
                        setQuantity(Math.min(Math.max(1, val), product.quantity));
                      }}
                      className="qty-input"
                    />
                    <button className="qty-btn" onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}>+</button>
                  </div>
                  <span className="qty-available">{product.quantity} pieces available</span>
                </div>

                <div className="detail-actions">
                  <button className="btn-add-to-cart" onClick={handleAddToCart}>
                    {addedToCart ? '✓ Added to Cart' : 'Add to Cart'}
                  </button>
                  <button className="btn-buy-now" onClick={handleBuyNow}>
                    Buy Now
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tabs: Description / Specifications */}
        <div className="product-detail-tabs">
          <div className="tab-headers">
            <button
              className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Product Description
            </button>
            <button
              className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
              onClick={() => setActiveTab('specs')}
            >
              Specifications
            </button>
          </div>
          <div className="tab-content">
            {activeTab === 'description' ? (
              <div className="tab-description">
                <p>{product.description || 'Premium quality coconut coir product sourced from the finest Philippine coconut farms. 100% natural, eco-friendly, and sustainable.'}</p>
                <h4>Key Features:</h4>
                <ul>
                  <li>100% Natural Coconut Coir</li>
                  <li>Eco-Friendly & Sustainable</li>
                  <li>Sourced from Philippine Farms</li>
                  <li>Premium Quality Guarantee</li>
                </ul>
              </div>
            ) : (
              <div className="tab-specs">
                <table className="specs-table">
                  <tbody>
                    <tr><td>Category</td><td>{product.category}</td></tr>
                    <tr><td>Material</td><td>Coconut Coir</td></tr>
                    <tr><td>Origin</td><td>Philippines</td></tr>
                    <tr><td>Stock Status</td><td>{product.inStock ? 'In Stock' : 'Out of Stock'}</td></tr>
                    <tr><td>Available Qty</td><td>{product.quantity} pcs</td></tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2>You May Also Like</h2>
            <div className="related-products-grid">
              {relatedProducts.map((rp) => (
                <ProductCard key={rp.id} product={rp} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
