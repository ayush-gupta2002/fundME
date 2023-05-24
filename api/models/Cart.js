const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    campaignId: { type: mongoose.Schema.Types.ObjectId },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true,
    },
    amount: { type: Number },
    quantity: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
