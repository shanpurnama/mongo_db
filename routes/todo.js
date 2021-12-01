

const express = require('express')
const router = express.Router()
const todoController = require('../controllers/todoController')
const verify = require('../middleware/verify')


router.get('/findAll', verify.authenticate, todoController.findAll)

router.get('/findOne/:id', verify.authenticate, verify.todoAuthorize, todoController.findOne)

router.get('/findByUserId/:id', verify.authenticate, verify.userAuthorize, todoController.findByUserId)

router.post('/create', verify.authenticate, todoController.create)

router.put('/update/:id', verify.authenticate, verify.todoAuthorize, todoController.update)

router.delete('/delete/:id', verify.authenticate, verify.todoAuthorize, todoController.removeTodoList)

module.exports = router