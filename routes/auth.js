const { application } = require('express')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()

// For User Scheme
const User = require('../models/user')

router.use(express.urlencoded({ extended: false }))

// For connection to MongoDB
const mongoose = require('mongoose')

// connect to MongoDB
mongoose.connect(
    process.env.DB_CONNECTION, 
    (err)=> {
        if(err) console.log(err)
        else console.log('Connected to MongoDB!')
    }
)

router.get('/login', (req, res) =>{
    res.render('login')
})

router.post('/login', (req, res) =>{
    // req.body.email
    // req.body.username
    // req.body.password
})

router.get('/signup', (req, res) =>{
    res.render('signup')
})

router.post('/signup', async (req, res) =>{
    try{
        
        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        // Code to create a user object and save to database:
        const user = new User({
            'username': req.body.username,
            'email': req.body.email,
            'password': hashedPassword
        })
        user.save()
        console.log('User Registered')   
        
        res.redirect('/login')
    } catch{
        res.redirect('/signup')
    }
})

module.exports = router