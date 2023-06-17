const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const saltRounds = 10;
const isAuthenticated = require('../middleware/isAuthenticated');

router.post("/signup", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password || !req.body.name) {
      return res.status(400).json({ message: "Please fill out all fields" });
    }
    const foundUser = await User.findOne({ email: req.body.email });
    if (foundUser) {
      return res.status(400).json({ message: "You've already registered. Please sign in." });
    } else {
      const salt = await bcrypt.genSalt(saltRounds);
      const hashedPass = await bcrypt.hash(req.body.password, salt);

      const createdUser = await User.create({
        password: hashedPass,
        email: req.body.email,
        name: req.body.name
      });
      const payload = { _id: createdUser._id, email: createdUser.email, name: createdUser.name };
      const token = jwt.sign(payload, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "168hr",
      });
      res.json({ token: token, _id: createdUser._id, message: `Welcome ${createdUser.name}` });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({ message: "Please fill out both fields" });
    }
    const foundUser = await User.findOne({ email: req.body.email });
    if (!foundUser) {
      return res.status(401).json({ message: "Email or Password is incorrect!!!" });
    }
    const doesMatch = await bcrypt.compare(req.body.password, foundUser.password);
    if (doesMatch) {
      const payload = {
        _id: foundUser._id,
        email: foundUser.email,
        name: foundUser.name,
        products: foundUser.products,

      };
      const token = jwt.sign(payload, process.env.SECRET, {
        algorithm: "HS256",
        expiresIn: "168hr",
      });
      res.json({ token: token, _id: foundUser._id, message: `Welcome ${foundUser.name}` });
    } else {
      return res.status(402).json({ message: "Email or password is incorrect. Please try again." });
    }
  } catch (err) {
    res.json(err.message);
  }
});

router.get("/verify", isAuthenticated, (req, res) => {
  User.findOne({_id: req.user._id})
  .populate('products')
  .then((foundUser) => {
    const payload = { ...foundUser };
    delete payload._doc.password;
    res.status(200).json(payload._doc);
  })
  .catch((err) => {
    console.log(err)
  })});

module.exports = router;

