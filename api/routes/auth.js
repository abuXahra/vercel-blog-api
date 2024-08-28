const express = require("express")
const router = express.Router()
const authController = require('../controller/authController')


//REGISTER
router.post('/register', authController.userRegister)

//LOGIN
router.post('/login', authController.userLogin)

//LOGOUT
router.get('/logout', authController.userLogout)

//REFECTCH USER
router.get('/refetch', authController.userRefetch)

module.exports = router;