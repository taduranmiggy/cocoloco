// CartItem.js - Individual cart item component
import React from 'react';
import { useCart } from '../context/CartContext';
import '../styles/cartItem.css';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value);
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  const itemTotal = item.price * item.quantity;

  return (
    <div className="cart-item">
      {/* Product Image */}
      <div className="cart-item-image">
        <img src={item.image} alt={item.name} />
      </div>

      {/* Product Details */}
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-category">{item.category}</p>
        <p className="cart-item-price">₱{item.price.toLocaleString()}</p>
      </div>

      {/* Quantity Control */}
      <div className="cart-item-quantity">
        <select value={item.quantity} onChange={handleQuantityChange}>
          {Array.from(
            { length: Math.min(item.quantity + 5, 20) },
            (_, i) => i + 1
          ).map((q) => (
            <option key={q} value={q}>
              {q}
            </option>
          ))}
        </select>
      </div>

      {/* Total Price */}
      <div className="cart-item-total">
        <p className="item-total">₱{itemTotal.toLocaleString()}</p>
      </div>

      {/* Remove Button */}
      <div className="cart-item-remove">
        <button
          className="btn btn-danger btn-small"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
