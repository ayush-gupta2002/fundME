import React from "react";
import classNames from "classnames";

function Wrapper(props) {
  let wrapperClass = classNames({
    container: true,
    "max-h-[700px]": true,
    "max-w-screen": true,
  });
  return <div className={wrapperClass}>{props.children}</div>;
}

export default Wrapper;
