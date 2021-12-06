const Project = require('../models/project')

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
                    console.log(dataOne)
                    res.status(200).json({
                        message: 'successfully'
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




module.exports = {
    create
}
