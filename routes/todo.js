

const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const { route } = require('./user')

router.get('/findAll', todoController.findAll)

router.get('/findOne/:id', todoController.findOne)

router.post('/createToDoList', todoController.create)

router.put('/update/:id', todoController.update)

router.delete('/delete/:id', todoController.removeTodoList)

module.exports = router