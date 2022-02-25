const express = require('express')
const message = require('./model/schema')
const authRoute = require('./route/AuthRouter')
const testRoutes = require('./route/post.route')
const authMiddleWare = require('./middleware/auth')
const app = express()

const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://user1:AYjrYjrKxHIimC85@cluster0.kvygz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})

app.use((req,res,next)=> {
    res.setHeader('Access-Control-Allow-Origin','*')
    res.setHeader('Access-Control-Allow-Headers','Origin,X-Requested-With,Content,Accept,Content-Type,Authorization')
    res.setHeader('Access-Control-Allow-Origin','GET,POST,PUT,DELETE')
    next()
})

app.use(express.json())
app.use(express.urlencoded({
    extended:true
}))

app.use('/test', testRoutes)
app.use('/auth', authRoute)

app.use((req, res) => {
    res.json({message: 'Ouvert'})
})


module.exports = app