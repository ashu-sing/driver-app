const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const {
  generateAccessToken,
  generateRefreshToken,
} = require("../helpers/generateToken");

const users = [
  {
    _id: 1,
    name: "John Doe",
    username: "johndoe",
    password: "123456",
    role: "admin",
  },
  {
    _id: 2,
    name: "Jane Doe",
    username: "janedoe",
    password: "123456",
    role: "user",
  },
];

let refreshTokens = [];

const loginController = asyncHandler(async (req, res, next) => {
  const { username, password } = req.body;
  const user = users.find(
    (u) => u.username === username && u.password === password
  );

  if (!user) {
    res.status(401);
    throw new Error("Invalid username or password");
  }

  const accessToken = await generateAccessToken(user);
  const refreshToken = await generateRefreshToken(user);
  await refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
    name: user.name,
    role: user.role,
  });
});

const logoutController = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    res.status(401);
    throw new Error("Refresh token not found");
  }

  if (!refreshTokens.includes(refreshToken)) {
    res.status(401);
    throw new Error("Refresh token is invalid");
  }

  refreshTokens = refreshTokens.filter((token) => token !== refreshToken);

  res.status(202);
  res.json({ message: "Logout successful", isError: false });
});

const registerController = asyncHandler(async (req, res, next) => {
  const { name, phone, password } = req.body;

  // const user = users.find((u) => u.username === username);
  const user = User.findOne({ phoneNo: phone });

  if (user) {
    res.status(401);
    throw new Error("Phone Number already exists");
  }

  const newUser = new User({
    name: name,
    phoneNo: phone,
    password: password,
  });

  console.log(newUser);

  const accessToken = await generateAccessToken(newUser);
  const refreshToken = await generateRefreshToken(newUser);

  
  if (refreshToken) {
    refreshTokens.push(refreshToken);
  }

  res.status(201).json({
    accessToken,
    refreshToken,
    name: newUser.name,
    role: newUser.role,
  });
});

const refreshController = asyncHandler(async (req, res, next) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(401);
    throw new Error("Refresh token not found");
  }

  console.log(refreshTokens);

  if (!refreshTokens.includes(refreshToken)) {
    res.status(401);
    throw new Error("Unauthorized token");
  }

  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_JWT_SECRET,
    async (err, user) => {
      if (err) {
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        res.status(403);
        throw new Error("Invalid refresh token");
      }

      const accessToken = await generateAccessToken(user);
      refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
      const newRefreshToken = await generateRefreshToken(user);
      refreshTokens.push(newRefreshToken);

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    }
  );
});

module.exports = {
  loginController,
  logoutController,
  registerController,
  refreshController,
  refreshTokens,
};
