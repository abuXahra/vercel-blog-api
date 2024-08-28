const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const verifyToken = require("../verifyToken");
const Comment = require("../models/Comment");
const Category = require("../models/Category");

// ================POST ROUTES============

// CREATE
// router.post('/create', verifyToken, async (req, res) => {
//     try {
//         const newPost = new Post(req.body)
//         const savedPost = await newPost.save()
//         res.status(200).json(savedPost);
//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

// CREATE
router.post("/create", async (req, res) => {
  try {
    const { title, desc, photo, username, userId, categories } = req.body;

    // Create the post with the provided category
    const newPost = new Post({
      title,
      desc,
      photo,
      username,
      userId,
      categories,
    });

    await newPost.save();
    res.status(200).json(newPost);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//UPDATE
// router.put('/:id', verifyToken, async (req, res) => {
//     try {

//         const updatedPost = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
//         res.status(200).json(updatedPost);

//     } catch (err) {
//         res.status(500).json(err)
//     }
// })

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, desc, photo, username, userId, categories } = req.body;

    const existingPost = await Post.findById(postId);

    if (!existingPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    // Check for existing categories in the post, avoid duplicates
    const uniqueCategories = categories.filter(
      (category) => !existingPost.categories.includes(category)
    );

    // Update the post with the unique categories
    existingPost.title = title;
    existingPost.desc = desc;
    existingPost.photo = photo;
    existingPost.username = username;
    existingPost.userId = userId;
    existingPost.categories.push(...uniqueCategories);
    await existingPost.save();

    res.status(200).json(existingPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

//DELETE
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json("Post has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

// 2:33:20

// GET & SEARCH POSTS WITH THEIR COMMENTS
router.get("/", async (req, res) => {
  const query = req.query;
  try {
    //search method
    const searchFilter = {
      title: { $regex: query.search, $options: "i" }, // $options: "i" it will search irrespective of the sentences case
    };
    const posts = await Post.find(query.search ? searchFilter : null)
      .populate("comments")
      .sort({ createdAt: -1 }); //lmit(8) to display only 8 posts
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// // Get all posts with their comments
// router.get('/', async (req, res) => {
//     try {
//         const posts = await Post.find().populate('comments'); // Populate comments for each post
//         res.json(posts);
//     } catch (err) {
//         res.status(500).json({ message: err.message });
//     }
// });

//GET POST DETAIL
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("categories");
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER POSTS without pagination
// router.get("/user/:userId", async (req, res) => {
//     try {
//         const posts = await Post.find({ userId: req.params.userId })
//             .populate('categories')
//             .populate('comments').sort({ createdAt: -1 })
//         res.status(200).json(posts)
//     } catch (err) {
//         res.status(500).json(err);
//     }
// })

//GET USER POSTS with pagination
router.get("/user/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;

    let query = Post.find({ userId: userId })
      .populate("categories")
      .populate("comments")
      .sort({ createdAt: -1 });

    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 4;
    const skip = (page - 1) * pageSize;
    const total = await Post.countDocuments();

    const pages = Math.ceil(total / pageSize);

    query = query.skip(skip).limit(pageSize);

    if (page > pages) {
      return res.status(404).json({
        status: "fail",
        message: "No page found",
      });
    }

    const result = await query;

    res.status(200).json({
      status: "success",
      count: result.length,
      page,
      pages,
      data: result,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "error",
      message: "Server Error",
    });
  }
});

// GET POST AND ITS CATEGORIES & COMMENTS
router.get("/post/cat", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("categories", "title")
      .populate("comments")
      .sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// OR: this will display category and their data
// router.get('/post/cat', async (req, res) => {
//     try {
//         const postsWithCategories = await Post.find()
//             .populate('categories')
//             .populate('comments');
//         res.json({ postsWithCategories });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Create a new post comment
// Add a comment to a specific post
router.post("/:postId/comment", async (req, res) => {
  try {
    const { postId } = req.params;
    const { comment, email, author, website, userId } = req.body;

    const newComment = await Comment.create({
      comment,
      email,
      author,
      website,
      postId,
      userId,
    });

    // Push the new comment to the associated post
    await Post.findByIdAndUpdate(postId, {
      $push: { comments: newComment._id },
    });

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get comments for a specific post
router.get("/:postId/comments", async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.postId });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a comment
router.delete("/:postId/comment/:commentId", async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.commentId
    );
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// display both next and provious title on the post detail page and as well click the title to got the next post page
// API endpoint to fetch the next and previous post titles
router.get("/:postId/navigation", async (req, res) => {
  try {
    const currentPostId = req.params.postId;
    const [nextPost, prevPost] = await Promise.all([
      Post.findOne({ _id: { $gt: currentPostId } })
        .sort({ _id: 1 })
        .select("title"),
      Post.findOne({ _id: { $lt: currentPostId } })
        .sort({ _id: -1 })
        .select("title"),
    ]);
    res.json({
      nextPost: nextPost ? nextPost.title : null,
      prevPost: prevPost ? prevPost.title : null,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
