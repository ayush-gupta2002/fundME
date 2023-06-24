import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { format } from "timeago.js";
import Button from "../components/Button";
import Card from "../components/Card";
import { useSelector } from "react-redux";

function PublicProfile() {
  const location = useLocation();
  const [user, setUser] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const currentUser = useSelector((state) => state.user.currentUser);

  const userID = location.pathname.split("/")[2];

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/find/${userID}`
        );
        console.log(res.data);
        setUser(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, []);

  let userKeys = Object.keys(user);

  const renderedPersonalInfo = userKeys.map((key) => {
    if (
      key !== "_id" &&
      key !== "profilePic" &&
      key !== "createdAt" &&
      key !== "campaigns"
    )
      return (
        <div className="flex flex-row gap-4">
          <p className="font-semibold text-gray-600 text-xl">{key}</p>
          <p className="font-semibold text-xl">{user[key]}</p>
        </div>
      );
    else if (key === "createdAt") {
      return (
        <div className="flex flex-row gap-4">
          <p className="font-semibold text-gray-600 text-xl">{key}</p>
          <p className="font-semibold text-xl">{format(user[key])}</p>
        </div>
      );
    }
  });
  let renderedCampaigns = <></>;

  const getCampaigns = async () => {
    let newCampaigns = [];
    for (let i = 0; i < user.campaigns.length; i++) {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/campaigns/${user.campaigns[i]}`,
          { headers: { token: `Bearer ${currentUser.accessToken}` } }
        );
        newCampaigns.push(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    setCampaigns(newCampaigns);
    renderedCampaigns = campaigns.map(async (camp) => {
      return (
        <Card
          title={camp.title}
          author={camp.author}
          current={camp.current}
          desc={camp.desc}
          date={camp.createdAt}
          goal={camp.target}
          perPrice={camp.perPrice}
          daysLeft={format(camp.deadline)}
          id={camp._id}
          key={camp._id}
        ></Card>
      );
    });
  };

  return (
    <div className="max-w-full text-center h-full">
      <Navbar></Navbar>
      <div className="h-full max-w-7xl mx-auto">
        <div>
          <img
            src={user.profilePic}
            className="rounded-full border-2 border-gray-600 w-24 h-24 mx-auto"
          ></img>
        </div>
        <div className="flex flex-row">
          <div className="flex flex-col gap-6 w-1/2 bg-gray-100 p-6 my-4 rounded-lg">
            {renderedPersonalInfo}
          </div>
          <div className="w-1/2 p-4">
            <Button bgRed wide handleClick={getCampaigns}>
              View all campaigns by {user.fullname}
            </Button>
            <div className="flex flex-col">{renderedCampaigns}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PublicProfile;
