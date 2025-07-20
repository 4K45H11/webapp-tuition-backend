const express = require('express');
const router = express.Router();
const { protect, authorizeAdmin } = require('../middleware/auth.middle');
const { getAdminOverview } = require('../controllers/admin.controller');


router.get('/overview', protect, authorizeAdmin, getAdminOverview);

module.exports = router;
