import classNames from "classnames";
import React from "react";

function ProgressBar({ current, goal, largeHeadings, daysLeft }) {
  const amountClasses = classNames({
    "mb-1": true,
    "mt-2": largeHeadings,
    "text-sm": true,
    "font-medium": true,
    "text-gray-600": true,
    "justify-between": true,
    "text-lg": largeHeadings,
    flex: true,
  });

  const daysLeftClasses = classNames({
    "text-right": true,
    "text-gray-600": true,
    "font-semibold": true,
    "text-xs": true,
    "text-lg": largeHeadings,
  });

  return (
    <div className="text-left">
      <div className={amountClasses}>
        <div>Rs.{current}</div>
        <div>Rs.{goal}</div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-2 dark:bg-gray-700">
        <div
          className="bg-gradient-to-r h-1.5 rounded-full from-red-700 to-red-400"
          style={{ width: `${(current * 100) / goal}%` }}
        ></div>
      </div>
      <div className={daysLeftClasses}>Last Date: {daysLeft}</div>
    </div>
  );
}

export default ProgressBar;
