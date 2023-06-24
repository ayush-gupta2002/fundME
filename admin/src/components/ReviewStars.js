import classNames from "classnames";
import React, { useState } from "react";
import SoloStar from "./SoloStar";

//text-black font-semibold text-sm ml-1 line-clamp-1

function ReviewStars({
  isClickable,
  isExpanded,
  heading,
  newRating,
  setNewRating,
}) {
  let handleClick;
  handleClick = (enteredStars) => {
    setNewRating(enteredStars);
  };

  const headingClasses = classNames({
    "text-blac": true,
    "font-semibold": true,
    "text-sm": true,
    "ml-1": true,
    "line-clamp-1": !isExpanded,
    "text-left": true,
  });
  return (
    <div className="flex items-center mb-1 cursor-pointer">
      <div
        className="h-fit w-fit hover:scale-105"
        onClick={() => {
          if (isClickable) {
            handleClick(1);
          }
        }}
      >
        <SoloStar isFilled={newRating >= 1}></SoloStar>
      </div>
      <div
        className="h-fit w-fit hover:scale-105"
        onClick={() => {
          if (isClickable) {
            handleClick(2);
          }
        }}
      >
        <SoloStar isFilled={newRating >= 2}></SoloStar>
      </div>
      <div
        className="h-fit w-fit hover:scale-105"
        onClick={() => {
          if (isClickable) {
            handleClick(3);
          }
        }}
      >
        <SoloStar isFilled={newRating >= 3}></SoloStar>
      </div>
      <div
        className="h-fit w-fit hover:scale-105"
        onClick={() => {
          if (isClickable) {
            handleClick(4);
          }
        }}
      >
        <SoloStar isFilled={newRating >= 4}></SoloStar>
      </div>
      <div
        className="h-fit w-fit hover:scale-105"
        onClick={() => {
          if (isClickable) {
            handleClick(5);
          }
        }}
      >
        <SoloStar isFilled={newRating === 5}></SoloStar>
      </div>
      <div className={headingClasses}>{heading}</div>
    </div>
  );
}

export default ReviewStars;
