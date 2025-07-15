const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type: String,
        required : true
    },
    password:{
        type:String,
        required : true
    },
    role:{
        type : String,
        enum:['student','admin'],
        default:'student'
    }

});

//hashing the password before saving
userSchema.pre('save',async function () {
    if(!this.isModified("password")) return;

    this.password = await bcrypt.hash(this.password,10)
});

//predefined userSchema method for matching password

userSchema.methods.matchPassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword,this.password)
}

module.exports = mongoose.model('TutionUser',userSchema);