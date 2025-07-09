const express = require("express");
const User = require("../models/Usermodel");
const Post = require("../models/Postmodel");
const Comment = require("../models/Commentmodel");
const bcrypt = require("bcrypt");
//for profile thses are used
//getuser
//way1 async function getUser(req,res){
//way2
const getUser = async (req, res) => {
  // your code here
  try {
    const user = await User.findById(req.params.id);
    const { password: _, ...info } = user._doc;
    res.status(200).json({ ...info, _id: user._id });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//update user
const updateUser = async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hashSync(req.body.password, salt);
    }
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

//deleteuser when we deleta user its post&comments should also be deleted
const deleteUser = async (req, res) => {
  // your code here
  try {
    await User.findByIdAndDelete(req.params.id);
    await Post.deleteMany({ userId: req.params.id });
    await Comment.deleteMany({ userId: req.params.id });
    res.status(200).json("User has been deleted");
  } catch (e) {
    res.status(500).json(e.message);
  }
};

module.exports = { getUser, updateUser, deleteUser };
