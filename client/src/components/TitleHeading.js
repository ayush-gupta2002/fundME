import React from "react";
import classNames from "classnames";

function TitleHeading(props) {
  let titleHeadingClass = classNames({
    "text-2xl md:text-4xl lg:text-7xl": true,
    "font-bold": true,
  });
  return <div className={titleHeadingClass}>{props.children}</div>;
}

export default TitleHeading;
