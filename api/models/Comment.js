const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true,
    },
    website: {
        type: String,
        require: false
    },
    postId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: false
    },
}, { timestamps: true });

module.exports = mongoose.model('Comment', CommentSchema)