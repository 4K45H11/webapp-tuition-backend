const express = require('express')

const {protect,authorizeStudent,authorizeAdmin} = require('../middleware/auth.middle')

const router = express.Router()

//shared authorized route
router.get('/me',protect,(req,res)=>{
    res.json({message: `Welcome, ${req.user.role}`,user: req.user})
})

//admin only

router.get('/admin/dashboard',protect,authorizeAdmin,(req,res)=>{
    res.json({message:'Admin dashboard access granted'})
})

//student only

router.get('/student/dashboard',protect,authorizeStudent,(req,res)=>{
    res.json({message: 'Student dashboard access granted'})
})

module.exports = router;