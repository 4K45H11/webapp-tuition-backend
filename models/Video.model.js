const mongoose = require('mongoose')
const videoSchema = new mongoose.Schema({
    title:String,
    description:String,
    videoUrl:String,
    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TutionUser'
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('TutionVideo',videoSchema)

