const mongoose = require('mongoose')

const { Schema } = mongoose

const todoSchema = new Schema({
    todoName: String,
    description: String,
    status: Boolean
})

const Todo = mongoose.model('Todo', todoSchema)
module.exports = Todo