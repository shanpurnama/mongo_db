
const mongoose = require('mongoose')
const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/findAll', userController.findAll)

router.post('/create', userController.createUser)

router.put('/updateUserById/:id', userController.updateUserById)

router.delete('/deleteUserById/:id', userController.deleteUserById)

module.exports = router