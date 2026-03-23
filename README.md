# CocoirStore - Coconut Coir E-Commerce Platform

A full-stack e-commerce website for selling coconut coir products with separate buyer and seller interfaces.

## Project Overview

This is an educational e-commerce project built with React.js, featuring:
- **Buyer-side functionality**: Shopping, cart management, checkout, order history, and profile management
- **Seller-side functionality**: Product inventory management, storefront management, and sales reports
- **State management** using Context API
- **Routing** with React Router for smooth navigation
- **Authentication & Authorization** for role-based access control
- **Responsive UI** for mobile and desktop devices
- **Form validation** for registration, checkout, and product management
- **Mock API calls** with localStorage persistence

## Project Structure

```
ECOMMERCEFINALS/
├── public/
│   └── index.html                 # Main HTML file
├── src/
│   ├── components/                # Reusable components
│   │   ├── Navbar.js             # Top navigation bar
│   │   ├── Footer.js             # Footer component
│   │   ├── ProductCard.js        # Product card component
│   │   ├── CartItem.js           # Shopping cart item
│   │   └── ProtectedRoute.js     # Route guard for auth
│   ├── context/                   # State management contexts
│   │   ├── AuthContext.js        # Authentication context
│   │   ├── CartContext.js        # Shopping cart context
│   │   └── ProductContext.js     # Product inventory context
│   ├── pages/
│   │   ├── buyer/                # Buyer-side pages
│   │   │   ├── HomePage.js       # Home page
│   │   │   ├── LoginPage.js      # Buyer login
│   │   │   ├── RegisterPage.js   # Buyer registration
│   │   │   ├── ProductsPage.js   # Product listing
│   │   │   ├── CartPage.js       # Shopping cart
│   │   │   ├── CheckoutPage.js   # Checkout/Payment
│   │   │   ├── TransactionHistoryPage.js # Order history
│   │   │   └── ProfilePage.js    # User profile
│   │   └── seller/               # Seller-side pages
│   │       ├── SellerLoginPage.js       # Seller login
│   │       ├── StorefrontManagementPage.js # Featured products
│   │       ├── InventoryPage.js         # Product management
│   │       └── ReportsPage.js           # Sales reports
│   ├── styles/                    # Styling
│   │   ├── index.css             # Global styles & CSS variables
│   │   ├── App.css               # Main app styles
│   │   ├── navbar.css            # Navbar styles
│   │   ├── footer.css            # Footer styles
│   │   ├── productCard.css       # Product card styles
│   │   ├── cartItem.css          # Cart item styles
│   │   └── pages/                # Page-specific styles
│   │       ├── home.css
│   │       ├── auth.css
│   │       ├── products.css
│   │       ├── cart.css
│   │       ├── checkout.css
│   │       ├── transactions.css
│   │       ├── profile.css
│   │       └── seller.css
│   ├── App.js                     # Main app with routing
│   └── index.js                   # React entry point
├── package.json                   # Dependencies and scripts
└── README.md                      # This file
```

## Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps

1. **Navigate to project directory:**
   ```bash
   cd ECOMMERCEFINALS
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Features

### Buyer-Side Features

#### 1. **Home Page**
- Hero section with call-to-action
- Company information cards
- Featured and trending products
- Navigation to product catalog

#### 2. **Authentication**
- **Login Page**: Email & password validation
- **Registration Page**: 
  - Full Name, Email, Password (with confirmation)
  - Address and Mobile Number fields
  - Complete form validation
  - Persistent user session with localStorage

#### 3. **Product Browsing**
- View all products with images, prices, and descriptions
- Search products by name, description, or category
- Filter by product categories
- Real product images from Unsplash

#### 4. **Shopping Cart**
- Add/remove products from cart
- Update quantities
- Real-time cart total calculation
- Cart persistence using localStorage
- Clear cart functionality

#### 5. **Checkout**
- Review order before payment
- Delivery address display
- Choose delivery method (Home Delivery/Pickup)
- Choose payment method (Cash on Delivery/Online)
- Simulated online payment form
- Order confirmation

#### 6. **Order History**
- View all past purchases
- Check order status (Pending/Completed/Cancelled)
- View order details and items
- Track payment and delivery information

#### 7. **User Profile**
- View and edit profile information
- Update personal details
- Change address and contact number
- Profile picture with initials

### Seller-Side Features

#### 1. **Seller Login**
- Email & password authentication
- Persistent seller session
- Role-based access control

#### 2. **Storefront Management**
- Toggle featured product status
- Toggle trending product status
- Manage which products appear on homepage
- Visual status indicators

#### 3. **Inventory Management**
- Add new products with:
  - Product name, category, price
  - Product description and image URL
  - Stock quantity management
  - In-stock status toggle
- Edit existing products
- Delete products from inventory
- Complete product list view

#### 4. **Sales Reports**
- Key metrics dashboard:
  - Total sales amount
  - Total orders count
  - Average order value
  - Number of products listed
- Daily sales chart (last 7 days)
- Monthly sales overview
- Recent orders list
- Inventory status tracking

## State Management

### AuthContext
Manages:
- User authentication (login/register)
- Current user information
- User type (buyer/seller)
- Authentication token
- Logout functionality

### CartContext
Manages:
- Shopping cart items
- Add/remove from cart
- Update quantities
- Cart totals
- Cart persistence

### ProductContext
Manages:
- Product inventory
- Product search and filtering
- Featured and trending product management
- Add/edit/delete products (seller)

## Routing Structure

```
/                           → Home page (public)
/buyer/login               → Buyer login
/buyer/register            → Buyer registration
/products                  → Products listing (protected - buyer)
/cart                      → Shopping cart (protected - buyer)
/checkout                  → Checkout (protected - buyer)
/transactions              → Order history (protected - buyer)
/profile                   → User profile (protected - buyer)
/seller/login              → Seller login
/seller/storefront         → Storefront management (protected - seller)
/seller/inventory          → Inventory management (protected - seller)
/seller/reports            → Sales reports (protected - seller)
```

## Component Documentation

### Navbar Component
- Displays navigation links based on user type
- Shows cart item count for buyers
- User information display
- Logout functionality

### Footer Component
- Company information
- Quick links
- Contact information
- Social media links
- Educational disclaimer

### ProductCard Component
- Product image display
- Product details (name, category, price)
- Add to cart functionality (buyer view)
- Edit/Delete buttons (seller view)
- Stock status indicator
- Out-of-stock state

### CartItem Component
- Product details
- Quantity selector
- Item total calculation
- Remove button
- Responsive design

### ProtectedRoute Component
- Checks user authentication
- Verifies user type for role-based access
- Redirects to home if unauthorized

## Form Validation

### Registration Form
- Email format validation
- Password minimum length (6 characters)
- Password confirmation match
- Mobile number format (10 digits)
- All required fields validation

### Login Form
- Email format validation
- Password minimum length
- Non-empty field validation

### Product Form (Seller)
- Product name required
- Valid price input
- Valid quantity input
- Category selection
- Product description (optional)
- Image URL validation

### Checkout Form
- Address information prefilled
- Delivery method selection
- Payment method selection
- For online payments: card validation

## Styling

### Design System
- **Color Scheme**: Green primary, Blue secondary, Red danger
- **Typography**: Clean, accessible fonts
- **Spacing**: Consistent spacing system using CSS variables
- **Responsive**: Mobile-first approach with breakpoints at 768px and 1024px

### CSS Features
- CSS custom properties (variables)
- Flexbox and CSS Grid for layout
- Smooth transitions and hover effects
- Accessible button states and focus indicators
- Mobile-responsive design

## Data Persistence

The application uses **localStorage** to simulate database functionality:
- **User authentication**: `auth` key stores user session
- **Shopping cart**: `cart` key stores cart items
- **Orders**: `orders` key stores purchase history
- **Products**: Mock products initialized from context

All data persists across page refreshes and browser sessions.

## Testing the Application

### Test as Buyer:
1. Go to home page
2. Click "Buyer Login" or navigate to /buyer/login
3. Demo credentials: any email, password (min 6 chars)
4. Browse products at `/products`
5. Add items to cart
6. Complete checkout
7. View orders in transaction history
8. Edit profile information

### Test as Seller:
1. Navigate to /seller/login
2. Demo credentials: any email, password (min 6 chars)
3. Manage products in inventory
4. Toggle featured/trending status
5. View sales reports and metrics

## Demo Credentials

- **Email**: Can be any valid email format
- **Password**: Minimum 6 characters
- **No pre-registered accounts needed** - Forms accept any valid input

## Technologies Used

- **Frontend Framework**: React 18.2.0
- **Routing**: React Router 6.8.0
- **State Management**: Context API
- **HTTP Client**: Axios (for future real API integration)
- **Styling**: CSS3 with custom properties
- **Storage**: Browser localStorage API

## Performance Optimizations

- Components are functional and use hooks for state management
- Context API reduces prop drilling
- CSS custom properties for dynamic theming
- Images from CDN (Unsplash) for performance
- localStorage for instant data persistence

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

1. **Backend Integration**
   - Connect to real database (MongoDB, PostgreSQL)
   - Implement actual payment gateway (Stripe, Razorpay)
   - Real user authentication (JWT tokens)

2. **Features**
   - Product reviews and ratings
   - Wishlist functionality
   - Bulk product import for sellers
   - Email notifications
   - Advanced analytics for sellers

3. **Performance**
   - Code splitting with React.lazy()
   - Image optimization and lazy loading
   - Service worker for offline support

4. **Security**
   - HTTPS enforcement
   - Input sanitization
   - CSRF protection
   - Rate limiting

## Project Notes

**For Educational Purposes Only**: This project is created for learning and educational demonstrations. It includes simulated API calls using localStorage for data persistence. In production, this would be replaced with actual backend APIs and database systems.

## Display Information

- **Company Name**: CocoirStore
- **Logo**: Coconut emoji (🥥)
- **Product Category**: Coconut Coir Products
- **Group Name**: [Add your group name]
- **Disclaimer**: All pages include the footer notice: "For educational purposes only, and no copyright infringement is intended."

## Getting Help

- Check browser console for error messages
- Ensure all dependencies are installed (`npm install`)
- Clear localStorage if experiencing data issues (Dev Tools → Application → Local Storage)
- Reset data and start fresh for testing

---

**Build Date**: 2024
**Node.js Version**: 14+
**React Version**: 18.2.0+
