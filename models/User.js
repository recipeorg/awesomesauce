const mongoose = require('mongoose')
const Schema = mongoose.Schema;

// Create Schema for Users
const userSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, {timestamps: true})

// Create model from Schema
const User = mongoose.model('User', userSchema)
module.exports = User