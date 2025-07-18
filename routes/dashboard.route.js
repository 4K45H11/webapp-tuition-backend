const express = require('express')
const {protect} = require('../middleware/auth.middle')
const {getStudentDashboard} = require('../controllers/dashboard.controller')

const router = express.Router()

router.get('/',protect,getStudentDashboard)

module.exports = router;