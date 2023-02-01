const express = require('express');
const router = express.Router();
const User = require('../models/User');

//FETCH ALL USERS
router.get('/', async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

//FETCH USER BY ID
router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOne({ _id: id });
  res.status(200).json(user);
});

//CREATE USER
router.post('/', async (req, res) => {
  const user = await User.create(req.body);
  res.status(200).json({ user, msg: 'User added' });
});

//DELETE USER BY ID
router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await User.findOneAndDelete({ _id: id });
  res.status(200).json(user);
});

module.exports = router;
