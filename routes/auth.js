const express = require('express');
const Router = express.Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { getRecaptchaRes } = require('./verifyToken');

//REGISTER
Router.post('/register', getRecaptchaRes, async (req, res) => {
  const captchaSucess = req.captchaSucess;

  if (
    (!req.body.username,
    !req.body.email,
    !req.body.password,
    !req.body.firstname,
    !req.body.lastname)
  ) {
    res.status(401).json({ msg: 'Complete the form' });
  }

  try {
    const user = await User.findOne({ username: req.body.username });
    if (user) {
      res.status(401).json({ msg: 'User with that name already exists' });
    }
  } catch (e) {
    console.log(e);
  }

  const newUser = new User({
    username: req.body.username,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SECRET
    ).toString(),
  });

  const savedUser = await newUser.save();

  const token = jwt.sign(
    {
      id: savedUser._id,
      username: savedUser.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  const { password, ...others } = savedUser._doc;
  res.status(200).json({ ...others, token, captchaSucess });
});

//LOGIN
Router.post('/login', getRecaptchaRes, async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  const captchaSucess = req.captchaSucess;

  if (!user) {
    res.status(401).json({ msg: 'User does not exist' });
  }

  const hashedPassword = CryptoJS.AES.decrypt(
    user.password,
    process.env.PASS_SECRET
  );
  const decryptedPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

  if (decryptedPassword !== req.body.password) {
    res.status(401).json({ msg: 'Wrong password' });
  }

  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
    },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  );

  const { password, ...others } = user._doc;
  res.status(200).json({ ...others, token, captchaSucess });
});

// ADD PROFILE PICTURE
Router.post('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const image = req.body.image;

    if (!image) {
      return res.status(400).json({ msg: 'Please enter an image url' });
    }

    const user = await User.findByIdAndUpdate(id, { profilePictureUrl: image });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = Router;
