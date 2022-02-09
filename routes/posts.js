const router = require("express").Router();
const JWT = require("jsonwebtoken");

const User = require("../models/User");
const Post = require("../models/Post");

router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const { token, body } = req.body;

    const isVerified = JWT.verify(token, process.env.ACCESS_TOKEN_SECRET);

    if (isVerified) {
      const newPost = new Post(req.body);

      const savedPost = await newPost.save();

      res.status(200).json(savedPost);
    } else {
      res.status(400).json("Invalid JWT token");
    }
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
