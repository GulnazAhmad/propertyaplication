const express = require("express");
//const User = require("../models/Usermodel");
//const Comment = require("../models/Commentmodel");
const Comment = require("../models/Commentmodel");
//const bcrypt = require("bcrypt");
//for profile thses are used
//getuser
//way1 async function getUser(req,res){
//way2
//create a comment
const createComment = async (req, res) => {
  try {
    //const { title, description, categories, photo } = req.body;
    const newComment = await Comment.create(req.body);
    res.status(200).json(newComment);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//get all this post comments
const getComments = async (req, res) => {
  // your code here
  try {
    const comments = await Comment.find({ postId: req.params.postId });

    res.status(200).json(comments);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//update user
const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//deleteuser when we deleta user its comment&comments should also be deleted
const deleteComment = async (req, res) => {
  // your code here
  try {
    await Comment.deleteMany({ _id: req.params.id });
    //await Comment.deleteMany(req.params.id );
    res.status(200).json("Comment has been deleted");
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports = { updateComment, deleteComment, createComment, getComments };
