const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/findAll', userController.findAll)

router.post('/register', userController.register)

router.put('/updateUserById/:id', userController.updateUserById)

router.delete('/deleteUserById/:id', userController.deleteUserById)

router.post('/login', userController.login)

module.exports = router