import React, { useState } from "react";
import MyCampaigns from "../components/MyCampaigns";
import MyPurchases from "../components/MyPurchases";
import MyReviews from "../components/MyReviews";

function ViewProfile() {
  const [visibleContent, setVisibleContent] = useState("my-campaigns");

  let content = <MyCampaigns></MyCampaigns>;

  if (visibleContent == "my-campaigns") {
    content = <MyCampaigns></MyCampaigns>;
  } else if (visibleContent == "my-purchases") {
    content = <MyPurchases></MyPurchases>;
  } else if (visibleContent == "my-reviews") {
    content = <MyReviews></MyReviews>;
  }
  return (
    <div>
      <div className="flex p-5">
        <img
          src="https://media.istockphoto.com/id/1384357176/photo/portrait-of-a-handsome-mexican-man.jpg?s=612x612&w=is&k=20&c=7f7HD-K-Y4fF6HvEwEt7qcU_WCm_cpm3qXx1vRkJH_I="
          className="rounded-full w-20 h-20 my-auto ml-5 mx-4"
        ></img>
        <div className="text-gray-700 font-semibold text-4xl text-left my-auto">
          Ayush Gupta
        </div>
      </div>
      <hr></hr>
      <div className="flex">
        <div className="w-1/2">
          <div className="flex w-full p-4">
            <div
              className="w-1/3 text-xl font-semibold hover:bg-gray-100 p-2 rounded-lg cursor-pointer max-w-fit m-2 hover:text-red-400"
              onClick={() => {
                setVisibleContent("my-campaigns");
              }}
            >
              <h1>My Campaigns</h1>
            </div>
            <div
              className="w-1/3 text-xl font-semibold hover:bg-gray-100 p-2 rounded-lg cursor-pointer max-w-fit m-2 hover:text-red-400"
              onClick={() => {
                setVisibleContent("my-purchases");
              }}
            >
              <h1>My Purchases</h1>
            </div>
            <div
              className="w-1/3 text-xl font-semibold hover:bg-gray-100 p-2 rounded-lg cursor-pointer max-w-fit m-2 hover:text-red-400"
              onClick={() => {
                setVisibleContent("my-reviews");
              }}
            >
              <h1>My Reviews</h1>
            </div>
          </div>
          {content}
        </div>
        <div className="w-1/2 p-10 text-left">
          <h1 className="text-gray-700 font-semibold text-2xl">Profile</h1>
          <div className="text-lg my-2">
            <b>First Name</b> Ayush
          </div>
          <div className="text-lg my-2">
            <b>Last Name</b> Gupta
          </div>
          <div className="text-lg my-2">
            <b>Email ID</b> ayush.gupta2002@gmail.com
          </div>
          <div className="text-lg my-2">
            <b>Phone Number</b> 8076132946
          </div>
          <div className="text-lg my-2">
            <b>Facebook</b> ayush.gupta171102@gmail.com
          </div>
          <div className="text-lg my-2">
            <b>Github</b> ayushgupta2002
          </div>
          <div className="text-lg my-2">
            <b>LinkedIn</b> ayushgupta2002
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
