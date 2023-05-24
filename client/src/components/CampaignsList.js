import React, { useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";
import { format } from "timeago.js";

function CampaignsList({ cat, filters, sort }) {
  const [visibleCampaigns, setVisibleCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/campaigns/?category=${cat}`
        );
        setVisibleCampaigns(res.data);
        setFilteredCampaigns(res.data);
      } catch (err) {}
    };
    getCampaigns();
  }, [cat]);

  useEffect(() => {
    let filteredCampaignsUpdated = [];
    let counter = 0;

    if (filters.title) {
      for (let i = 0; i < visibleCampaigns.length; i++) {
        if (
          visibleCampaigns[i].title
            .toUpperCase()
            .includes(filters.title.toUpperCase())
        ) {
          filteredCampaignsUpdated[counter] = visibleCampaigns[i];
          counter++;
        }
      }
      setFilteredCampaigns(filteredCampaignsUpdated);
    }
  }, [filters.title]);

  useEffect(() => {
    if (sort === "price") {
      setFilteredCampaigns(
        [...filteredCampaigns].sort((a, b) => {
          return a.perPrice - b.perPrice;
        })
      );
    } else if (sort === "date") {
      setFilteredCampaigns(
        [...filteredCampaigns].sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
      );
    } else {
      setFilteredCampaigns(
        [...filteredCampaigns].sort((a, b) => {
          return a.current / a.target - b.current / b.target;
        })
      );
    }
  }, [sort]);

  const renderedCampaigns = filteredCampaigns.map((campaign) => {
    return (
      <Card
        cover={campaign.img[0]}
        title={campaign.title}
        profilePic={campaign.profilePic}
        desc={campaign.desc}
        author={campaign.author}
        goal={campaign.target}
        current={campaign.current}
        perPrice={campaign.perPrice}
        daysLeft={format(campaign.deadline)}
        bigCover
        key={campaign.id}
        id={campaign._id}
      ></Card>
    );
  });
  return (
    <div className="sm:grid sm:grid-cols-3 sm:gap-4 mx-auto">
      {renderedCampaigns}
    </div>
  );
}

export default CampaignsList;
