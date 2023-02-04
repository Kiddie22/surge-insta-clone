const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();
require('express-async-errors');

const app = express();

// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "default-src * 'unsafe-inline' 'unsafe-eval';"
//   );
//   next();
// });

//MIDDLEWARE
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/client/build')));
}

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) throw err;
  console.log('Connected to DB');
});

const port = process.env.PORT || 5000;
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
