import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function Order() {
  const location = useLocation();
  const orderID = location.pathname.split("/")[2];
  const user = useSelector((state) => state.user);
  const [order, setOrder] = useState({});
  const [campaigns, setCampaigns] = useState([]);
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get(
        `http://localhost:3000/api/orders/${orderID}`,
        { headers: { token: `Bearer ${user.currentUser.accessToken}` } }
      );
      console.log(res.data);
      setOrder(res.data);
    };
    getOrder();
  }, []);

  useEffect(() => {
    const getCampaigns = async () => {
      if (order) {
        for (let i = 0; i < order.campaignId.length; i++) {
          const res = await axios.get(
            `http://localhost:3000/api/campaigns/${order.campaignId[i]}`,
            { headers: { token: `Bearer ${user.currentUser.accessToken}` } }
          );
          const newCampaigns = campaigns;
          newCampaigns.push(res.data);
          setCampaigns(newCampaigns);
        }
      }
    };
    getCampaigns();
  }, [order]);

  let renderedCampaigns;

  if (campaigns) {
    renderedCampaigns = campaigns.map((camp, index) => {
      console.log(camp);
      return (
        <div
          className="bg-white p-4 rounded-lg shadow-md hover:scale-105 cursor-pointer duration-500"
          onClick={() => {
            navigate(`/campaign/${camp._id}`);
          }}
          key={index}
        >
          <img
            className="w-full h-40 rounded-md"
            src={camp.img[0]}
            alt="campaign cover"
          ></img>
          <p className="my-2 font-semibold text-lg line-clamp-1">
            {camp.title}
          </p>
          <p className="my-2 font-semibold text-lg line-clamp-1">
            Rs.{camp.perPrice}
          </p>
        </div>
      );
    });
  }

  return (
    <div className="w-full h-screen text-center">
      <Navbar></Navbar>
      <div className="w-full h-full flex">
        <div className="bg-gray-200 p-6 mx-auto sm:m-auto rounded-md w-full">
          <div className="flex gap-2">
            <p className="font-semibold text-gray-600 text-xl">Order ID</p>
            <p className="font-bold text-black text-xl">{orderID}</p>
          </div>
          <div className="flex gap-2 my-2">
            <p className="font-semibold text-gray-600 text-xl">Payment ID</p>
            <p className="font-bold text-black text-xl">
              {order.stripePaymentId}
            </p>
          </div>
          <div className="flex gap-2 my-2">
            <p className="font-semibold text-gray-600 text-xl">Date</p>
            <p className="font-bold text-black text-xl">{order.createdAt}</p>
          </div>
          <div className="flex gap-2 my-2">
            <p className="font-semibold text-gray-600 text-xl">
              Amount (in Rs.)
            </p>
            <p className="font-bold text-black text-xl">
              {Math.floor(order.amount)}
            </p>
          </div>
          <Button
            bgRed
            center
            handleClick={() => {
              setVisible(!visible);
            }}
          >
            View Campaigns
          </Button>
          {visible && (
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 sm:min-w-full mx-auto w-2/3">
              {renderedCampaigns}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Order;
