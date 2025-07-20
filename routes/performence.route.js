const express = require('express')
const router = express.Router()
const {getStudentPerformence} = require('../controllers/performence.controller')
const {protect,authorizeStudent} = require('../middleware/auth.middle')

router.get('/:studentId',protect,authorizeStudent,getStudentPerformence)

module.exports = router;