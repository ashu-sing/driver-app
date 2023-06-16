const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const generateAccessToken = asyncHandler(async (user) => {
  return Promise.resolve(
    jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.ACCESS_TOKEN_JWT_SECRET,
      {
        expiresIn: "10m",
      }
    )
  );
});

const generateRefreshToken = asyncHandler(async (user) => {
  return Promise.resolve(
    jwt.sign(
      {
        _id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.REFRESH_TOKEN_JWT_SECRET,
      {
        expiresIn: "15m",
      }
    )
  );
});

module.exports = { generateAccessToken, generateRefreshToken };
