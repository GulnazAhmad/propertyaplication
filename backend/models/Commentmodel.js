const { timeStamp } = require("console");
const mongoose = require("mongoose");
const { type } = require("os");
const commentSchema = mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
  },
  { timeStamp: true }
);

const Comment = mongoose.model("Comment", commentSchema);
module.exports = Comment;
