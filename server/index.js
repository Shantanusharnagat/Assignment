const express=require('express')

const dotenv= require('dotenv').config()
const cors=require('cors')
const connectDB=require('./db.js')

connectDB()

const port=process.env.PORT || 5000

const app=express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.use('/api/auth', require('./routes/auth.js'))
app.use('/api/courses', require('./routes/courses.js'))

app.listen(port, ()=>{
    console.log(`server started on ${port}`)
})