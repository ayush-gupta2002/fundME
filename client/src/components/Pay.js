import React from "react";
import StripeCheckout from "react-stripe-checkout";
const KEY =
  "pk_test_51MdZ5JSDS1FKTFkyu3LYTgnudtEv8B3x7kAM5ryLzicm5HhM7Uyg5J99zteQENazWT53WCfiqPwxZD7uX8exOtI600qVZ2Vtew";

function Pay() {
  const onToken = (token) => {
    console.log(token);
  };

  return (
    <div>
      <StripeCheckout
        name="fundMe"
        image="https://images.unsplash.com/photo-1525367063161-61df4bf6100a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTh8fG1vbmV5JTIwbG9nb3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=1600&q=60"
        desription="Your total is INR 20"
        amount={2000}
        token={onToken}
        stripeKey={KEY}
      ></StripeCheckout>
    </div>
  );
}

export default Pay;
