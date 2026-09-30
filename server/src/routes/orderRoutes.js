const express = require('express');
const router = express.Router();
const {
  createOrder,
  createRazorpayOrder,
  verifyRazorpayPayment,
  getUserOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
} = require('../controllers/orderController');
const { authenticate, optionalAuth, requireAdmin } = require('../middleware/auth');

router.post('/', optionalAuth, createOrder);
router.post('/razorpay/create-order', optionalAuth, createRazorpayOrder);
router.post('/razorpay/verify-payment', optionalAuth, verifyRazorpayPayment);
router.get('/', authenticate, getUserOrders);
router.get('/:id', authenticate, getOrderById);

// Admin Routes
router.get('/admin/all', authenticate, requireAdmin, getAllOrders);
router.put('/admin/:id/status', authenticate, requireAdmin, updateOrderStatus);

module.exports = router;

