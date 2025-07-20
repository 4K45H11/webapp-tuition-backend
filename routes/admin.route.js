const express = require('express');
const router = express.Router();
const { protect, authorizeAdmin } = require('../middleware/auth.middle');
const { getAdminOverView } = require('../controllers/admin.controller');


router.get('/overview', protect, authorizeAdmin, getAdminOverView);

module.exports = router;
