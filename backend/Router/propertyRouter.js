import express from "express";
import {
  getProperty,
  getPropertys,
} from "../Controller/propertypost.Controller.js";
import verifyToken from "../Middleware/authmiddleware.js";
const propertyrouter = express.Router();

propertyrouter.get("/getproperty/:id", getProperty);
propertyrouter.get("/getproperties", getPropertys);

export default propertyrouter;
