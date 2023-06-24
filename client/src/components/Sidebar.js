import React, { useState } from "react";
import WorkDescription from "./WorkDescription";
import PreviousCampaigns from "./PreviousCampaigns";
import Goal from "./Goal";
import Reviews from "./Reviews";

function Sidebar({ foundCampaign, foundAuthor, foundReviews, prevCampaigns }) {
  const links = [
    { label: "Work Description", to: "WorkDescription" },
    { label: "Goal", to: "Goal" },
    { label: "Previous Campaigns", to: "PreviousCampaigns" },
    { label: "Reviews", to: "Reviews" },
  ];

  const pages = [
    {
      key: "WorkDescription",
      element: (
        <WorkDescription
          foundCampaign={foundCampaign}
          foundAuthor={foundAuthor}
        ></WorkDescription>
      ),
    },
    {
      key: "PreviousCampaigns",
      element: (
        <PreviousCampaigns
          foundAuthor={foundAuthor}
          prevCampaigns={prevCampaigns}
        ></PreviousCampaigns>
      ),
    },
    {
      key: "Goal",
      element: (
        <Goal foundCampaign={foundCampaign} foundAuthor={foundAuthor}></Goal>
      ),
    },
    {
      key: "Reviews",
      element: (
        <Reviews
          foundCampaign={foundCampaign}
          foundReviews={foundReviews}
        ></Reviews>
      ),
    },
  ];

  const [currentPath, setCurrentPath] = useState(pages[0].key);

  const visiblePage = pages.find((page) => page.key === currentPath).element;

  const handleClick = (newPath) => {
    setCurrentPath(newPath);
  };

  const renderedLinks = links.map((link) => {
    return (
      <div
        key={link.label}
        className="text-left text-xl mx-2 text-gray-400 px-2 rounded-lg font-bold w-fit hover:bg-gray-100 cursor-pointer hover:text-gray-600 my-3 sm:my-0"
        onClick={() => {
          handleClick(link.to);
        }}
      >
        {link.label}
      </div>
    );
  });

  return (
    <div className="w-full">
      <div className="sm:flex mt-3 ml-10">{renderedLinks}</div>
      <div className="">{visiblePage}</div>
    </div>
  );
}

export default Sidebar;
