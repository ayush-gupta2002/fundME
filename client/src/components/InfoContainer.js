import React from "react";
import classNames from "classnames";

function InfoContainer(props) {
  let infoContainerClass = classNames({
    "flex-1": true,
    "p-10": true,
    "inline-block": true,
    "m-auto": true,
    "text-center": true,
    "mr-5": true,
  });
  return <div className={infoContainerClass}>{props.children}</div>;
}

export default InfoContainer;
