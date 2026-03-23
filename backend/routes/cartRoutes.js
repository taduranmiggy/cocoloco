const router = require('express').Router();
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');
const { getCart, addItem, updateItem, removeItem, clearCart } = require('../controllers/cartController');

router.use(auth, roleGuard('buyer'));

router.get('/', getCart);
router.post('/', addItem);
router.put('/:itemId', updateItem);
router.delete('/clear', clearCart);
router.delete('/:itemId', removeItem);

module.exports = router;
