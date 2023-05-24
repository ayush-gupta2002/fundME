import React from "react";

function Link(props) {
  return (
    <div className="hover:underline text-decoration cursor-pointer my-2 text-gray-500 hover:text-blue-700">
      {props.children}
    </div>
  );
}

export default Link;
