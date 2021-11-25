

const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const verify = require('../middleware/verify')


router.get('/findAll', todoController.findAll)

router.get('/findOne/:id', todoController.findOne)

router.get('/findByUserId/:id', todoController.findByUserId)

router.post('/create', todoController.create)

router.put('/update/:id', todoController.update)

router.delete('/delete/:id', todoController.removeTodoList)

module.exports = router