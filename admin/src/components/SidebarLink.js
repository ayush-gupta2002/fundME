import React from "react";
import { Link } from "react-router-dom";

function SidebarLink(props) {
  return (
    <li className="flex p-2 text-gray-900 text-lg">
      <div className="my-auto text-md mr-1">{props.icon}</div>
      <div>{props.value}</div>
    </li>
  );
}

export default SidebarLink;
