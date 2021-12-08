const express = require('express')
const router = express.Router()
const projectController = require('../controllers/projectController')
const verify = require('../middleware/verify')

router.get('/findAll', projectController.findAll)
router.post('/create/:id', verify.authenticate, verify.userAuthorize, projectController.create)

module.exports = router