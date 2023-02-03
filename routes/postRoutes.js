const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const { verifyToken } = require('./verifyToken');

//FETCH ALL POSTS
router.get('/', verifyToken, async (req, res) => {
  const posts = await Post.find();
  res.status(200).json(posts);
});

//FETCH POST BY ID
router.get('/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOne({ _id: id });
  res.status(200).json(post);
});

//CREATE NEW POST
router.post('/', verifyToken, async (req, res) => {
  const newPost = new Post({
    userId: req.user.id,
    username: req.user.username,
    description: req.body.description,
    pictureUrl: req.body.pictureUrl,
  });

  const savedPost = await newPost.save();
  res.status(200).json(savedPost);
});

//DELETE POST BY ID
router.delete('/:id', verifyToken, async (req, res) => {
  const id = req.params.id;
  const post = await Post.findOneAndDelete({ _id: id });
  res.status(200).json(post);
});

//ADD LIKE TO POST BY ID
router.put('/add/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      $set: {
        [`likes.${userId}`]: true,
      },
    }
  );
  res.status(200).json(post);
});

//REMOVE LIKE TO POST BY ID
router.put('/remove/:id', verifyToken, async (req, res) => {
  const postId = req.params.id;
  const userId = req.user.id;
  const post = await Post.findByIdAndUpdate(
    { _id: postId },
    {
      $unset: {
        [`likes.${userId}`]: '',
      },
    }
  );
  res.status(200).json(post);
});

module.exports = router;
