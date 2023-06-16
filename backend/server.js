require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const connectDB = require("./config/db.js");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// connect to database
connectDB();

const authRouter = require("./routes/authRoute.js");
app.use("/api/auth", authRouter);

const userRouter = require("./routes/userRoute.js");
app.use("/api/user", userRouter);

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000.");
});
