const mongoose = require("mongoose");

const CampaignSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: { type: String, required: true },
    desc: { type: String, required: true },
    img: [{ type: String }],
    categories: { type: String, required: true },
    target: { type: Number, required: true },
    current: { type: Number, default: 0 },
    deadline: { type: Date, required: true },
    availability: {
      type: String,
      enum: ["Unavailable", "Available"],
      default: "Available",
    },
    perPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Campaign", CampaignSchema);
