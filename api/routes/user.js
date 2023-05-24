const User = require("../models/User");
const { verifyTokenAndAdmin, verifyTokenAndAuth } = require("./verifyToken");
const router = require("express").Router();

//EDIT

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PASSWORD

router.put("/password/:id", verifyTokenAndAuth, async (req, res) => {});

//DELETE
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(201).json("User deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A USER

router.get("/find/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { hash, salt, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS WITH A NAME

router.get("/findbyname/:name", async (req, res) => {
  try {
    const users = await User.find({
      fullname: new RegExp(req.params.name, "i"),
    });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USERS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
