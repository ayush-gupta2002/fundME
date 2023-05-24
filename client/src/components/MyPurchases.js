import React from "react";
import PurchaseData from "../PurchaseData";

function MyPurchases() {
  const renderedPurchases = PurchaseData.map((purchase) => {
    return (
      <div
        className="rounded-lg w-full h-fit bg-gray-100 p-4 cursor-pointer my-2"
        id={purchase.id}
      >
        <div className="flex justify-between">
          <h1 className="font-semibold text-xl text-left">{purchase.title}</h1>
          <h3 className="font-semibold text-lg text-right">
            INR {purchase.amount}
          </h3>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600 text-left">{purchase.author}</p>
          <p className="text-gray-600 text-right">{purchase.date}</p>
        </div>
      </div>
    );
  });

  return <div className="px-4">{renderedPurchases}</div>;
}

export default MyPurchases;
