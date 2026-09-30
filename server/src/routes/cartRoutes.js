const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  deleteCartItem,
  syncGuestCart,
} = require('../controllers/cartController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', getCart);
router.post('/', addToCart);
router.post('/sync', syncGuestCart);
router.put('/:id', updateCartItem);
router.delete('/:id', deleteCartItem);

module.exports = router;
