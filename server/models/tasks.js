const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true
    },

    DueDate: {
        type: Date,
        required: true
    },

    attachment: {
        type: String
    },
    status: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    }, 

    userId: {
        type: String,
        required: true
    }

})

exports.Task = mongoose.model('Task', taskSchema)