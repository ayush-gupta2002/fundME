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

function Sidebar() {
  const groups = [
    {
      title: "Dashboard",
      links: [
        { value: "Home", icon: <MdLineStyle></MdLineStyle>, redirect: "/" },
        { value: "Analytics", icon: <MdTimeline></MdTimeline> },
        { value: "Sales", icon: <BiTrendingUp></BiTrendingUp> },
      ],
    },
    {
      title: "Quick Menu",
      links: [
        {
          value: "Users",
          icon: <AiOutlineUser></AiOutlineUser>,
          redirect: "/users",
        },
        {
          value: "Campaigns",
          icon: <AiFillShop></AiFillShop>,
          redirect: "/campaigns",
        },
        { value: "Transactions", icon: <BsCurrencyRupee></BsCurrencyRupee> },
        {
          value: "Reports",
          icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
        },
      ],
    },
    {
      title: "Notifications",
      links: [
        { value: "Mail", icon: <AiOutlineMail></AiOutlineMail> },
        { value: "Feedback", icon: <MdFeedback></MdFeedback> },
        { value: "Messages", icon: <AiOutlineMessage></AiOutlineMessage> },
      ],
    },
    {
      title: "Staff",
      links: [
        { value: "Manage", icon: <GrUserManager></GrUserManager> },
        { value: "Analytics", icon: <MdTimeline></MdTimeline> },
        {
          value: "Reports",
          icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
        },
      ],
    },
  ];

  const renderedGroups = groups.map((group) => {
    return (
      <SidebarGroup title={group.title} links={group.links}></SidebarGroup>
    );
  });

  return (
    <div className="sticky h-screen bg-[#f8edeb] w-1/5">
      <div className="p-5">{renderedGroups}</div>
    </div>
  );
}

export default Sidebar;
