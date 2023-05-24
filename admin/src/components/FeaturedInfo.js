import React, { useState } from "react";
import FeaturedItem from "./FeaturedItem";
import ntdmn from "number-to-date-month-name";

function FeaturedInfo({ monthlyRevenue, monthlyTransactions }) {
  const month = ntdmn.toMonth(new Date().getMonth() + 1);
  let income = 0;
  let filteredIncome = monthlyRevenue.filter((obj) => {
    if (obj.month === month) {
      income += obj.total;
    }
    return obj.month === month;
  });
  let transactions = 0;
  monthlyTransactions.filter((month) => {
    if (month._id === new Date().getMonth() + 1) {
      transactions = month.total;
    }
  });
  let transactionsRate = 0;
  let prevTransactions = 0;
  let prevIncome = 0;
  let incomeRate = 0;
  if (new Date().getMonth() === 0) {
    incomeRate = 0;
    incomeRate = 0;
  } else {
    const prevMonth = ntdmn.toMonth(new Date().getMonth());
    let filteredPrevIncome = monthlyRevenue.filter((obj) => {
      if (obj.month === prevMonth) {
        prevIncome += obj.total;
      }
    });
    let filteredPrevTransactions = monthlyTransactions.filter((obj) => {
      if (obj._id === new Date().getMonth()) {
        prevTransactions = obj.total;
      }
    });
    if (prevTransactions === 0) {
      transactionsRate = 0;
    } else {
      transactionsRate =
        ((transactions - prevTransactions) / prevTransactions) * 100;
    }
    if (prevIncome === 0) {
      incomeRate = 0;
    } else {
      incomeRate = ((income - prevIncome) / prevIncome) * 100;
    }
  }

  return (
    <div className="w-full flex justify-between p-4">
      <FeaturedItem
        title="Revenue"
        type="INR"
        value={income}
        rate={Math.round(incomeRate * 100) / 100}
        arrow="Down"
      ></FeaturedItem>
      <FeaturedItem
        title="Transactions"
        type="Contributions"
        value={transactions}
        rate={Math.round(transactionsRate * 100) / 100}
        arrow="Down"
      ></FeaturedItem>
    </div>
  );
}

export default FeaturedInfo;
