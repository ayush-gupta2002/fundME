import React, { useState } from "react";
import MyPurchases from "../components/MyPurchases";
import MyReviews from "../components/MyReviews";
import { useSelector } from "react-redux";

function ViewProfile({ orders, reviews }) {
  const [visibleContent, setVisibleContent] = useState("my-campaigns");
  const user = useSelector((state) => state.user);

  let content = <MyPurchases purchases={orders}></MyPurchases>;

  if (visibleContent === "my-purchases") {
    content = <MyPurchases purchases={orders}></MyPurchases>;
  } else if (visibleContent === "my-reviews") {
    content = <MyReviews reviews={reviews}></MyReviews>;
  }
  return (
    <div>
      <div className="flex p-5">
        <img
          alt="profile pic"
          src={user.currentUser._doc.profilePic[0]}
          className="rounded-full w-20 h-20 my-auto ml-5 mx-4"
        ></img>
        <div className="text-gray-700 font-semibold text-4xl text-left my-auto">
          {user.currentUser._doc.fullname}
        </div>
      </div>
      <hr></hr>
      <div className="flex">
        <div className="w-1/2">
          <div className="flex w-full p-4">
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
            <b>Name</b> {user.currentUser._doc.fullname}
          </div>
          <div className="text-lg my-2">
            <b>Email ID</b> {user.currentUser._doc.email}
          </div>
          <div className="text-lg my-2">
            <b>Username</b> {user.currentUser._doc.username}
          </div>
          <div className="text-lg my-2">
            <b>Account Created</b> {user.currentUser._doc.createdAt}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewProfile;
