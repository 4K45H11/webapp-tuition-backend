const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json('Welcome to the tution server.')
})
app.use('/auth',require('./routes/auth.route'))

mongoose.connect(process.env.MONGODB)
.then(()=>{
    app.listen(process.env.PORT||5000,()=>console.log(`server is running`));
})
.catch((err)=>{
    console.log('db error',err.message)
})