import express from "express";
import {
  getproperties,
  getPropertyById,
  createProperty,
} from "../Controller/propertypost.Controller.js";

const propertyrouter = express.Router();
propertyrouter.get("/getproperties", getproperties);
propertyrouter.get("/getproperty/:id", getPropertyById);
propertyrouter.post("/api/properties", createProperty);
export default propertyrouter;
