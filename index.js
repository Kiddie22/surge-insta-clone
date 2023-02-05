const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();
require('express-async-errors');
const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(express.json());
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
}

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) throw err;
  console.log('Connected to DB');
});

app.listen(port, () => {
  console.log('Server is running on port', port);
});

//ROUTES
const auth = require('./routes/auth');
const userRoutes = require('./routes/userRouter');
const postRoutes = require('./routes/postRoutes');
app.use('/api/auth', auth);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
app.use('/', express.static(path.join(__dirname, '/client/build')));
app.use('/login', express.static(path.join(__dirname, '/client/build')));
app.use('/register', express.static(path.join(__dirname, '/client/build')));
app.use('*', (req, res) => res.redirect('/'));
