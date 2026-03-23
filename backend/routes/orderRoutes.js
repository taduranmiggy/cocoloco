const router = require('express').Router();
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');
const {
  createOrder,
  getOrders,
  getOrder,
  updateOrderStatus,
} = require('../controllers/orderController');

router.post('/', auth, roleGuard('buyer'), createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrder);
router.put('/:id/status', auth, roleGuard('seller'), updateOrderStatus);

module.exports = router;
