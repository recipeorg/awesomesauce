if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}

const { application } = require('express')
const express = require('express')
const bcrypt = require('bcrypt')
const router = express.Router()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')

// For connection to MongoDB
const mongoose = require('mongoose')
mongoose.connect(
    process.env.DB_CONNECTION, 
    (err)=> {
        if(err) console.log(err)
        else console.log('Connected to MongoDB!')
    }
)

// For User Scheme
const User = require('../models/user')

const initalizePassport = require('../passport-config')
initalizePassport(
    passport, 
    email => User.findOne({email: email}),
    id => User.findOne({id: id})     
)

router.use(express.urlencoded({ extended: false }))

router.use(flash())
router.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

router.use(passport.initialize())
router.use(passport.session())


router.get('/login', (req, res) =>{
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}))

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