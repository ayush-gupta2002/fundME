const router = require("express").Router();
const Review = require("../models/Review");
const { verifyToken } = require("./verifyToken");

//CREATE
router.post("/:id", async (req, res) => {
  let newReview;
  if (req.body.review) {
    newReview = new Review(req.body.review);
  } else {
    newReview = new Review(req.body);
  }
  if (req.body.user) {
    newReview.userId = req.body.user._doc._id;
  } else {
    newReview.userId = req.user.id;
  }
  newReview.campaignId = req.params.id;

  try {
    const savedReview = await newReview.save();
    res.status(201).json(savedReview);
    console.log("success", savedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A REVIEW
router.get("/:id", verifyToken, async (req, res) => {
  try {
    const foundReview = await Review.findById(req.params.id);
    res.status(200).json(foundReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CAMPAIGN REVIEWS

router.get("/campaign/:id", verifyToken, async (req, res) => {
  try {
    const reviews = await Review.find({ campaignId: req.params.id });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER REVIEWS

router.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.params.id });
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE A REVIEW

router.put("/:id", verifyToken, async (req, res) => {
  try {
    const foundReview = await Review.findById(req.params.id);
    if (foundReview.userId == req.user.id || req.user.isAdmin) {
      try {
        const updatedReview = await foundReview.update(
          { $set: req.body },
          { new: true }
        );
        res.status(201).json(updatedReview);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json("You are not authorised to do that");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const foundReview = await Review.findById(req.params.id);
    if (foundReview.userId == req.user.id || req.user.isAdmin) {
      const deletedReview = await foundReview.delete();
      res.status(201).json(deletedReview);
    } else {
      res.status(500).json("You are not authorised to do that");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
