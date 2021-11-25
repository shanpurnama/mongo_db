const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
    todoName: String,
    description: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    status: {
        type: Boolean,
        default: false
    }
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo