// ProductCard.js - Reusable product display component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import '../styles/productCard.css';

// Deterministic "rating" from product name
const generateRating = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return (3.5 + (Math.abs(hash) % 15) / 10).toFixed(1);
};
const generateSold = (name) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return 50 + (Math.abs(hash) % 950);
};

const ProductCard = ({ product, onEdit, onDelete, isSellerView = false }) => {
  const { authState } = useAuth();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);

  const rating = parseFloat(generateRating(product.name));
  const sold = generateSold(product.name);
  const fullStars = Math.floor(rating);

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!authState.isAuthenticated) {
      addToast('Please sign in to add items to your cart', 'warning');
      navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setQuantity(1);
    addToast(`${product.name} added to cart!`, 'success');
  };

  const goToDetail = () => {
    if (!isSellerView) {
      navigate(`/products/${product.id}`);
    }
  };

  return (
    <div className="product-card" onClick={goToDetail} role={isSellerView ? undefined : 'link'}>
      {/* Product Image */}
      <div className="product-image-container">
        <img
          src={product.image}
          alt={product.name}
          className="product-image"
        />
        {!product.inStock && <div className="out-of-stock">Out of Stock</div>}
      </div>

      {/* Product Info */}
      <div className="product-info">
        <h3 className="product-name">{product.name}</h3>

        <div className="product-meta">
          <span className="product-price">₱{product.price.toLocaleString()}</span>
          {isSellerView && (
            <span className="product-stock">Stock: {product.quantity}</span>
          )}
        </div>

        {/* Rating + Sold (buyer view only) */}
        {!isSellerView && (
          <div className="product-rating-sold">
            <span className="card-stars">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < fullStars ? 'star-filled' : 'star-empty'}>★</span>
              ))}
            </span>
            <span className="card-sold">{sold.toLocaleString()} sold</span>
          </div>
        )}

        {/* Actions */}
        <div className="product-actions">
          {isSellerView ? (
            <>
              <button
                className="btn btn-primary"
                onClick={(e) => { e.stopPropagation(); onEdit(product); }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={(e) => { e.stopPropagation(); onDelete(product.id); }}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              {product.inStock ? (
                <button
                  className="btn btn-primary btn-add-cart"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
              ) : (
                <button className="btn btn-disabled" disabled>
                  Out of Stock
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
