const router = require("express").Router();
const Cart = require("../models/Cart");
const {
  verifyToken,
  verifyTokenAndAdmin,
  verifyTokenAndAuth,
} = require("./verifyToken");

//CREATE

router.post("/", verifyToken, async (req, res) => {
  const newCart = new Cart(req.body);
  newCart.userId = req.user.id;

  try {
    const savedCart = await newCart.save();
    res.status(201).json(savedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE

router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const updatedCart = await Cart.findOneAndUpdate(
      { userId: req.params.id },
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET CART

router.get("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const foundCart = await Cart.find({ userId: req.params.id });
    res.status(200).json(foundCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE CART

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const deletedCart = await Cart.findOneAndDelete({ userId: req.params.id });
    res.status(201).json(deletedCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL CARTS

router.get("/", verifyTokenAndAdmin, async (req, res) => {
  try {
    const carts = await Cart.find();
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
