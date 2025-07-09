const express = require("express");
const postRouter = express.Router();

const {
  getPost,
  updatePost,
  deletePost,
  createPost,
  getPosts,
  getUserPosts,
} = require("../Controller/postController");
const verifyToken = require("../Middleware/authMiddleware");

//getpost
postRouter.get("/getpost/:id", getPost);
//getallosts
postRouter.get("/getposts", getPosts);
//createpost
postRouter.post("/createpost", verifyToken, createPost);
//update post
postRouter.put("/updatepost/:id", verifyToken, updatePost);
//deletepost
postRouter.delete("/deletepost/:id", verifyToken, deletePost);
//GET ALL POSTS OF A USER
postRouter.get("/getuserposts/:userId", verifyToken, getUserPosts);

module.exports = postRouter;
