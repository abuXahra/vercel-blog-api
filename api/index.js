const express = require("express");
const app = express();
const mongoose = require("mongoose");

const dotenv = require("dotenv");

const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const commentRoute = require("./routes/comment");
const postsRoute = require("./routes/posts");
const categoryRoute = require("./routes/category");
const VideoRouter = require("./routes/video");
const shareRoute = require("./routes/sharePosts");

const port = process.env.PORT || 5000;

const corsOptions = {
  origin: ["http://localhost:3000", "https://newsblog-244u.onrender.com"], //https://pblog-lno1.onrender.com
  // methods: ["POST", "GET"],
  credentials: true,
};

// middlewares
dotenv.config();
app.use(express.json());
app.use("/images", express.static(path.join(__dirname, "images"))); //for image upload url
app.use(cors(corsOptions)); //to syncronize front and backenth

// app.use(cors({ origin: ["http://localhost:3000"], credentials: true })) //to syncronize front and backenth
app.use(cookieParser());

// ROUTES
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postsRoute);
app.use("/api/comments", commentRoute);
app.use("/api/categories", categoryRoute);
app.use("/api/videos", VideoRouter);
app.use("/api/share", shareRoute);

// Image upload route
const storage = multer.diskStorage({
  destination: (req, file, fn) => {
    fn(null, "images");
  },
  filename: (req, file, fn) => {
    // fn(null, req.body.img)
    fn(null, file.originalname);
  },
});
const upload = multer({ storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("Image has been uploaded successfully");
});

//database connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("database connected successfuly");
  } catch (err) {
    console.log(err);
  }
};
// app.post("/api/upload", upload.single("file"), (req, res) => {
//     return res.status(200).json("File has been uploaded")
// })

app.listen(port, () => {
  connectDb();
  console.log(`server is running on port ${port}'`);
});
