import axios from "axios";
import React, { useEffect, useState } from "react";
import campaigns from "../Campaigns";
import Card from "./Card";
import { format } from "timeago.js";

function CardRow() {
  const [topCampaigns, setTopCampaigns] = useState([]);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/campaigns");
        setTopCampaigns(res.data);
      } catch (err) {
        console.log("oops", err);
      }
    };
    getCampaigns();
  }, []);

  const renderedCampaigns = topCampaigns.slice(0, 4).map((campaign) => {
    return (
      <Card
        title={campaign.title}
        cover={campaign.img}
        key={campaign.id}
        profilePic={campaign.profilePic}
        desc={campaign.desc}
        author={campaign.author}
        date={campaign.date}
        current={campaign.current}
        goal={campaign.target}
        daysLeft={format(campaign.deadline)}
        target={campaign.target}
        id={campaign._id}
        smallCover
      ></Card>
    );
  });
  return (
    <div className="sm:flex w-full mx-auto h-fit my-2">{renderedCampaigns}</div>
  );
}

export default CardRow;
