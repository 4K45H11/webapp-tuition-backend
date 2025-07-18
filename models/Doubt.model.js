const mongoose = require('mongoose')

const doubtSchema = new mongoose.Schema({
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TutionUser'
    },
    question:String,
    answer:String,
    askedAt:{
        type:Date,
        default:Date.now
    },
    answeredAt:Date
})

module.exports = mongoose.model('TutionDoubt',doubtSchema)
