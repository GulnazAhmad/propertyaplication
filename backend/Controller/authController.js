import { User } from "../Model/usermodel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashpw = await bcrypt.hashSync(password, salt);
    const savedUser = await User.create({ username, email, password: hashpw });
    res.status(201).json(savedUser);
  } catch (e) {
    res.status(500).json(e.message);
  }
};
dotenv.config();
//LOGIN

export const login = async (req, res) => {
  try {
    console.log("Login route hit ✅");
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json("user not found");
    }
    const match = await bcrypt.compareSync(password, user.password);
    if (!match) {
      return res.status(401).json("wrong password");
    }
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
};

//LOG OUT
export const logout = async (req, res) => {
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
};

//when we refresh page after logging in we get logged out automatically so to avoid that
export const refetch = async (req, res) => {
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
};
