const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema(
  {
    paymentID: { type: String, required: true },
    amount: { type: Number },
    customerID: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Payment", PaymentSchema);
