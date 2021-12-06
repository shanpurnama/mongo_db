const mongoose = require('mongoose')

const { Schema } = mongoose

const projectSchema = new Schema({
    name: {
        type: String,
        minlength: [3, 'name must contain at least more then 3 alpahabets'],
        required: [true, 'please input your name']
    },

    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, 'please input your owner']
    },

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        default: null
    }],
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project