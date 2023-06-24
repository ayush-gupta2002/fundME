import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import MyReviews from "../components/MyReviews";

function Reviews() {
  const user = useSelector((state) => state.user.currentUser);
  const campaigns = useSelector((state) => state.campaign.campaigns);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const res = await axios.post(
          "http://localhost:3000/api/reviews/author",
          campaigns,
          {
            headers: { token: `Bearer ${user.accessToken}` },
          }
        );
        setReviews(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReviews();
  }, []);

  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-4/5 overflow-scroll bg-gray-50">
          <MyReviews reviews={reviews}></MyReviews>
        </div>
      </div>
    </div>
  );
}

export default Reviews;
