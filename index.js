const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();
require('express-async-errors');

const app = express();

//MIDDLEWARE
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

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
const userRoutes = require('./routes/userRouter');
const auth = require('./routes/auth');
app.use('/api/users', userRoutes);
app.use('/api/auth', auth);
