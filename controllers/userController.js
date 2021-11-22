const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')



function findAll(req, res) {
    User
        .find()
        .then(data => {
            res.status(201).json({
                data,
                message: 'success find all'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}

function register(req, res) {
    bcrypt.hash(req.body.password, 3).then(function(hashRegister) {
        User
            .create({
                fullName: req.body.fullName, 
                email: req.body.email, 
                password: hashRegister
            })
            .then(data => {
                res.status(201).json({
                    data,
                    message: 'success create a new'
                })
            })
            .catch(err =>{
                console.log(err)
                res.status(500).json({
                message: 'internal server error'
            })
        })

            
    })
    // const hash = bcrypt.hashSync(req.body.password, 3)
}

function updateUserById(req, res) { 
    bcrypt.hash(req.body.password, 3).then(function(hashUpdate) {
        User
            .findByIdAndUpdate(_id = req.params.id, {
                fullName: req.body.fullName, 
                email: req.body.email,
                password: hashUpdate
            })
            .then(data =>{
                res.status(201).json({
                    message: 'success update data',
                    data
                })
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                message: 'internal server error'
            })
        })
    })
    // const hashUpdate = bcrypt.hashSync(req.body.password, 3)
}

function deleteUserById(req, res) {
    User
        .findByIdAndDelete(_id = req.params.id)
        .then(data =>{
            res.status(201).json({
                message: 'success delete',
                data
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}


function login(req, res) {
    const dataEmail = {
        email: req.body.email
    }
    User
        .findOne(dataEmail)
        .then(data => {
           if (data === null) {
               res.status(404).json({
                   message: 'email not found'
               })
            }else {
                bcrypt.compare(req.body.password, data.password).then(function(result) {
                    if (result === false) {
                        res.status(404).json({
                            message: 'password not found'
                        })
                    } else {
                        console.log(data)
                        const token = jwt.sign({
                            data}, 
                            process.env.PRIVATE_KEY)
                        res.status(200).json({
                            message: 'OK success',
                            token
                        })
                    }
                })

                // bcrypt.compare(req.body.password, data.password, function(err, result) {
                //     console.log(result)
                //     console.log(req.body.password, ' ', data.password)
                    // if (err) {
                    //     console.log(err)
                    //     res.status(500).json({
                    //         message: 'internal server error'
                    //     })
                    // } else if (result === false) {
                    //     res.status(404).json({
                    //         message: 'password not found'
                    //     })
                    // } else {
                    //     const token = jwt.sign({
                    //         data}, 
                    //         process.env.PRIVATE_KEY)
                    //     res.status(200).json({
                    //         message: 'OK success',
                    //         token
                    //     })
                    // }
                // })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}


module.exports = {
    findAll,
    register,
    deleteUserById,
    updateUserById,
    login
}