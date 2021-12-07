const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const { Schema } = mongoose

const userSchema = new Schema({
    fullName: {
        type: String,
        minlength: [6, 'full name must contain at least 6 alphabets'],
        required: [true, 'please input your full name']
    },
    email: {
        type: String,
        unique: true,
        validate : {
            validator: function (v) {
                const regex = /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/
                return regex.test(v)
            },
            message: 'invalid format email'
        },
        required: [true, 'please input your email'],
    },
    password: {
        type: String,
        required: [true, 'please input your password']
    },
    projects: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        default: null
    }],
})

userSchema.pre('save', function() {
    const hashRegister = bcrypt.hashSync(this.password, 3)
    this.password = hashRegister
})

const User = mongoose.model('User', userSchema)
module.exports = User

// validate
// unique for email
// regex test for email
// validation
// custom validator
// hooks
// this
// createdDate for tod