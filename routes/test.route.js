const express = require('express')
const {createTest,updateTest,deleteTest,getAllTests,getTestById,submitTest,getResult,getGlobalRanking} = require('../controllers/test.controller')

const {protect,authorizeStudent,authorizeAdmin} = require('../middleware/auth.middle')

const router = express.Router()

//admin
router.post('/',protect,authorizeAdmin,createTest)
router.put('/:id',protect,authorizeAdmin,updateTest)
router.delete('/:id',protect,authorizeAdmin,deleteTest)

//student
router.get('/',protect,getAllTests)
router.get('/:id',protect,authorizeStudent,getTestById)
router.post('/:id/submit',protect,authorizeStudent,submitTest)
router.get('/:id/result',protect,getResult)

//global ranking
router.get('/:id/rankings',protect,getGlobalRanking)

module.exports = router;