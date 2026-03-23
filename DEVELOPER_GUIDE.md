// DEVELOPER_GUIDE.md - For developers working with the project

# Developer Guide - CocoirStore

## Quick Start for Developers

### Prerequisites
- Node.js 14+
- npm or yarn
- Git (optional)
- Code editor (VS Code recommended)

### Getting Started
```bash
cd ECOMMERCEFINALS
npm install
npm start
```

## Project Architecture

### Directory Structure
```
src/
├── components/       # Reusable UI components
├── context/         # React Context for state management
├── pages/           # Page components
│   ├── buyer/      # Buyer-facing pages
│   └── seller/     # Seller-facing pages
├── styles/         # CSS stylesheets
├── utils/          # Utility functions (validation, etc.)
├── App.js          # Main app component with routing
└── index.js        # React entry point
```

## Key Technologies

### Frontend
- **React 18.2.0**: Component-based UI library
- **React Router 6.8.0**: Client-side routing
- **Context API**: State management (no Redux needed)
- **CSS3**: Styling with custom properties

### Development
- **React Scripts**: Build tool and dev server
- **Axios**: HTTP client (prepared for future API integration)

## State Management

### AuthContext
Handles user authentication and authorization.

```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { authState, login, register, logout } = useAuth();
  // authState = { isAuthenticated, user, userType, token }
}
```

### CartContext
Manages shopping cart operations.

```javascript
import { useCart } from '../context/CartContext';

function MyComponent() {
  const { 
    cartItems, 
    addToCart, 
    removeFromCart, 
    updateQuantity,
    calculateTotal 
  } = useCart();
}
```

### ProductContext
Manages product inventory and catalog.

```javascript
import { useProducts } from '../context/ProductContext';

function MyComponent() {
  const {
    products,
    getAllProducts,
    getFeaturedProducts,
    searchProducts,
    addProduct,
    updateProduct,
    deleteProduct
  } = useProducts();
}
```

## Routing Structure

All routes are defined in `App.js`:

```javascript
// Public routes
/                    # Home page
/buyer/login        # Buyer login
/buyer/register     # Buyer registration

// Protected buyer routes (requires buyer authentication)
/products           # Product listing
/cart               # Shopping cart
/checkout           # Checkout page
/transactions       # Order history
/profile            # User profile

// Seller routes
/seller/login           # Seller login
/seller/storefront      # Featured products management
/seller/inventory       # Product inventory
/seller/reports         # Sales reports
```

## Component Structure

### Page Components
Located in `pages/buyer/` and `pages/seller/`:
```javascript
// Example: ProductsPage.js
import React from 'react';
import { useProducts } from '../context/ProductContext';

const ProductsPage = () => {
  const { products, searchProducts } = useProducts();
  // Component logic
  return (/* JSX */);
};

export default ProductsPage;
```

### Reusable Components
Located in `components/`:
```javascript
// Example: ProductCard.js
import React from 'react';

const ProductCard = ({ product, onEdit, onDelete }) => {
  return (/* JSX */);
};

export default ProductCard;
```

## Styling System

### CSS Custom Properties (Variables)
```css
:root {
  --primary-color: #2ecc71;
  --secondary-color: #3498db;
  --danger-color: #e74c3c;
  --text-color: #2c3e50;
  --bg-color: #f5f6fa;
  --spacing-md: 16px;
  --border-radius: 8px;
}
```

### Responsive Design Breakpoints
```css
@media (max-width: 1024px) { /* Tablets */ }
@media (max-width: 768px)  { /* Mobile */ }
```

### CSS Classes Convention
```css
.component-name       /* Block */
.component-name--variant  /* Variant/modifier */
.component-name__element  /* Element */
```

## Forms & Validation

Validation utilities are in `utils/validation.js`:

```javascript
import { 
  validateEmail, 
  validatePassword,
  validateMobileNumber 
} from '../utils/validation';

// Usage
const isValidEmail = validateEmail(email);
const passwordValidation = validatePassword(password);
```

## Data Persistence

Using browser localStorage:

```javascript
// Reading
const auth = localStorage.getItem('auth');
const parsed = JSON.parse(auth);

// Writing
const data = { user: userObj };
localStorage.setItem('auth', JSON.stringify(data));

// Clearing
localStorage.removeItem('auth');
localStorage.clear(); // Clear all
```

### localStorage Keys
- `auth`: User authentication state
- `cart`: Shopping cart items
- `orders`: Purchase history
- `products`: Product inventory (optional, usually from context)

## Adding a New Feature

### Example: Add Product Reviews

1. **Create context** (if needed)
   ```javascript
   // src/context/ReviewContext.js
   export const ReviewProvider = ({ children }) => {
     // State and logic
   };
   ```

2. **Create component**
   ```javascript
   // src/components/ReviewCard.js
   const ReviewCard = ({ review }) => {
     // Component JSX
   };
   ```

3. **Add to page**
   ```javascript
   // In relevant page
   import ReviewCard from '../components/ReviewCard';
   
   <ReviewCard review={review} />
   ```

4. **Add styling**
   ```css
   /* src/styles/reviewCard.css */
   .review-card { /* styles */ }
   ```

5. **Update routing**
   ```javascript
   // In App.js if new page needed
   <Route path="/reviews" element={<ReviewsPage />} />
   ```

## Common Tasks

### Change Color Scheme
Edit `src/styles/index.css` CSS variables:
```css
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  /* ... */
}
```

### Add New Page
1. Create component in `pages/buyer/` or `pages/seller/`
2. Import in `App.js`
3. Add route in `<Routes>` component
4. Add navigation link in `Navbar.js`

### Add Navigation Link
Edit `Navbar.js` to add links based on user type:
```javascript
{authState.userType === 'buyer' && (
  <Link to="/your-page" className="nav-link">
    Your Page
  </Link>
)}
```

### Create New Component
```javascript
// src/components/MyComponent.js
import React from 'react';
import '../styles/myComponent.css';

/**
 * MyComponent - Description of what it does
 * @param {Object} props - Component props
 * @returns {JSX.Element}
 */
const MyComponent = ({ prop1, prop2 }) => {
  return (
    <div className="my-component">
      {/* Component content */}
    </div>
  );
};

export default MyComponent;
```

## Debugging

### Browser DevTools
- **F12**: Open developer tools
- **Console tab**: See logs and errors
- **Elements tab**: Inspect HTML
- **Network tab**: Monitor API calls
- **Application tab**: View/edit localStorage

### React DevTools
- Install [React DevTools extension](https://chrome.google.com/webstore)
- Inspect components and their props
- Monitor state changes in real-time
- Time-travel debugging

### Common Issues

**Issue: State not updating**
- Check if using setState correctly
- Verify context provider is wrapping component
- Ensure component is using useContext hook

**Issue: Styles not applying**
- Check CSS selector specificity
- Clear browser cache
- Verify CSS file is imported
- Hard refresh (Ctrl+F5)

**Issue: localStorage errors**
- Check browser privacy settings
- Ensure localStorage is enabled
- Inspect localStorage usage (DevTools → Application)

## Performance Tips

1. **Code Splitting**: Use React.lazy() for large components
2. **Memoization**: Use React.memo() to prevent unnecessary renders
3. **useCallback**: Wrap functions to prevent recreating on every render
4. **useMemo**: Cache computed values

Example:
```javascript
const MyComponent = React.memo(({ data }) => {
  return <div>{data}</div>;
});
```

## Code Style Guidelines

- Use functional components with hooks
- Use descriptive variable names
- Add JSDoc comments for functions
- Keep components small and focused
- One component per file
- Import statements at top
- Props destructuring in parameters

## Commit Message Convention

```
feat: Add product search functionality
fix: Fix cart total calculation
docs: Update README with setup instructions
style: Format code with Prettier
refactor: Reorganize component structure
```

## Testing Features Locally

### Test Buyer Flow
1. Navigate to home page
2. Click "Buyer Login"
3. Enter any email and password (6+ chars)
4. Browse products
5. Add to cart
6. Checkout
7. View order history

### Test Seller Flow
1. Navigate to `/seller/login`
2. Enter credentials
3. Go to inventory
4. Add/edit/delete products
5. View storefront management
6. Check reports

### Keyboard Navigation
- Tab: Move between elements
- Enter: Activate buttons/links
- Space: Toggle checkboxes
- Arrow keys: Select options

## Build & Deployment

### Development Build
```bash
npm start
```

### Production Build
```bash
npm run build
```
Creates optimized build in `build/` folder.

### Environment Variables
Copy `.env.example` to `.env.local` and update:
```
REACT_APP_API_BASE_URL=your-api-url
```

## Future Enhancements

- [ ] Real backend API integration
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Email notifications
- [ ] Product reviews and ratings
- [ ] Wishlist feature
- [ ] Advanced filtering
- [ ] Admin dashboard
- [ ] Analytics dashboard
- [ ] Push notifications
- [ ] Image upload functionality

## Resources

- [React Documentation](https://react.dev)
- [React Router Docs](https://reactrouter.com)
- [CSS Tips & Tricks](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Getting Help

1. Check component comments
2. Review README.md
3. Check browser console (F12)
4. Inspect HTML structure
5. Review context files for state structure
6. Check validation.js for form rules

---

Happy coding! 🚀
