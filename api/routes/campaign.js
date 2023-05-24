const router = require("express").Router();
const Campaign = require("../models/Campaign");
const User = require("../models/User");
const { verifyToken, verifyTokenAndAdmin } = require("./verifyToken");
const Order = require("../models/Order");

//CREATE

router.post("/", verifyToken, async (req, res) => {
  console.log("req", req.body);
  console.log("img", req.body.img);
  const newCampaign = new Campaign(req.body.campaign);
  console.log("newCampaign", newCampaign);
  try {
    newCampaign.author = req.user.id;
    const savedCampaign = await newCampaign.save();
    res.status(200).json(savedCampaign);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyToken, async (req, res) => {
  console.log(req.body);
  try {
    const foundCampaign = await Campaign.findById(req.params.id);
    if (foundCampaign.author == req.user.id) {
      try {
        const updatedCampaign = await Campaign.findOneAndUpdate(
          { _id: req.params.id },
          { $set: req.body },
          {
            new: true,
          }
        );
        res.status(201).json(updatedCampaign);
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

//GET ALL CAMPAIGNS

router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let campaigns;
    if (qNew) {
      campaigns = await Campaign.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      campaigns = await Campaign.find({ categories: { $in: [qCategory] } });
    } else {
      campaigns = await Campaign.find();
    }
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER CAMPAIGNS

router.get("/user/:id", verifyToken, async (req, res) => {
  try {
    const campaigns = await Campaign.find({ author: req.params.id });
    res.status(200).json(campaigns);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CAMPAIGN STATS

router.get("/stats", verifyTokenAndAdmin, async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
  try {
    const data = await Campaign.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      { $project: { month: { $month: "$createdAt" } } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET A CAMPAIGN STATS

router.get("/stats/:id", verifyToken, async (req, res) => {
  try {
    const foundCampaign = await Campaign.findById(req.params.id);
    if (foundCampaign.author == req.user.id) {
      const date = new Date();
      const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
      try {
        const data = await Order.aggregate([
          {
            $match: {
              createdAt: { $gte: prevMonth },
              campaignId: { $in: [foundCampaign._id] },
            },
          },
          { $project: { month: { $month: "$createdAt" } } },
          { $group: { _id: "$month", total: { $sum: 1 } } },
        ]);
        // const data = await Order.find({ campaignId: req.params.id });
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(500).json("You are not authorised to do that.");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const foundCampaign = await Campaign.findById(req.params.id);
    if (foundCampaign.author == req.user.id) {
      try {
        const deletedCampaign = await foundCampaign.delete();
        res.status(201).json(deletedCampaign);
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

//GET CAMPAIGN

router.get("/:id", verifyToken, async (req, res) => {
  try {
    const foundCampaign = await Campaign.findById(req.params.id);
    res.status(200).json(foundCampaign);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
