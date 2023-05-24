import React from "react";

function Image(props) {
  return (
    <div
      className="h-full w-full bg-fixed rounded-lg mx-1 bg-center bg-cover"
      style={{ backgroundImage: `url(${props.url})` }}
    ></div>
  );
}
export default Image;
