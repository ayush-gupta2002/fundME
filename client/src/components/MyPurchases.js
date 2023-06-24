import React from "react";
import { useNavigate } from "react-router-dom";

function MyPurchases({ purchases }) {
  const navigate = useNavigate();
  const renderedPurchases = purchases.map((purchase) => {
    return (
      <div
        className="rounded-lg w-full h-fit bg-gray-100 p-4 cursor-pointer my-2 hover:scale-105 duration-500 cursor-pointer"
        key={purchase._id}
        onClick={() => {
          navigate(`/order/${purchase._id}`);
        }}
      >
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl text-left">{purchase._id}</h1>
          <h3 className="font-semibold text-lg text-right">
            INR {purchase.amount}
          </h3>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600 text-left">{purchase.stripePaymentId}</p>
          <p className="text-gray-600 text-right">{purchase.createdAt}</p>
        </div>
      </div>
    );
  });

  return <div className="px-4">{renderedPurchases}</div>;
}

export default MyPurchases;
