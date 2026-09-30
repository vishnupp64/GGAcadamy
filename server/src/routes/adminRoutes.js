const express = require('express');
const router = express.Router();
const { getAdminDashboardStats, getUsers, updateUserRole } = require('../controllers/adminController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.use(authenticate, requireAdmin);

router.get('/dashboard', getAdminDashboardStats);
router.get('/users', getUsers);
router.put('/users/:id/role', updateUserRole);

module.exports = router;
