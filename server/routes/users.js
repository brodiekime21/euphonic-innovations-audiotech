const express = require("express");
const router = express.Router();

const User = require("../models/User");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/profile/:id", async (req, res, next) => {
  try {
    const foundUser = await User.findById(req.params.id).populate("products");
    res.json(foundUser);
  } catch (err) {
    console.log(err);
  }
});

router.post("/edit-profile/:id", isAuthenticated, async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
      },
      { new: true }
    );
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const users = await User.find().select("name");
    res.json(users);
  } catch (err) {
    console.log(err);
  }
});

router.get("/users-products", isAuthenticated, async (req, res) => {
  try {
    const products = await Sample.find();
    res.json(products);
  } catch (err) {
    res.json({ message: err.message });
  }
});

router.get("/delete/:id", isAuthenticated, async (req, res) => {
  console.log(req.user._id);
  try {
    const user = await User.findById(req.params.id);
    if (String(req.user._id) === String(user._id)) {
      await User.deleteOne(user);

      await User.findByIdAndUpdate(
        req.user._id,
        { $pull: { users: user._id } },
        { new: true, runValidators: true }
      )
        .then((updatedUser) => {
          return updatedUser.populate("products");
        })
        .then((populated) => {
          res.json(populated);
        });
      return res.status(200).json({ msg: "deleted successfully! :)" });
    } else {
      return res.status(401).json({ msg: "unauthorized" });
    }
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
});

module.exports = router;
