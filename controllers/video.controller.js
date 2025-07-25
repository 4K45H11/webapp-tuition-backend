const Video = require('../models/Video.model')

exports.uploadVideo = async (req, res) => {
    try {
        const { title, description, videoUrl } = req.body
        const video = await Video.create({
            title, description, videoUrl,
            uploadedBy: req.user.id
        })

        res.status(201).json(video)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find().sort({ createdAt: -1 });
        res.json(videos)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

exports.deleteVideo = async (req, res) => {
    try {
        await Video.findByIdAndDelete(req.params.id)
        res.json({ message: 'Video deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}