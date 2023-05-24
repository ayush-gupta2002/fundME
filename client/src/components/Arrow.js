import React from "react";
import classNames from "classnames";

function Arrow(props) {
  let arrowClass = classNames({
    container: true,
    "w-fit": true,
    "max-h-fit": true,
    "bg-white": true,
    "rounded-full": true,
    "border-1": true,
    "border-red-200": true,
    flex: true,
    "text-center": true,
    "justify-center": true,
    "m-auto": true,
    absolute: true,
    "top-0": true,
    "bottom-0": true,
    "cursor-pointer": true,
    "opacity-75": true,
    "left-px": props.direction === "left",
    "right-px": props.direction === "right",
  });
  //container w-fit max-h-fit bg-white rounded-full border-1 border-red-200 flex text-center justify-center m-auto absolute top-0 bottom-0 left-px cursor-pointer opacity-75

  return <div className={arrowClass}>{props.children}</div>;
}

export default Arrow;
