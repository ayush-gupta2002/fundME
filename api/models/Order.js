const mongoose = require("mongoose");

const OrderSchema = mongoose.Schema(
  {
    campaignId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Campaign" }],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    stripePaymentId: {
      type: String,
      required: true,
    },
    mongoPaymentId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["pending", "success", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);
