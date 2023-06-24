import React from "react";
import SidebarLink from "./SidebarLink";
import { Link } from "react-router-dom";

function SidebarGroup(props) {
  const links = props.links.map((link) => {
    return <SidebarLink value={link.value} icon={link.icon}></SidebarLink>;
  });

  return (
    <Link to={props.redirect}>
      <div className="mb-4 cursor-pointer hover:bg-[#fcd5ce] hover:scale-105 duration-500 p-2 rounded-lg">
        <h3 className="text-xl text-gray-500">{props.title}</h3>
        <ul className="list-disc p-2">{links}</ul>
      </div>
    </Link>
  );
}

export default SidebarGroup;
