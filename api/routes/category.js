const express = require("express")
const router = express.Router()
const verifyToken = require("../verifyToken")
const categoryController = require('../controller/categoryController')


// ================CATEGORTY ROUTES============




// CREATE
router.post('/create', categoryController.createCategory)



//UPDATE
router.put('/:id', verifyToken, categoryController.updateCategory)


//DELETE
router.delete('/:id', verifyToken, categoryController.deleteCategory)


// GET All category
router.get('/', categoryController.getCategories)

//GET CATEGORY DETAIL
router.get('/:id', categoryController.getCategory)


//GET CATEGORY POST
// Endpoint to get posts by a specific category ID

// without pagination
router.get('/:categoryId/posts', categoryController.getCatPostWithoutPagination);


// with pagination
router.get('/:categoryId/post', categoryController.getCatPostWithPagination);




module.exports = router;