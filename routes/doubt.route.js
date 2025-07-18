const express = require('express')
const {askDoubt,answerDoubt,getAllDoubts,getStudentDoubts} = require('../controllers/doubt.controller')
const {protect,authorizeAdmin,authorizeStudent} = require('../middleware/auth.middle')

const router = express.Router()

router.post('/',protect,askDoubt)
router.put('/:id/answer',protect,authorizeAdmin,answerDoubt)
router.get('/',protect,authorizeAdmin,getAllDoubts)
router.get('/my',protect,getStudentDoubts)

module.exports = router;
