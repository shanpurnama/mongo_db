const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')

router.get('/findAll', projectController.findAll)
router.post('/create', projectController.create)

module.exports = router