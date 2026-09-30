const express = require('express');
const router = express.Router();
const { getMyEnrollments, createEnrollment } = require('../controllers/enrollmentController');
const { authenticate } = require('../middleware/auth');

router.use(authenticate);

router.get('/', getMyEnrollments);
router.post('/', createEnrollment);

module.exports = router;
