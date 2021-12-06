const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.post('/create', projectController.create)

module.exports = router