const express = require("express");
const User = require("../models/Usermodel");
const Post = require("../models/Postmodel");
const Comment = require("../models/Commentmodel");
const bcrypt = require("bcrypt");
//for profile thses are used
//getuser
//way1 async function getUser(req,res){
//way2
//create a post
const createPost = async (req, res) => {
  try {
    console.log("incoming post", req.body);

    //const { title, description, categories, photo } = req.body;
    const newPost = await Post.create(req.body);
    res.status(200).json(newPost);
  } catch (e) {
    console.error("❌ Error in /createpost:", e); // this will show the Mongoose validation error

    res.status(500).json(e.message);
  }
};

//get a post
const getPost = async (req, res) => {
  // your code here
  try {
    const post = await Post.findById(req.params.id);

    res.status(200).json(post);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
//get all posts
const getPosts = async (req, res) => {
  // your code here
  try {
    const title = req.query.title;
    console.log("🧠 Search title query:", title); // 🔍 debug log

    let posts;
    if (title) {
      posts = await Post.find({ title: { $regex: title, $options: "i" } });
    } else {
      posts = await Post.find();
    }
    console.log("📦 Posts found:", posts.length); // 🧾 debug log
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//update user
const updatePost = async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedPost);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//deleteuser when we deleta user its post&comments should also be deleted
const deletePost = async (req, res) => {
  // your code here
  try {
    await Post.deleteMany({ _id: req.params.id });
    await Comment.deleteMany({ postId: req.params.id });
    res.status(200).json("Post has been deleted");
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//get all posts of a aspecific user
// get posts by userId
const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ userId });
    res.status(200).json(posts);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports = {
  getPost,
  updatePost,
  deletePost,
  createPost,
  getPosts,
  getUserPosts,
};
