const mongoose = require("mongoose")

const taskAttachmentSchema = new mongoose.Schema({
    userId:{
        type: String,
        required: true
    },
    taskId: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    data: {
        type: Buffer,
        required: true
    },
},{
    timestamps: true
})

exports.Attachment = mongoose.model('Attachment', taskAttachmentSchema)