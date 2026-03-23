# Setup Instructions - CocoirStore E-Commerce Platform

Follow these step-by-step instructions to get the project running on your machine.

## Prerequisites Check

Before starting, ensure you have:
- [ ] Windows 10/11, macOS, or Linux
- [ ] Administrator access to your computer
- [ ] Internet connection for npm package downloads

## Step 1: Install Node.js (If Not Already Installed)

1. Visit [nodejs.org](https://nodejs.org)
2. Download **LTS (Long Term Support)** version (14.x or higher)
3. Run the installer and follow the installation wizard
4. Accept default settings and complete installation
5. Restart your computer

**Verify installation:**
Open Command Prompt or PowerShell and run:
```bash
node --version
npm --version
```
Both should return version numbers.

## Step 2: Extract/Open the Project

1. Navigate to your Desktop or desired folder
2. If compressed, extract `ECOMMERCEFINALS.zip`
3. Open the `ECOMMERCEFINALS` folder

## Step 3: Open Terminal/Command Prompt

1. **Windows**: 
   - In the ECOMMERCEFINALS folder, right-click → "Open PowerShell window here"
   - Or: `Win + R` → type `cmd` → Navigate to folder

2. **macOS/Linux**:
   - Open Terminal
   - Navigate: `cd /path/to/ECOMMERCEFINALS`

## Step 4: Install Dependencies

Run the following command in the project folder:

```bash
npm install
```

This will download and install all required packages from `package.json`. **This may take 2-5 minutes.**

Expected output:
```
added 1500+ packages, and audited 1505 packages in 2m45s
```

## Step 5: Start Development Server

Run:

```bash
npm start
```

The application will:
1. Compile all React components
2. Start a local development server
3. Automatically open your browser to `http://localhost:3000`

Wait for the message: **"Compiled successfully!"**

## Step 6: Access the Application

Once the browser opens, you'll see the **CocoirStore Home Page** with:
- Navigation bar with logo
- Hero section with call-to-action
- Featured products
- Trending products
- Company information

## Testing the Application

### Test as a Buyer:

1. **Home Page**
   - Click "Shop Now" or navigate to the products page
   - Explore featured and trending products

2. **Create Buyer Account**
   - Click "Buyer Login" in navbar
   - Click "Register here"
   - Fill form with:
     - Full Name: Your Name
     - Email: test@example.com
     - Address: Any address
     - Mobile: 9123456789 (10 digits)
     - Password: Password@123
     - Confirm Password: Password@123
   - Click "Register"

3. **Browse Products**
   - Use search bar to find products
   - Use category filters on the left
   - Click product card to view details
   - Select quantity and "Add to Cart"

4. **Shopping Cart**
   - Click "Cart" in navbar
   - View all items
   - Change quantities using dropdown
   - Remove items if needed
   - View order summary on right

5. **Checkout**
   - Click "Proceed to Checkout"
   - Review delivery address
   - Choose delivery method (Home Delivery/Pickup)
   - Choose payment method (Cash/Online)
   - If online: view card details form
   - Click "Place Order"
   - See success message

6. **Order History**
   - Click "Orders" in navbar
   - View all past orders
   - See order status and details
   - Click card to expand details

7. **User Profile**
   - Click "Profile" in navbar
   - View current information
   - Click "Edit Profile"
   - Modify details
   - Click "Save Changes"

### Test as a Seller:

1. **Seller Login**
   - Click "Seller Login" in navbar
   - Enter any email: seller@example.com
   - Enter password: password123
   - Click "Sign In"

2. **Inventory Management** (`/seller/inventory`)
   - Click "+ Add New Product"
   - Fill product details:
     - Product Name: Premium Coir Mix
     - Category: Coir Peat
     - Price: 599
     - Quantity: 100
     - Description: Optional description
     - Image URL: Leave empty or add from clipboard
   - Click "Add Product"
   - Edit or Delete existing products

3. **Storefront Management** (`/seller/storefront`)
   - View all products
   - Toggle "Featured" checkbox to feature products
   - Toggle "Trending" checkbox to mark as trending
   - Changes appear immediately on homepage

4. **Sales Reports** (`/seller/reports`)
   - View key metrics (sales, orders, products)
   - See daily sales chart
   - View recent orders table
   - Check inventory status

## Troubleshooting

### Issue: "npm command not found"
**Solution**: 
- Node.js not installed properly
- Restart computer after installing Node.js
- Check installation: `node --version`

### Issue: "Port 3000 is already in use"
**Solution**:
```bash
# On Windows PowerShell:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On macOS/Linux:
lsof -ti:3000 | xargs kill -9
```

### Issue: "npm install fails"
**Solution**:
1. Delete `node_modules` folder
2. Delete `package-lock.json` file
3. Run `npm install` again
4. Clear npm cache: `npm cache clean --force`

### Issue: Application shows blank page
**Solution**:
1. Check browser console for errors (F12)
2. Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
3. Clear browser cache
4. Ensure localhost:3000 is in address bar

### Issue: Styles not loading
**Solution**:
1. Hard refresh browser (Ctrl+F5)
2. Check developer tools → Console for CSS errors
3. Restart development server (Ctrl+C and `npm start`)

### Issue: Authentication not working
**Solution**:
1. Check browser console for errors
2. Ensure localStorage is enabled (DevTools → Storage)
3. Clear localStorage: DevTools → Application → Local Storage → Clear All

## Project Features Checklist

### Buyer Features
- [ ] Browse products with images and prices
- [ ] Search products by name/category
- [ ] Filter by product categories
- [ ] Add/remove items from cart
- [ ] Update cart quantities
- [ ] View cart total
- [ ] Complete checkout with delivery/payment options
- [ ] View order history with status
- [ ] Edit user profile
- [ ] Persistent cart and session

### Seller Features
- [ ] Add new products
- [ ] Edit product details
- [ ] Delete products
- [ ] Toggle featured products
- [ ] Toggle trending products
- [ ] View sales reports
- [ ] View recent orders
- [ ] Track inventory status

### UI Features
- [ ] Responsive design (works on mobile/tablet)
- [ ] Navigation bar on all pages
- [ ] Footer on all pages (with disclaimer)
- [ ] Consistent styling and layout
- [ ] Form validation with error messages
- [ ] Success messages for actions
- [ ] Loading states

## Development Tips

### Viewing Console Logs
Press `F12` to open Developer Tools:
- **Console tab**: See JavaScript logs and errors
- **Elements tab**: Inspect HTML structure
- **Network tab**: See API calls
- **Application tab**: View localStorage data

### Editing Components
All React files are in `/src` folder:
- Modify component files to see changes instantly (Hot Reload)
- Changes save automatically
- Refresh browser if styles don't update

### localStorage Data
Location: DevTools → Application → Local Storage → http://localhost:3000

Contents:
- `auth`: Current user session
- `cart`: Shopping cart items
- `orders`: Purchase history
- `products`: Product inventory

**To reset data**: Right-click → Delete

## Next Steps

1. **Explore the codebase**: Read comments in component files
2. **Review styling**: Check CSS files for design system
3. **Understand Context API**: Review context files for state management
4. **Learn routing**: Check App.js for route configuration

## Production Build

When ready to deploy:

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Need Help?

1. Check the **README.md** for detailed documentation
2. Review component comments in source files
3. Check browser console (F12) for error messages
4. Verify all prerequisites are installed correctly

---

**Happy coding! 🎉**

For educational purposes only. This project demonstrates e-commerce concepts and is not intended for production use without proper backend integration, security measures, and compliance with relevant regulations.
