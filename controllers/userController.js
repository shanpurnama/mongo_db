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
    const hashRegister = bcrypt.hashSync(req.body.password, 3)
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
}

function updateUserById(req, res) {
    const hashUpdate = bcrypt.hashSync(req.body.password, 3)
        User
            .findByIdAndUpdate(req.params.id, {
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
}

function deleteUserById(req, res) {
    User
        .findByIdAndDelete(req.params.id)
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
                   message: 'email/password wrong'
               })
            }else {
                const comparePassword = bcrypt.compareSync(req.body.password, data.password)
                if (comparePassword === false) {
                    res.status(404).json({
                        message: 'email/password wrong'
                    })
                } else {
                    const token = jwt.sign({
                        _id: data.id,
                        email: data.email},
                        process.env.PRIVATE_KEY)
                    res.status(200).json({
                        message: 'OK success',
                        token
                    })
                }
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

// todo
// name
// description
// status