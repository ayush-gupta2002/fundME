import axios from "axios";
import React, { useEffect, useState } from "react";
import Card from "./Card";
import { format } from "timeago.js";
import "../loader.css";
import Error from "./Error";

function CardRow() {
  const [topCampaigns, setTopCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/campaigns");
        setTopCampaigns(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsError(true);
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
  let content = <div></div>;
  if (isLoading) {
    content = (
      <div className="p-6 bg-gray-50">
        <div className="m-auto spinner"></div>
      </div>
    );
  } else if (!isLoading && !isError) {
    content = (
      <div className="sm:flex w-full mx-auto h-fit my-2">
        {renderedCampaigns}
      </div>
    );
  } else {
    content = (
      <div className="flex w-full h-full bg-gray-50 my-6">
        <Error></Error>
      </div>
    );
  }
  return <div className="">{content}</div>;
}

export default CardRow;
