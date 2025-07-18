const express = require('express')
const {uploadVideo,getAllVideos,deleteVideo} = require('../controllers/video.controller')
const {protect,authorizeAdmin} = require('../middleware/auth.middle')

const router = express.Router()

router.post('/',protect,authorizeAdmin,uploadVideo)
router.get('/',protect,getAllVideos)
router.delete('/:id',protect,authorizeAdmin,deleteVideo)

module.exports = router;