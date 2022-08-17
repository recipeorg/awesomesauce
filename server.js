// Establish Express App
const express = require('express')
const app = express()

// Set view engine for displaying .ejs pages
app.set('view engine', 'ejs')

// Routes
app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/login', (req, res) =>{
    res.render('login')
})

app.get('/signup', (req, res) =>{
    res.render('signup')
})

// connect to MongoDB


// Make App listen on port 3000
app.listen(3000)