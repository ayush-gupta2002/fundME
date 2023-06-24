import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useLocation } from "react-router-dom";
import CampaignsList from "../components/CampaignsList";

function CategoryPage() {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("date");
  const handleFilters = (event) => {
    const value = event.target.value;
    setFilter({ ...filter, [event.target.name]: value });
  };

  return (
    <div className="max-w-full text-center h-full bg-gray-100">
      <Navbar></Navbar>
      <div className="h-full max-w-7xl mx-auto">
        <div className="text-3xl font-semibold text-gray-700 text-center my-10">
          Assignments
        </div>
        <div className="sm:flex sm:justify-between w-full my-10">
          <div className="sm:flex w-full mx-3">
            <h3 className="font-semibold text-gray-700 text-xl my-auto">
              Search By
            </h3>
            <input
              type="text"
              className="border-black border-2 mx-2 outline-none text-gray-700 font-semibold p-3 sm:my-0 my-2"
              placeholder="Title"
              name="title"
              onChange={handleFilters}
            ></input>
          </div>
          <div className="flex w-full sm:justify-end my-2 sm:my-0 mx-auto justify-center">
            <h3 className="text-xl font-semibold text-gray-700 w-fit my-auto">
              Sort By:
            </h3>
            <div className="relative w-fit lg:max-w-sm my-auto mx-2">
              <select
                className="w-fit p-3 text-black bg-white border border-2 border-black outline-none appearance-non focus:border-indigo-600 cursor-pointer"
                onChange={(event) => {
                  setSort(event.target.value);
                }}
                defaultValue="date"
              >
                <option value="price">Price</option>
                <option value="targetcompletion">Target Completion</option>
                <option value="date">Newest</option>
              </select>
            </div>
          </div>
        </div>
        <CampaignsList cat={cat} filters={filter} sort={sort}></CampaignsList>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default CategoryPage;
