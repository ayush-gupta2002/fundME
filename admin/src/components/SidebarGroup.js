import React from "react";
import SidebarLink from "./SidebarLink";

function SidebarGroup(props) {
  const links = props.links.map((link) => {
    return (
      <SidebarLink
        value={link.value}
        icon={link.icon}
        redirect={link.redirect}
      ></SidebarLink>
    );
  });

  return (
    <div className="mb-4">
      <h3 className="text-xl text-gray-500">{props.title}</h3>
      <ul className="list-disc p-2">{links}</ul>
    </div>
  );
}

export default SidebarGroup;
