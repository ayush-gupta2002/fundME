import React from "react";
import { MdLineStyle, MdTimeline, MdFeedback } from "react-icons/md";
import { BiTrendingUp } from "react-icons/bi";
import {
  AiOutlineUser,
  AiFillShop,
  AiOutlineMail,
  AiOutlineMessage,
} from "react-icons/ai";
import { BsCurrencyRupee } from "react-icons/bs";
import { HiOutlineDocumentReport } from "react-icons/hi";
import SidebarGroup from "./SidebarGroup";
import { GrUserManager } from "react-icons/gr";
import { AiFillDelete } from "react-icons/ai";

function Sidebar() {
  const groups = [
    {
      title: "Dashboard",
      links: [
        { value: "Home", icon: <MdLineStyle></MdLineStyle> },
        { value: "Analytics", icon: <MdTimeline></MdTimeline> },
        { value: "Sales", icon: <BiTrendingUp></BiTrendingUp> },
      ],
      redirect: "/",
    },
    {
      title: "Manage Campaigns",
      redirect: "/campaigns",
      links: [
        {
          value: "New Campaigns",
          icon: <AiFillShop></AiFillShop>,
        },
        {
          value: "Delete Campaigns",
          icon: <AiFillDelete></AiFillDelete>,
        },
        {
          value: "Edit Campaigns",
          icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
        },
      ],
    },
    {
      title: "Notifications",
      links: [{ value: "Reviews", icon: <MdFeedback></MdFeedback> }],
      redirect: "/reviews",
    },
    {
      title: "Orders",
      links: [
        { value: "Manage", icon: <GrUserManager></GrUserManager> },
        { value: "All Transactions", icon: <MdTimeline></MdTimeline> },
        {
          value: "Reports",
          icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
        },
      ],
      redirect: "/orders",
    },
  ];

  const renderedGroups = groups.map((group) => {
    return (
      <SidebarGroup
        title={group.title}
        links={group.links}
        redirect={group.redirect}
      ></SidebarGroup>
    );
  });

  return (
    <div className="sticky h-screen bg-[#f8edeb] w-1/5 overflow-scroll">
      <div className="p-5">{renderedGroups}</div>
    </div>
  );
}

export default Sidebar;
