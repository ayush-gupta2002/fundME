import React from "react";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";

function FeaturedItem(props) {
  let arrow;
  if (props.rate < 0) {
    arrow = (
      <AiOutlineArrowDown className="my-auto ml-1 font-semibold text-red-500"></AiOutlineArrowDown>
    );
  } else {
    arrow = (
      <AiOutlineArrowUp className="my-auto ml-1 font-semibold text-green-500"></AiOutlineArrowUp>
    );
  }

  return (
    <div className="mx-2 w-full p-6 rounded-lg cursor-pointer shadow-lg">
      <span className="text-xl font-semibold text-gray-700">{props.title}</span>
      <div className="flex">
        <span className="text-2xl font-semibold my-4">
          {props.type} {props.value}
        </span>
        <span className="flex text-md my-auto ml-2">
          {props.rate}
          {arrow}
        </span>
      </div>
      <span>Compared to last month</span>
    </div>
  );
}

export default FeaturedItem;
