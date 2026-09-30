const express = require('express');
const router = express.Router();
const { getSettingsAndAnnouncement, updateSiteSettings } = require('../controllers/settingController');
const { authenticate, requireAdmin } = require('../middleware/auth');

router.get('/', getSettingsAndAnnouncement);
router.put('/', authenticate, requireAdmin, updateSiteSettings);

module.exports = router;
