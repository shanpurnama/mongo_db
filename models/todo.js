const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'name must contain at least more then 3 alpahabets'],
        required: [true, 'please input your name']
    },

    description: {
        type: String,
        minlength: [3, 'description must contain at least more than 3 alphabets'],
        required: [true, 'please input your description']
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    status: {
        type: Boolean,
        default: false
    },

    createdDate: {
        type: String,
    }
})
todoSchema.pre('save', function() {
    this.createdDate = new Date()
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo
