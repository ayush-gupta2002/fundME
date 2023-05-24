import React from "react";
import classNames from "classnames";

function ImgContainer(props) {
  let imgContainerClass = classNames({
    "sm:flex-1": true,
    "flex-2": true,
    "w-screen": true,
    "h-[550px]": true,
    "overflow-hidden": true,
    "my-1": true,
    flex: true,
  });
  return <div className={imgContainerClass}>{props.children}</div>;
}

export default ImgContainer;
