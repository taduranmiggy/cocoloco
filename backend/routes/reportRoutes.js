const router = require('express').Router();
const auth = require('../middleware/auth');
const roleGuard = require('../middleware/roleGuard');
const { getSalesReport, getInventoryReport } = require('../controllers/reportController');

router.use(auth, roleGuard('seller'));

router.get('/sales', getSalesReport);
router.get('/inventory', getInventoryReport);

module.exports = router;
