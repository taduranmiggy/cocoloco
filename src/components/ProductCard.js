// ProductCard.js - Reusable product display component
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import '../styles/productCard.css';

const ProductCard = ({ product, onEdit, onDelete, isSellerView = false }) => {
  const { authState } = useAuth();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [quantity, setQuantity] = React.useState(1);

  const handleAddToCart = () => {
    if (!authState.isAuthenticated) {
      const goLogin = window.confirm('You need to sign in to add items to your cart. Go to login page?');
      if (goLogin) navigate('/login');
      return;
    }
    addToCart(product, quantity);
    setQuantity(1);
    alert('Product added to cart!');
  };

  return (
    <div className="product-card">
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
        <p className="product-category">{product.category}</p>
        <p className="product-description">{product.description}</p>

        <div className="product-meta">
          <span className="product-price">₱{product.price.toLocaleString()}</span>
          {isSellerView && (
            <span className="product-stock">Stock: {product.quantity}</span>
          )}
        </div>

        {/* Actions */}
        <div className="product-actions">
          {isSellerView ? (
            <>
              <button
                className="btn btn-primary"
                onClick={() => onEdit(product)}
              >
                Edit
              </button>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(product.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <>
              {product.inStock ? (
                <>
                  <input
                    type="number"
                    min="1"
                    max={product.quantity}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="quantity-input"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </>
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
