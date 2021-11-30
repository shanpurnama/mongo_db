
const Todo = require('../models/todo')

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
    Todo
        .findById(req.params.id)
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

function findByUserId(req, res) {
    Todo
        .find({
            user: req.params.id
        })
        .populate({
            path: 'user'
        })
        .then(data => {
            console.log(data)
            res.status(200).json({
                data,
                message: 'success'
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
            name: req.body.todoName,
            description: req.body.description,
            user: req.body.user
        })
        .then(data => {
            res.status(201).json({
                data,
                message: 'success create todo'
            })
        })
        .catch(err => {
            // console.log(err.errors.name.properties.message)
            // console.log(err.errors.description.properties.message)
            if (err.errors && err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.properties.message
                })
            } else if (err.errors && err.errors.description) {
                res.status(400).json({
                    message: err.errors.description.properties.message
                })
            } else {
                res.status(500).json({
                    message: "internal server error"
                })
            }
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
    removeTodoList,
    findByUserId
}


// typeobjectid
// populate