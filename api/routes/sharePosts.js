const express = require("express");
const router = express.Router();

// API endpoint for sharing on Facebook
router.get("/facebook/:postId", (req, res) => {
  const postId = req.params.postId;
  // Implement logic to generate Facebook share URL for the given post
  const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `http://localhost:5000/posts/${postId}`
  )}`;
  res.json({ shareUrl });
});

// API endpoint for sharing on Twitter
router.get("/twitter/:postId", (req, res) => {
  const postId = req.params.postId;
  // Implement logic to generate Twitter share URL for the given post
  const shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    `http://localhost:5000/posts/${postId}`
  )}`;
  res.json({ shareUrl });
});

// API endpoint for sharing on Instagram
router.get("/instagram/:postId", (req, res) => {
  const postId = req.params.postId;
  // You can't directly share on Instagram, so just return the post URL
  res.json({ postUrl: `http://localhost:5000/posts/${postId}` });
});

module.exports = router;
