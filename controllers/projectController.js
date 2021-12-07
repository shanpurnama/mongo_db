const Project = require('../models/project')
const User = require('../models/user')

function create(req, res) {
    Project
        .create({
            name: req.body.name,
            owner: req.body.owner
        })
        .then(data => {
            projectInfo = data
            Project
                .findByIdAndUpdate(projectInfo._id, {
                    $push: {
                        users: projectInfo.owner
                    }
                })
                .then(dataOne => {
                    User
                        .findByIdAndUpdate(dataOne.owner.toString(), {
                            $push: {
                                projects: projectInfo._id
                            }
                        })
                        .then(data => {
                            res.status(201).json({
                                message: 'successfully'
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                message: 'internal server error'
                            })
                        })      
                })
        })
        .catch(err => {
            if (err.errors && err.errors.name) {
                res.status(400).json({
                    message: err.errors.name.properties.message
                })
            }
        })
}

function findAll(req, res) {
    Project
        .find()
        .populate('users')
        .populate('owner')
        .then(resultData => {
            res.status(200).json({
                resultData,
                message: 'successfully'
            })
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                message: 'internal server error'
            })
        })
}




module.exports = {
    create,
    findAll
}
