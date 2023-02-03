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
    firstname: {
      type: String,
      required: [true, 'firstname is required'],
    },
    lastname: {
      type: String,
      required: [true, 'lastname is required'],
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
    profilePictureUrl: {
      type: String,
      default:
        'https://res.cloudinary.com/dhdbpguyk/image/upload/v1675357372/User-Icon-Grey-300x300_onj3j2.png',
    },
  },
  { timestamps: true }
);

const UserModel = mongoose.model('User', userSchema);
module.exports = UserModel;
