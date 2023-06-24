import React, { useState, useEffect } from "react";
import Chart from "../components/Chart";
import FeaturedInfo from "../components/FeaturedInfo";
import WidgetLarge from "../components/WidgetLarge";
import WidgetSmall from "../components/WidgetSmall";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";
import axios from "axios";
import ntdmn from "number-to-date-month-name";

function Home() {
  const user = useSelector((state) => state.user.currentUser);
  const [customers, setCustomers] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [monthlytransactions, setMonthlyTransactions] = useState([]);

  useEffect(() => {
    const getCustomers = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/orders/newcustomers",
        { headers: { token: `Bearer ${user.accessToken}` } }
      );
      setCustomers(res.data);
    };
    getCustomers();
  }, []);

  useEffect(() => {
    const getChartData = async () => {
      const res = await axios.get("http://localhost:3000/api/orders/income", {
        headers: { token: `Bearer ${user.accessToken}` },
      });
      console.log(user.accessToken);
      let tempChartData = [];
      console.log(res.data);
      for (let i = 0; i < res.data.length; i++) {
        tempChartData.push({
          total: res.data[i].total,
          month: ntdmn.toMonth(res.data[i]._id),
        });
      }
      setChartData(tempChartData);
    };
    getChartData();
  }, []);

  useEffect(() => {
    const getMonthlyTransactions = async () => {
      const res = await axios.get(
        "http://localhost:3000/api/orders/monthlytransactions",
        { headers: { token: `Bearer ${user.accessToken}` } }
      );
      setMonthlyTransactions(res.data);
    };
    getMonthlyTransactions();
  }, []);

  // console.log("customers", customers);
  console.log("chart data", chartData);
  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-4/5 overflow-scroll">
          <div className="w-full h-screen">
            <FeaturedInfo
              monthlyTransactions={monthlytransactions}
              monthlyRevenue={chartData}
            ></FeaturedInfo>
            <Chart
              data={chartData}
              dataKey="total"
              grid
              title="Sales Analytics"
              XAxis="month"
            ></Chart>
            <div className="flex w-full justify-between">
              <WidgetSmall customers={customers.slice(0, 4)}></WidgetSmall>
              <WidgetLarge transactions={customers.slice(0, 4)}></WidgetLarge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
