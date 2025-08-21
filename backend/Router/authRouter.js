import express from "express";
import { register } from "../Controller/authController.js";
import { login } from "../Controller/authController.js";
import { logout } from "../Controller/authController.js";
import { refetch } from "../Controller/authController.js";
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/refetch", refetch);

export default router;
