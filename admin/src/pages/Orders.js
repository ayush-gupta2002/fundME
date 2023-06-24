import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { useSelector } from "react-redux";
import axios from "axios";

function Orders() {
  const user = useSelector((state) => state.user.currentUser);
  const campaigns = useSelector((state) => state.campaign.campaigns);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      for (let i = 0; i < campaigns.length; i++) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/orders/campaignorders/${campaigns[i]._id}`,
            { headers: { token: `Bearer ${user.accessToken}` } }
          );
          let newOrders = [...res.data, ...orders];
          setOrders(newOrders);
        } catch (err) {
          console.log(err);
        }
      }
    };
    getOrders();
  }, []);

  console.log(orders);

  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-4/5 overflow-scroll">
          <div>{orders.length}</div>
        </div>
      </div>
    </div>
  );
}

export default Orders;
