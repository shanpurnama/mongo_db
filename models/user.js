const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        minlength: [6, 'must containing at least 6 alphabets']
    },
    email: {
        type: String,
        unique: true,
        validate: {
            validator: function(email) {
              return /\d{3}-\d{3}-\d{4}/.test(email)
            },
            message: 'is not valid format email'
        },
        required: [false, 'please input your email'],
    },
    password: String

})

const User = mongoose.model('User', userSchema)
module.exports = User

// validate
// unique for email
// regex test for email
// validation
// custom validator