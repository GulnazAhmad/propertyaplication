const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();
const router = require("./Routes/authRouter");
const userRouter = require("./Routes/usersRouter");
const postRouter = require("./Routes/postsRouter");
const commentRouter = require("./Routes/commentsRouter");
const cookieParser = require("cookie-parser");
const verifyToken = require("./Middleware/authMiddleware.js");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
//connecting to db you can add this in db.js
dotenv.config();
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db connected");
  } catch (e) {
    console.log(e.message);
  }
};
//middlewares
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));
app.use(router);
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);

//image uplaod
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    //fn callback function
    fn(null, "images/");
  },
  filename: (req, file, fn) => {
    //fn(null, req.body.img);
    fn(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  return res.status(200).json({
    message: "Image has been uploaded successfully,",
    filename: req.file.filename,
  });
});

//important for your making your application go live

app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});
//app.use(verifyToken);

app.listen(process.env.PORT || 8000, "0.0.0.0", () => {
  connectDb();
  console.log("listening on port 8000");
});
