const router = require('express').Router();
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

// Public routes
router.get('/', getProducts);
router.get('/:id', getProduct);

// Seller-only routes
router.post('/', auth, roleGuard('seller'), createProduct);
router.put('/:id', auth, roleGuard('seller'), updateProduct);
router.delete('/:id', auth, roleGuard('seller'), deleteProduct);

module.exports = router;
