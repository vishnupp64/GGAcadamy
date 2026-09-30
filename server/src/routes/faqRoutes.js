const express = require('express');
const router = express.Router();
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/', getFAQs);

// Admin Routes
router.post('/', authenticate, requireAdmin, createFAQ);
router.put('/:id', authenticate, requireAdmin, updateFAQ);
router.delete('/:id', authenticate, requireAdmin, deleteFAQ);

module.exports = router;
