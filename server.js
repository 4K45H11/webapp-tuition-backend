const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()


app.use(cors({ origin: 'http://localhost:5173', credentials: true }))
app.use(express.json())
app.use(cookieParser())


app.get('/',(req,res)=>{
    res.status(200).json('Welcome to the tution server.')
})

app.use('/auth',require('./routes/auth.route'))
app.use('/protected',require('./routes/protected.route'))
app.use('/test',require('./routes/test.route'))
app.use('/videos',require('./routes/video.route'))
app.use('/doubts',require('./routes/doubt.route'))
app.use('dashboard',require('./routes/dashboard.route'))
app.use('/payments',require('./routes/payment.route'))
app.use('/performence',require('./routes/performence.route'))
app.use('/admin',require('./routes/admin.route'))


mongoose.connect(process.env.MONGODB)
.then(()=>{
    app.listen(process.env.PORT||5000,()=>console.log(`server is running`));
})
.catch((err)=>{
    console.log('db error',err.message)
})