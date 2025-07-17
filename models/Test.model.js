const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
    questionText: String,

    //4 options will be there
    options: [String],

    //not accessable to students
    correctIndex: Number,
});

const testSchema = new mongoose.Schema({
    title:String,

    //in minutes
    duration: Number,

    isPaid: {type:Boolean,default:false},

    createdBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'TutionUser',
    },
    questions:[questionSchema]
})

module.exports = mongoose.model('TutionTest',testSchema)