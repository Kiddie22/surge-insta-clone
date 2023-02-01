const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', require('./routes/userRouter'));

mongoose.connect(
  process.env.MONGO_URI,
  {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log('Connected to DB');
  }
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log('Server is running on port', port);
});
