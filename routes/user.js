const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const verify = require('../middleware/verify')

router.get('/findAll', userController.findAll)

router.post('/register', userController.register)

router.put('/updateUserById/:id', verify.authenticate, verify.authorize, userController.updateUserById)

router.delete('/deleteUserById/:id', verify.authenticate, verify.authorize, userController.deleteUserById)

router.post('/login', userController.login)

module.exports = router