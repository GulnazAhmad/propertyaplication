import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
const verifyToken = (req, res, next) => {
  const token = req.cookies.jwttoken;
  if (!token) {
    return res.status(401).json("you are not aunthenticated");
  }
  jwt.verify(token, process.env.SECRET, async (error, data) => {
    if (error) {
      return res.status(403).json("token is not valid!");
    }
    req.userId = data._id;
    next();
  });
};
export default verifyToken;
