const express = require("express");
const router = express.Router();

// Homepage Route
router.get("/", (req, res) => {
  res.render("index", {
    title: "Latest Posts",
    posts: [
      {
        title: "Post One",
        excerpt: "This is the excerpt for post one...",
        published_at: new Date("2024-01-01"),
      },
      {
        title: "Post Two",
        excerpt: "This is the excerpt for post two...",
        published_at: new Date("2024-02-01"),
      },
    ],
  });
});

module.exports = router;
