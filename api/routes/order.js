const router = require("express").Router();
const Campaign = require("../models/Campaign");
const Order = require("../models/Order");
const User = require("../models/User");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("./verifyToken");

//GET MONTHLY INCOME
router.get("/income", verifyToken, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const foundUser = await User.findById(req.user.id);
  try {
    // const foundOrders = await Order.find({
    //   campaignId: { $in: foundUser.campaigns },
    // });
    // console.log(foundOrders);
    const income = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth },
          campaignId: { $in: foundUser.campaigns },
        },
      },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: "$sales" } } },
    ]);
    console.log("income", income);
    res.status(200).json(income);
  } catch (err) {
    res.status(500).json(err);
  }
});

//MONTHLY TRANSACTIONS

router.get("/monthlytransactions", verifyToken, async (req, res) => {
  const date = new Date();
  const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
  const prevMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  const foundUser = await User.findById(req.user.id);
  try {
    const transactions = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: prevMonth },
          campaignId: { $in: foundUser.campaigns },
        },
      },
      { $project: { month: { $month: "$createdAt" }, sales: "$amount" } },
      { $group: { _id: "$month", total: { $sum: 1 } } },
    ]);

    res.status(200).json(transactions);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET NEW CUSTOMERS

router.get("/newcustomers", verifyToken, async (req, res) => {
  try {
    // const foundCampaigns = await Campaign.find({ author: req.user.id });
    const foundUser = await User.findById(req.user.id);
    try {
      // let foundCampaignsId = [];
      // for (let i = 0; i < foundCampaigns.length; i++) {
      //   foundCampaignsId[i] = foundCampaigns[i];
      // }
      const foundOrders = await Order.find({
        campaignId: {
          $in: foundUser.campaigns,
        },
      });
      let newCustomers = [];
      for (let i = 0; i < foundOrders.length; i++) {
        const foundCustomer = await User.findById(foundOrders[i].userId);
        const foundCampaign = await Campaign.findById(
          foundOrders[i].campaignId
        );
        if (foundCustomer && foundCampaign) {
          newCustomers.push({
            customer: foundCustomer,
            campaign: foundCampaign,
            order: foundOrders[i],
          });
        }
      }
      res.status(200).json(newCustomers);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).send("campaigns not found");
  }
});

//CREATE
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body);
  newOrder.userId = req.user.id;
  console.log("newOrder", newOrder);

  try {
    for (let i = 0; i < newOrder.campaignId.length; i++) {
      const foundCampaign = await Campaign.findById(newOrder.campaignId[i]);
      const newCurrent = foundCampaign.current + foundCampaign.perPrice;
      const updatedCampaign = await Campaign.findByIdAndUpdate(
        newOrder.campaignId[i],
        { current: newCurrent }
      );
      console.log(updatedCampaign);
    }
    try {
      const savedOrder = await newOrder.save();
      res.status(201).json(savedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
//GET ALL USER ORDERS

router.get("/userorders/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.params.id });
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE

router.delete("/:orderId", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);
    res.status(201).json(deletedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ORDER

router.get("/:orderId", verifyToken, async (req, res) => {
  try {
    const foundOrder = await Order.findById(req.params.orderId);
    const foundCampaign = await Campaign.findById(foundOrder.campaignId);
    if (!foundCampaign) {
      res.status(500).json("The campaign could not be found");
    } else if (
      foundOrder.userId == req.user.id ||
      req.user.isAdmin ||
      req.user.id == foundCampaign.author
    ) {
      res.status(200).json(foundOrder);
    } else {
      res.status(500).json("You are not authorised to do that");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CAMPAIGN ORDERS

router.get("/campaignorders/:id", verifyToken, async (req, res) => {
  try {
    const foundCampaign = await Campaign.findById(req.params.id);
    if (foundCampaign.author == req.user.id || req.user.isAdmin) {
      try {
        const orders = await Order.find({ campaignId: foundCampaign.id });
        res.status(200).json(orders);
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

//GET ALL ORDERS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  const qUser = req.query.user;
  const qCampaign = req.query.campaign;
  const qNew = req.query.new;

  try {
    let orders;
    if (qNew) {
      orders = await Order.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCampaign) {
      orders = await Order.find({ campaignId: qCampaign });
    } else if (qUser) {
      orders = await Order.find({ userId: qUser });
    } else {
      orders = await Order.find();
    }
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
