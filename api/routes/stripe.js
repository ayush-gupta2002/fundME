const router = require("express").Router();
const stripe = require("stripe")(
  "sk_test_51MdZ5JSDS1FKTFkyaZxz9ImHC7MYlFSvXjsBcKb3lqY2DPG0ufGrLo7FpnpRycRgvA2OVHCdv4C6tf7aXfSxJwY900RGv4WVGK"
);
const Payment = require("../models/Payment");
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  let { amount, id, user } = req.body;
  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "INR",
      description: "fundMe",
      payment_method: id,
      confirm: true,
    });
    // console.log("payment", payment);
    if (payment.status == "succeeded") {
      // const newPayment = new Payment({
      //   paymentID: payment.id,
      //   amount: payment.amount / 100,
      //   userID: user._id,
      // });
      // const savedPayment = await newPayment.save();
      // console.log("savedPayment", savedPayment);
      res
        .status(201)
        .json({ message: "Payment Successful", success: true, id: payment.id });
    } else if (payment.status == "requires_action") {
      // const newPayment = new Payment({
      //   paymentID: payment.id,
      //   amount: payment.amount / 100,
      //   customerID: user._id,
      // });
      // const savedPayment = await newPayment.save();
      // console.log("savedPayment", savedPayment);
      res.status(200).json({
        message: "3D secure required",
        actionRequired: true,
        clientSecret: payment.client_secret,
        id: payment.id,
      });
    } else {
      res
        .status(500)
        .json({ message: "Payment Failed", success: false, id: payment.id });
    }
  } catch (err) {
    console.log("HAHAHA ERROR", err);
    res.status(500).json({ message: "Payment Failed", success: false });
  }
});

router.post("/save", async (req, res) => {
  const newPayment = new Payment({
    paymentID: req.body.paymentID,
    amount: req.body.amount,
    customerID: req.body.customerID,
  });
  const savedPayment = await newPayment.save();
  res.status(200).json(savedPayment);
  console.log(savedPayment);
});

module.exports = router;
