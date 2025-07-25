const express = require('express')
const {askDoubt,answerDoubt,getAllDoubts,getStudentDoubts,deleteDoubt} = require('../controllers/doubt.controller')
const {protect,authorizeAdmin,authorizeStudent} = require('../middleware/auth.middle')

const router = express.Router()

router.post('/',protect,authorizeStudent,askDoubt)
router.put('/:id/answer',protect,authorizeAdmin,answerDoubt)
router.get('/',protect,authorizeAdmin,getAllDoubts)
router.get('/my',protect,getStudentDoubts)
router.delete('/my/:id',protect,authorizeStudent,deleteDoubt)

module.exports = router;
