const express = require("express")
const router = express.Router()
const User = require("../models/User")
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")


//================COMMENT ROUTES============ //
router.post('/create', verifyToken, async (req, res) => {
    try {
        const newComment = new Comment(req.body)
        const savedComment = await newComment.save()
        res.status(200).json(savedComment);
    } catch (err) {
        res.status(500).json(err)
    }
})




// // ================COMMENT ROUTES============ //
// router.post(':postId/comment', verifyToken, async (req, res) => {
//     try {
//         const postId = req.params.postId;
//         const post = await Post.findById(postId)
//         if (!post) {
//             return res.status(404).json({ message: 'Post not found' })
//         }
//         const newComment = new Comment(req.body)
//         post.comment.push(newComment)
//         post.save()
//         res.status(200).json(post);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })



//UPDATE
router.put('/:id', verifyToken, async (req, res) => {
    try {

        const updatedComment = await Comment.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedComment);

    } catch (err) {
        res.status(500).json(err)
    }
})


//DELETE
router.delete('/:id', async (req, res) => {
    try {
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json('Post has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
})



//GET ALL POSTS
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find()
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
})


// //GET POST DETAIL
// router.get('/:id', async (req, res) => {
//     try {
//         const comment = await Comment.findById(req.params.id)
//         res.status(200).json(comment)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

//GET POSTS COMMENTS
router.get('/post/post:Id', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId })
        res.status(200).json(comments)
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;
















