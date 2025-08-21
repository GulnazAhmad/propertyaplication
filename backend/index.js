import express from "express";
import cors from "cors";
import mongoose from "mongoose";
//C:\Users\agulu\OneDrive\Desktop\PropertyIt\backend\Router\authRouter.js
import router from "./Router/authRouter.js";
import propertyrouter from "./Router/propertyRouter.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import verifyToken from "./Middleware/authmiddleware.js";
import multer from "multer";
import path from "path";
import { connectDb } from "./db.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use("/api", router);
app.use("/api", propertyrouter);

app.listen(5000, () => {
  connectDb();
  console.log("backend is running on port 5000");
});
