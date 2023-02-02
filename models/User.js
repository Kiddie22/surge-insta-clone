const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: [true, 'username already exists'],
      min: 3,
      max: 50,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: [true, 'email already exists'],
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      min: 5,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
