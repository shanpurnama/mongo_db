

const jwt = require('jsonwebtoken')
const User = require('../models/user')
const Todo = require('../models/todo')

function authenticate(req, res, next) {
    try {
        jwt.verify(req.headers.token, process.env.PRIVATE_KEY)
        next()
    } catch(err) {
        res.status(400).json({
            message: 'Unauthenticate'
        })
    }
}

function userAuthorize (req, res, next) {
    try {
        var decode = jwt.verify(req.headers.token, process.env.PRIVATE_KEY)
        User
            .findById(req.params.id)
            .then(data => {
                if (data && data._id.toString() === decode._id) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'Unauthorized...'
                    })
                }
            })
    } catch(err) {
        console.log(err)
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}

function todoAuthorize(req, res, next) {
    try {
        var decode = jwt.verify(req.headers.token, process.env.PRIVATE_KEY)
        Todo
            .findById(req.params.id)
            .then(data => {
                if (data && data.user.toString() === decode._id) {
                    next()
                } else {
                    res.status(401).json({
                        message: 'unauthorized'
                    })
                }
            })
    } catch(err) {
        console.log(err)
        res.status(401).json({
            message: 'Unauthorized'
        })
    }
}
module.exports = {
    authenticate,
    userAuthorize,
    todoAuthorize
}

// owner
// users