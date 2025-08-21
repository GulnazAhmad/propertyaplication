import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
export const connectDb = async () => {
  try {
    console.log("MONGO_URL:", process.env.MONGO_URL);

    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
  } catch (e) {
    console.log(e.message);
  }
};
