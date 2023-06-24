import React, { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AiFillEye, AiFillEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import ViewProfile from "../components/ViewProfile";
import EditProfile from "../components/EditProfile";
import axios from "axios";

function Profile() {
  const [visibleContent, setVisibleContent] = useState("view-profile");
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      const res = await axios.get(
        `
      http://localhost:3000/api/reviews/user/${user.currentUser._doc._id}`,
        { headers: { token: `Bearer ${user.currentUser.accessToken}` } }
      );
      setReviews(res.data);
    };

    const getOrders = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/orders/userorders/${user.currentUser._doc._id}`,
        { headers: { token: `Bearer ${user.currentUser.accessToken}` } }
      );
      setOrders(res.data);
    };
    getOrders();
    getReviews();
  }, []);

  let content = <ViewProfile orders={orders} reviews={reviews}></ViewProfile>;

  if (visibleContent === "view-profile") {
    content = <ViewProfile orders={orders} reviews={reviews}></ViewProfile>;
  } else if (visibleContent === "edit-profile") {
    content = <EditProfile></EditProfile>;
  }

  const handleClick = (newContent) => {
    setVisibleContent(newContent);
  };

  return (
    <div className="w-full h-full text-center">
      <Navbar></Navbar>
      <div className="w-full bg-gray-700 p-3 flex">
        <div
          className="flex text-white text-lg p-3 w-fit hover:bg-gray-600 cursor-pointer rounded-xl"
          onClick={() => {
            handleClick("view-profile");
          }}
        >
          <AiFillEye className="my-auto mx-2"></AiFillEye>
          <p>View Profile</p>
        </div>
        <div
          className="flex text-white text-lg p-3 w-fit hover:bg-gray-600 cursor-pointer rounded-xl"
          onClick={() => {
            handleClick("edit-profile");
          }}
        >
          <AiFillEdit className="my-auto mx-2"></AiFillEdit>
          <p>Edit Profile</p>
        </div>
      </div>
      {content}
      <Footer></Footer>
    </div>
  );
}

export default Profile;
