const express = require("express");
const userRouter = express.Router();
const verifyToken = require("../Middleware/authMiddleware.js");
const {
  getUser,
  updateUser,
  deleteUser,
} = require("../Controller/userController");

//getuser
userRouter.get("/getuser/:id", getUser);
//update user
userRouter.put("/updateuser/:id", verifyToken, updateUser);
//deleteuser
userRouter.delete("/deleteuser/:id", verifyToken, deleteUser);
module.exports = userRouter;
