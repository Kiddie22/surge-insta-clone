const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: [true, 'username is required'],
    },
    username: {
      type: String,
      required: [true, 'username is required'],
    },
    description: String,
    pictureUrl: String,
    userPictureUrl: String,
    likes: {
      type: Map,
      of: Boolean,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postSchema);
module.exports = PostModel;
