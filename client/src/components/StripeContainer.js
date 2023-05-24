import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";

const PUBLIC_KEY =
  "pk_test_51MdZ5JSDS1FKTFkyu3LYTgnudtEv8B3x7kAM5ryLzicm5HhM7Uyg5J99zteQENazWT53WCfiqPwxZD7uX8exOtI600qVZ2Vtew";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

function StripeContainer() {
  return (
    <Elements stripe={stripeTestPromise}>
      <PaymentForm></PaymentForm>
    </Elements>
  );
}

export default StripeContainer;
