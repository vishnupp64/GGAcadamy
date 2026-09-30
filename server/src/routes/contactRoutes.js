const express = require('express');
const router = express.Router();
const {
  submitContactMessage,
  getContactMessages,
  markMessageAsRead,
} = require('../controllers/contactController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.post('/', submitContactMessage);

// Admin Routes
router.get('/', authenticate, requireAdmin, getContactMessages);
router.put('/:id/read', authenticate, requireAdmin, markMessageAsRead);

module.exports = router;
