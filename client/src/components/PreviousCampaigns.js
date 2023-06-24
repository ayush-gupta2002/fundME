import React from "react";
import Card from "./Card";

function PreviousCampaigns({ prevCampaigns, foundAuthor }) {
  console.log(prevCampaigns);
  const renderedCampaigns = prevCampaigns.map((campaign) => {
    return (
      <Card
        cover={campaign.img[0]}
        title={campaign.title}
        desc={campaign.desc}
        foundAuthor={foundAuthor}
        date={campaign.createdAt}
        goal={campaign.target}
        current={campaign.current}
        perPrice={campaign.perPrice}
        smallCover
        key={campaign._id}
        id={campaign._id}
      ></Card>
    );
  });

  return (
    //Only load the latest 4 campaigns here
    <div className="w-5/6 mx-auto h-full mt-3 rounded-lg">
      <div className="md:grid sm:grid-cols-4 sm:gap-4 mx-auto grid-rows-2">
        {renderedCampaigns}
      </div>
    </div>
  );
}

export default PreviousCampaigns;
