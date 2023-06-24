const mongoose = require("mongoose");

const CategorySchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  cover: { type: String, required: true },
  campaigns: [{ type: mongoose.Schema.Types.ObjectId }],
});

module.exports = mongoose.model("Category", CategorySchema);
