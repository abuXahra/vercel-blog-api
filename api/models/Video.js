const mongoose = require('mongoose')

const VideoSchema = mongoose.Schema({

    title: {
        type: String,
        require: true,
        unique: true
    },
    photo: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    videoUrl: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.model('Video', VideoSchema)