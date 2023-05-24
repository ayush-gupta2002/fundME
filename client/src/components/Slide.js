import React from "react";
import classNames from "classnames";

function Slide(props) {
  let slideClass = classNames({
    flex: true,
    "align-middle": true,
    "max-h-[700px]": true,
    "w-screen": true,
    "bg-gradient-to-r": true,
    "from-red-300": true,
    "to-cyan-100": true,
    // "from-yellow-500 bg-yellow-100": props.bgColor === "bg-yellow-100",
    // "bg-red-100": props.bgColor === "bg-red-100",
    // "bg-gray-100": props.bgColor === "bg-gray-100",
    "rounded-lg": true,
    "duration:500": true,
  });
  return <div className={slideClass}>{props.children}</div>;
}

export default Slide;
