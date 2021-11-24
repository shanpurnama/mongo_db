

const jwt = require('jsonwebtoken')
const User = require('../models/user')

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

function authorize (req, res, next) {
    try {
        const id = {
            _id: req.params.id
        }
        var decode = jwt.verify(req.headers.token, process.env.PRIVATE_KEY)
        // console.log(decode._id, 'decode')
        User
            .findOne(id)
            .then(data => {
                console.log(data, 'data')
                if (data.id === decode._id) {
                    console.log('masuk')
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

module.exports = {
    authenticate,
    authorize
}