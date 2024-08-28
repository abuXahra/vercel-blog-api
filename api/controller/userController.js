
const User = require('../models/User')
const bcrypt = require('bcrypt')
const Post = require("../models/Post")
const Comment = require("../models/Comment")
const verifyToken = require("../verifyToken")




//UPDATE
exports.userUpdate = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const updatedUser = await User.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
        res.status(200).json(updatedUser);

    } catch (err) {
        res.status(500).json(err)
    }
}


//GET SINGLE USER
exports.userFetch = async (req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId); // Retrieve user from MongoDB by ID
        res.json(user); // Send user data as JSON response
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


// GET ALL USER
exports.allUsersFetch = async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json(err);
    }
}

//DELETE
exports.userDelete = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        await Post.deleteMany({ userId: req.params.id })
        await Comment.deleteMany({ userId: req.params.id })
        res.status(200).json('User has been deleted')
    } catch (err) {
        res.status(500).json(err)
    }
}


//LOGOUT
exports.userLogout = async (req, res) => {
    try {
        res.clearCookie("token", { sameSite: "none", secure: true }).status(200).send("User Logged out Successfuly")
    } catch (err) {
        res.status(500).json("user does not exist");
    }
}


// exports.userForgotPassword = async(req, res)=>{
//     try {
//         const {email} = req.body
//         const user = await User.findOne(email);

//         if(!user){
//             return res.status(404).json
//         }

// } catch (error) {
        
//     }

// }