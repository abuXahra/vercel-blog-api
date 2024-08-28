const express = require("express");
const route = express.Router();
const verifyToken = require("../verifyToken");
const userController = require("../controller/userController");

// ================ROUTES============

//UPDATE
route.put("/:id", verifyToken, userController.userUpdate);

//DELETE
route.delete("/:id", verifyToken, userController.userDelete);

//GET SINGLE USER
route.get("/:userId", userController.userFetch);

// route.get('/:id', async (req, res) => {
//     try {
//         const user = await User.findById(req.params.id)
//         const { password, ...info } = user._doc //to remove the password for the get result
//         res.status(200).json(info)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

//GET ALL USERS
route.get("/", userController.allUsersFetch);

//2: 08: 27

module.exports = route;
