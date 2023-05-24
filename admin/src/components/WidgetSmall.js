import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiFillEye } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function WidgetSmall(props) {
  const newCustomers = props.customers.map((customer) => {
    return (
      <li className="flex my-2 justify-between">
        <img
          src={customer.customer.profilePic}
          className="w-10 h-10 rounded-full mr-2"
        ></img>
        <div className="block flex flex-col my-auto text-center">
          <span className="font-semibold">{customer.customer.fullname}</span>
          <span className="font-light">{customer.campaign.title}</span>
        </div>
        <Link to={`http://localhost:4000/campaign/${customer.campaign._id}`}>
          <button className="flex ml-6 my-auto rounded-xl bg-gray-200 p-2 text-gray-600 hover:bg-gray-300">
            <AiFillEye className="my-auto mr-2"></AiFillEye>
            Display
          </button>
        </Link>
      </li>
    );
  });
  return (
    <div className="shadow-lg p-6 w-1/3">
      <span className="font-semibold text-2xl">New Contributors</span>
      <ul>{newCustomers}</ul>
    </div>
  );
}

export default WidgetSmall;
