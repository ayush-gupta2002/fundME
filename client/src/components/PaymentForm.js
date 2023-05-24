import React, { useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";
import Button from "./Button";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#fff",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": { color: "fce883" },
      "::placeholder": { color: "#87bbfd" },
    },
    invalid: { iconColor: "ffc7ee", color: "ffc7ee" },
  },
};

function PaymentForm() {
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const [paymentId, setPaymentId] = useState("");
  const [orderId, setOrderId] = useState(null);
  const [success, setSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      try {
        const { id } = paymentMethod;
        const response = await axios.post(
          "http://localhost:3000/api/payments",
          {
            amount: Math.round(cart.total * (400 / 3)),
            id,
            user: user.currentUser._doc,
          }
        );

        if (response.data.success) {
          setSuccess(true);
          setPaymentId(response.data.id);
          const paymentIntent = response.data;
          const resPayment = await axios
            .post(
              "http://localhost:3000/api/payments/save",
              {
                paymentID: paymentIntent.id,
                amount: paymentIntent.amount,
                customerID: user.currentUser._doc._id,
              },
              {
                headers: {
                  token: `Bearer ${user.currentUser.accessToken}`,
                },
              }
            )
            .then(async (res) => {
              console.log("saved Payment", res);
              let campaignId = [];
              for (let i = 0; i < cart.products.length; i++) {
                campaignId[i] = cart.products[i]._id;
              }

              const resOrder = await axios
                .post(
                  "http://localhost:3000/api/orders",
                  {
                    campaignId: campaignId,
                    userId: user.currentUser._doc._id,
                    stripePaymentId: paymentIntent.id,
                    amount: paymentIntent.amount,
                    mongoPaymentId: res.data._id,
                  },
                  {
                    headers: {
                      token: `Bearer ${user.currentUser.accessToken}`,
                    },
                  }
                )
                .then((res) => {
                  console.log("saved order", res);
                  setOrderId(res.data._id);
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => {
              console.log("error", err);
            });
        } else if (response.data.actionRequired) {
          try {
            const { paymentIntent, error } = await stripe.confirmCardPayment(
              response.data.clientSecret
            );
            console.log("payment Intent", paymentIntent);
            if (error) {
              setSuccess(false);
            }
            if (paymentIntent.status == "succeeded") {
              setPaymentId(paymentIntent.id);
              setSuccess(true);
              const resPayment = await axios
                .post(
                  "http://localhost:3000/api/payments/save",
                  {
                    paymentID: paymentIntent.id,
                    amount: paymentIntent.amount,
                    customerID: user.currentUser._doc._id,
                  },
                  {
                    headers: {
                      token: `Bearer ${user.currentUser.accessToken}`,
                    },
                  }
                )
                .then(async (res) => {
                  console.log("saved Payment", res);
                  let campaignId = [];
                  for (let i = 0; i < cart.products.length; i++) {
                    campaignId[i] = cart.products[i]._id;
                  }

                  const resOrder = await axios
                    .post(
                      "http://localhost:3000/api/orders",
                      {
                        campaignId: campaignId,
                        userId: user.currentUser._doc._id,
                        stripePaymentId: paymentIntent.id,
                        amount: paymentIntent.amount,
                        mongoPaymentId: res.data._id,
                      },
                      {
                        headers: {
                          token: `Bearer ${user.currentUser.accessToken}`,
                        },
                      }
                    )
                    .then((res) => {
                      console.log("saved order", res);
                      setOrderId(res.data._id);
                    })
                    .catch((err) => console.log(err));
                })
                .catch((err) => {
                  console.log("error", err);
                });
            }
          } catch (err) {
            console.log("error", err);
          }
        }
      } catch (err) {
        console.log("Error", error);
      }
    } else {
      console.log(error.message);
    }
  };

  return (
    <div>
      {!success ? (
        <form onSubmit={handleSubmit}>
          <fieldSet className="FormGroup">
            <div className="FormRow">
              <CardElement options={CARD_OPTIONS}></CardElement>
            </div>
          </fieldSet>
          <Button success center wide>
            Pay
          </Button>
        </form>
      ) : (
        <div>
          <h2>You just contributed to Campaigns. Hope to see you again!</h2>
          <div className="font-bold text-xl">PaymentID: {paymentId}</div>
          <div className="font-bold text-xl">OrderID: {orderId}</div>
          <Link to="/">
            <div className="font-bold text-blue-900 cursor-pointer hover:underline text-decoration w-fit">
              Go back to home
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}

export default PaymentForm;
