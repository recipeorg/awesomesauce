// Establish Express App
const { request } = require('express')
const express = require('express')
const app = express()

// For environment variables
require('dotenv/config')

// Set view engine for displaying .ejs pages
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) =>{
    res.render('index', {name: req.user.username})
})

// Connects auth.js routes
const authenticationRouter = require('./routes/auth')
app.use('/', authenticationRouter)

// Make App listen on port 3000
app.listen(3000)