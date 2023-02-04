const jwt = require('jsonwebtoken');
const axios = require('axios');

const getRecaptchaRes = (req, res, next) => {
  const secret = process.env.RECAPTCHA_SECRET;
  const response = req.body.response;
  axios
    .post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret}&response=${response}`
    )
    .then((res) => {
      console.log(res.data);
      next();
    })
    .catch((err) => {
      console.log(err);
      return res.status(401).json({ msg: 'Captcha failed' });
    });
};

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ msg: 'Auth token not found' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ msg: 'Not authenticated' });
  }
};

const verifyTokenAndAuthorize = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).json('You are not allowed to do that');
    }
  });
};

module.exports = { getRecaptchaRes, verifyToken, verifyTokenAndAuthorize };
