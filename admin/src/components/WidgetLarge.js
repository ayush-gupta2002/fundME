import React from "react";
import { format } from "timeago.js";

function WidgetLarge({ transactions }) {
  let Button = ({ type }) => {
    let bgColor;
    if (type === "success") {
      bgColor = "bg-green-200";
    } else if (type === "pending") {
      bgColor = "bg-yellow-200";
    } else {
      bgColor = "bg-red-200";
    }
    return (
      <button className={"rounded-lg p-2 text-gray-600 " + bgColor}>
        {type}
      </button>
    );
  };

  const renderedRows = transactions.map((transaction) => {
    return (
      <tr>
        <td className="flex">
          <img
            src={transaction.customer.profilePic}
            className="w-8 h-8 rounded-full"
          ></img>
          <div className="my-auto font-semibold ml-4">
            {transaction.customer.fullname}
          </div>
        </td>
        <td className="text-gray-500">{format(transaction.order.createdAt)}</td>
        <td className="text-gray-500">INR {transaction.order.amount}</td>
        <td>
          <Button type="success"></Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="w-2/3 shadow-lg p-8 overflow-scroll">
      <h3 className="font-semibold text-2xl">Latest Transactions</h3>
      <table className="w-full mt-4">
        <tr className="text-left">
          <th>Customer</th>
          <th>Date</th>
          <th>Amount (Complete Transaction)</th>
          <th>Status</th>
        </tr>
        {renderedRows}
      </table>
    </div>
  );
}

export default WidgetLarge;
