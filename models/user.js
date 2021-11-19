const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchem = new Schema({
    fullName: String,
    email: String,
    password: String

})

const User = mongoose.model('User', userSchem)
module.exports = User