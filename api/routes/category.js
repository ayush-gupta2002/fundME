const router = require("express").Router();
const Category = require("../models/Category");
const { verifyTokenAndAdmin, verifyToken } = require("./verifyToken");

//CREATE

router.post("/", verifyTokenAndAdmin, async (req, res) => {
  const newCategory = new Category(req.body);
  newCategory.campaigns = [];

  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//VIEW ALL

router.get("/", verifyToken, async (req, res) => {
  try {
    const foundCategories = await Category.find({});
    res.status(200).json(foundCategories);
  } catch (err) {
    res.status(500).json(err);
  }
});

//VIEW A CATEGORY

router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params.id;
  try {
    const foundCategory = await Category.findById(id);
    res.status(200).json(foundCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE A CATEGORY

router.delete("/:id", verifyTokenAndAdmin, async (req, res) => {
  const { id } = req.params.id;
  try {
    const foundCategory = await Category.findByIdAndDelete(id);
    res.status(201).json(foundCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
