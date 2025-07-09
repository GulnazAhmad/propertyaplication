//the auth middleware used to have functions for verifying the user(authentication and authorization) this is done here only
//for sigin login logout
const express = require("express");
//const mongoose = require("mongoose");
const User = require("../models/Usermodel");
const jwt = require("jsonwebtoken"); //for generating cookies to help remember the site pages that the user is logged in
const bcrypt = require("bcrypt"); //for hashing the password
const router = express.Router();
const axios = require("axios");
const dotenv = require("dotenv");
//REGISTER
//will go to /register and get the value in req from frontend
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    //make the pw hashed use bcrypt
    const salt = await bcrypt.genSalt(10);
    const hashpw = await bcrypt.hashSync(password, salt);

    const savedUser = await User.create({ username, email, password: hashpw });
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json(e.message);
  }
});
dotenv.config();
//LOGIN

router.post("/login", async (req, res) => {
  try {
    console.log("Login route hit ✅");
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    /*for comapring not hashed pw
    if (user.password != password) {
      res.status(404).json("invalid password");
    }*/
    //for comparing hashed
    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).json("wrong password");
    }
    //creating jwt token for making the other pages aqware that the user is logged in
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        password: user.password,
        username: user.username,
      },
      process.env.SECRET,
      {
        expiresIn: "3d",
      }
    );
    //Take the password field out of user._doc, and store everything else in a new object called info.
    const { password: _, ...info } = user._doc;

    res.cookie("jwttoken", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
    });
    res.status(200).json(info);
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

//LOG OUT
router.get("/logout", async (req, res) => {
  console.log("Attempting to clear cookie");

  try {
    res
      .clearCookie("jwttoken", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json("User logged out successfully");
  } catch (e) {
    return res.status(500).json(e.message);
  }
});

//when we refresh page after logging in we get logged out automatically so to avoid that
router.get("/refetch", async (req, res) => {
  console.log("🔁 /refetch hit");

  const token = req.cookies.jwttoken;
  if (!token) return res.status(401).json("No token found");

  jwt.verify(token, process.env.SECRET, {}, async (err, data) => {
    if (err) return res.status(403).json("Token is invalid");

    try {
      const user = await User.findById(data.id);
      if (!user) return res.status(404).json("User not found");

      const { password, ...info } = user._doc;
      res.status(200).json(info);
    } catch (err) {
      res.status(500).json(err.message);
    }
  });
});

module.exports = router;
