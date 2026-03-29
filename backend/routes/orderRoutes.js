const express = require('express');
const router = express.Router();
const { createCheckoutSession, verifyPayment } = require('../controllers/orderController');
const { protect } = require('../middleware/authMiddleware');

router.post('/checkout-session', protect, createCheckoutSession);
router.post('/verify', protect, verifyPayment);

module.exports = router;
