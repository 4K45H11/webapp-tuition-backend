const mongoose = require('mongoose')

const tokenSchema = new mongoose.Schema({
    userId : {type:mongoose.Schema.Types.ObjectId, ref:'TutionUser'},
    token :{type:String,required:true},
    //auto deleted after 1 day.
    createdAt:{type: Date, default:Date.now, expires:'1d'}
});

module.exports = mongoose.model('TutionToken',tokenSchema);