const { updateOne } = require('../models/user')
const user = require('../models/user')

function findAll(req, res) {
    user
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

function createUser(req, res) {
    user
        .create({
            fullName: req.body.fullName, 
            email: req.body.email, 
            password: req.body.password
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


function deleteUserById(req, res) {
    user
        .deleteOne({
            id: req.params.id
        })


        // .deleteOne({
        //     id: req.params.id
        // })
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

function updateUserById(req, res) {
    user
        .updateOne({ 
            _id: req.params.id
            }, 
            {
            fullName: req.body.fullName, 
            email: req.body.email,
            password: req.body.password
        })

        // .where({
        //     _id: req.params.id
        // })
        // .update({
        //     fullName: req.body.fullName,
        // })
        // .updateOne({ id: req.params.id}, { fullName: req.body.fullName})


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



        // .updateMany({
        //     id: `${req.params.id}`},
        //     {fullName: req.body.fullName
        //  })


        // .updateMany({ id: `${req.params.id}`}, {fullName: req.body.fullName})
}


module.exports = {
    findAll,
    createUser,
    deleteUserById,
    updateUserById
}