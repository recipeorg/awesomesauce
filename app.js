// Establish Express App
const express = require('express')
const app = express()

// For connection to MongoDB
const mongoose = require('mongoose')

// For User Scheme
const User = require('./models/user')

// For environment variables
require('dotenv/config')

// Set view engine for displaying .ejs pages
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) =>{
    res.render('index')
})

const authenticationRouter = require('./routes/auth')
app.use('/auth', authenticationRouter)

// connect to MongoDB
mongoose.connect(
    process.env.DB_CONNECTION, 
    (err)=> {
        if(err) console.log(err)
        else console.log('Connected to MongoDB!')
    }
)

// Code to create a user object and save to database:
// const user = new User({
//     'username': 'exampleuser',
//     'email': 'example@gmail.com',
//     'password': 'password123'
// })
// user.save()

// Make App listen on port 3000
app.listen(3000)