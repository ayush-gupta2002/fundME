import React from "react";
import classNames from "classnames";

function TitleDesc(props) {
  let titleDescClass = classNames({
    "font-semibold": true,
    "my-12": true,
    "text-sm md:text-lg lg:text-xl": true,
  });
  return <div className={titleDescClass}>{props.children}</div>;
}

export default TitleDesc;
