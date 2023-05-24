import React, { useState } from "react";
import StripeContainer from "../components/StripeContainer";
import "../Stripe.css";
import Button from "../components/Button";
import { useSelector } from "react-redux";

function Payment() {
  const [showItem, setShowItem] = useState(false);
  const cart = useSelector((state) => state.cart);
  return (
    <div className="App">
      <h1 className="text-3xl text-red-600 font-bold">fundME</h1>
      {showItem ? (
        <StripeContainer />
      ) : (
        <>
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold">{cart.quantity} Campaigns</h3>
            <h3 className="text-lg font-semibold">
              Rs.{Math.round((cart.total * 4) / 3)}.00
            </h3>
          </div>
          <Button
            onClick={() => {
              setShowItem(true);
            }}
            primary
            center
            wide
          >
            Proceed
          </Button>
        </>
      )}
    </div>
  );
}

export default Payment;
