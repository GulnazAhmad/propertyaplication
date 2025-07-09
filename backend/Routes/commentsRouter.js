const express = require("express");
const CommentRouter = express.Router();
const verifyToken = require("../Middleware/authMiddleware");
const {
  updateComment,
  deleteComment,
  createComment,
  getComments,
} = require("../Controller/commentController");

//getall comments from a post
CommentRouter.get("/getcomments/:postId", getComments);
//createComment
CommentRouter.post("/createcomment", verifyToken, createComment);
//update Comment
CommentRouter.put("/updatecomment/:id", verifyToken, updateComment);
//deleteComment
CommentRouter.delete("/deletecomment/:id", verifyToken, deleteComment);

module.exports = CommentRouter;
