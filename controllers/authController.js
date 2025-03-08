const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const tokenkey = process.env.TOKEN_KEY;
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, tokenkey, { expiresIn: "1d" });
};

const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      user,
      token: generateToken(user._id),
      message: "connected with success",
    });
  } else {
    res.status(400).json({
      message: "Invalid credentials ",
    });
  }
});
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  res.status(200).json({
    user,
    token: generateToken(user._id),
  });
});

module.exports = { register, login };
