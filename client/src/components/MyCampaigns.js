import React from "react";
import campaigns from "../Campaigns";
import { sliderItems } from "../data";
import ProgressBar from "../components/ProgressBar";

function MyCampaigns() {
  const renderedCampaigns = sliderItems.map((campaign) => {
    return (
      <div className="rounded-lg flex h-[260px] w-full cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 mx-auto mx-1 sm:mx-4 my-2">
        <img
          src={campaign.img1}
          className="min-w-[300px] h-full rounded-sm"
        ></img>
        <div className="p-4 w-full">
          <h3 className="font-semibold text-xl text-left my-2">
            {campaign.title}
          </h3>
          <p className="text-gray-500 text-left line-clamp-4 my-2">
            {campaign.desc}
          </p>
          <ProgressBar current={24000} goal={45000} daysLeft={23}></ProgressBar>
        </div>
      </div>
    );
  });

  return <div>{renderedCampaigns}</div>;
}

export default MyCampaigns;
