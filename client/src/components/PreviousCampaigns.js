import React from "react";
import Card from "./Card";
import campaigns from "../Campaigns";

function PreviousCampaigns() {
  const renderedCampaigns = campaigns.map((campaign) => {
    return (
      <Card
        cover={campaign.cover}
        title={campaign.title}
        profilePic={campaign.profilePic}
        desc={campaign.desc}
        author={campaign.author}
        date={campaign.date}
        goal={campaign.goal}
        current={campaign.current}
        perPrice={campaign.perPrice}
        smallCover
      ></Card>
    );
  });

  return (
    //Only load the latest 4 campaigns here
    <div className="w-5/6 mx-auto h-full mt-3 rounded-lg">
      <div className="md:grid sm:grid-cols-4 sm:gap-4 mx-auto grid-rows-2">
        {renderedCampaigns}
        {renderedCampaigns}
      </div>
    </div>
  );
}

export default PreviousCampaigns;
