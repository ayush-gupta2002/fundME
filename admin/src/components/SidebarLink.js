import React from "react";
import { Link } from "react-router-dom";

function SidebarLink(props) {
  return (
    <Link to={props.redirect}>
      <li className="flex p-2 cursor-pointer text-gray-900 rounded-lg hover:bg-[#fcd5ce] text-lg hover:scale-105 duration-500">
        <div className="my-auto text-md mr-1">{props.icon}</div>
        <div>{props.value}</div>
      </li>
    </Link>
  );
}

export default SidebarLink;
