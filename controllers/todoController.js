
const Todo = require('../models/todo_list')

function findAll(req, res) {
    Todo
        .find()
        .then(data => {
            res.status(201).json({
                data,
                message: 'success find all'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}


function findOne(req, res) {
    const id = {
        _id: req.params.id
    }
    Todo
        .findOne(id)
        .then(data => {
            res.status(201).json({
                data,
                message: 'success find one'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}


function create (req, res) {
    Todo
        .create({
            todoName: req.body.todoName,
            description: req.body.description,
            status: req.body.status
        })
        .then(data => {
            res.status(201).json({
                data,
                message: 'success create to do name'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: "internal server error"
            })
        })
}


function update(req, res) {
    Todo
        .findByIdAndUpdate(req.params.id,
        {
            todoName: req.body.todoName,
            description: req.body.description,
            status: req.body.status
        })
        .then(data => {
            res.status(201).json({
                data,
                message: 'success update todo'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}


function removeTodoList(req, res) {
    Todo
        .findByIdAndDelete(req.params.id)
        .then(data => {
            res.status(201).json({
                data,
                message: 'success delete by id'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}




module.exports = {
    findAll,
    create,
    findOne,
    update,
    removeTodoList
}
