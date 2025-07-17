const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    test:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TutionTest'
    },
    student:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'TutionUser'
    },

    selectedAnswers:[Number],

    score:Number,
    total:Number,
    right:Number,
    wrong:Number,
    accuracy:Number,
    timeTaken:Number,

    isRanked: { 
        type: Boolean, 
        default: false 
    },
    submittedAt:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model('TutionSubmission',submissionSchema)