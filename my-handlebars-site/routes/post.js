const express = require("express");
const router = express.Router();

// Individual Post Route
router.get("/:id", (req, res) => {
  const post = {
    title: "Sample Post",
    content: "This is the content of the post...",
    published_at: new Date("2024-01-01"),
  };
  res.render("post", post);
});

module.exports = router;
