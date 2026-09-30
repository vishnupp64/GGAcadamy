const express = require('express');
const router = express.Router();
const {
  getTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} = require('../controllers/testimonialController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/', getTestimonials);

// Admin Routes
router.post('/', authenticate, requireAdmin, createTestimonial);
router.put('/:id', authenticate, requireAdmin, updateTestimonial);
router.delete('/:id', authenticate, requireAdmin, deleteTestimonial);

module.exports = router;
