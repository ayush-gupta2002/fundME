import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { useSelector } from "react-redux";
import { useState } from "react";
import Card from "../components/Card";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import Error from "../components/Error";

function AllCampaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const user = useSelector((state) => state.user);
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState("date");
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const handleFilters = (event) => {
    const value = event.target.value;
    setFilter({ ...filter, [event.target.name]: value });
  };

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/campaigns", {
          headers: { token: `Bearer ${user.currentUser.accessToken}` },
        });
        setCampaigns(res.data);
        setFilteredCampaigns(res.data);
        if (categories && campaigns) {
          setIsLoading(false);
        }
      } catch (err) {
        setIsError(true);
      }
    };
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories", {
          headers: { token: `Bearer ${user.currentUser.accessToken}` },
        });
        setCategories(res.data.slice(0, 7));
        if (categories && campaigns) {
          setIsLoading(false);
        }
      } catch (err) {
        setIsError(true);
      }
    };
    getCampaigns();
    getCategories();
  }, []);

  console.log(categories);

  useEffect(() => {
    let filteredCampaignsUpdated = [];
    let counter = 0;

    if (filter.title) {
      for (let i = 0; i < campaigns.length; i++) {
        if (
          campaigns[i].title.toUpperCase().includes(filter.title.toUpperCase())
        ) {
          filteredCampaignsUpdated[counter] = campaigns[i];
          counter++;
        }
      }
      setFilteredCampaigns(filteredCampaignsUpdated);
    }
  }, [filter.title]);

  useEffect(() => {
    if (sort === "price") {
      setFilteredCampaigns(
        [...filteredCampaigns].sort((a, b) => {
          return a.perPrice - b.perPrice;
        })
      );
    } else if (sort === "date") {
      setFilteredCampaigns(
        [...filteredCampaigns].sort((a, b) => {
          return a.createdAt - b.createdAt;
        })
      );
    } else {
      setFilteredCampaigns(
        [...filteredCampaigns].sort((a, b) => {
          return a.current / a.target - b.current / b.target;
        })
      );
    }
  }, [sort]);

  const renderedCampaigns = filteredCampaigns.map((c) => {
    return (
      <Card
        cover={c.img[0]}
        title={c.title}
        author={c.author}
        date={c.createdAt}
        goal={c.target}
        perPrice={c.perPrice}
        daysLeft={format(c.deadline)}
        bigCover
        key={c._id}
        id={c._id}
        current={c.current}
      ></Card>
    );
  });

  const renderedLinks = categories.map((c) => {
    return (
      <Link
        className="font-semibold p-4 bg-blue-50 m-2 shadow-lg text-lg hover:bg-blue-100"
        to={`/campaigns/${c.name}`}
      >
        {c.name}
      </Link>
    );
  });

  let content;

  if (isLoading && !isError) {
    content = (
      <div className="w-full h-full flex">
        <div className="spinner m-auto"></div>
      </div>
    );
  } else if (!isLoading && !isError) {
    content = (
      <>
        <div className="grid md:grid-cols-4 grid-cols-2">{renderedLinks}</div>
        <Link
          to="/categories"
          className="mx-auto font-semibold text-xl bg-blue-50 p-2 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-blue-100"
        >
          View all categories
        </Link>
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
        <div className="sm:grid sm:grid-cols-3 sm:gap-4 mx-auto w-full">
          {renderedCampaigns}
        </div>
      </>
    );
  } else {
    content = <Error></Error>;
  }

  return (
    <div className="max-w-full text-center h-full bg-gray-100">
      <Navbar></Navbar>
      <div className="h-full max-w-7xl mx-auto">
        <div className="text-3xl font-semibold text-gray-700 text-center my-10 border-b-2">
          All Campaigns
        </div>
        {content}
      </div>
      <Footer></Footer>
    </div>
  );
}

export default AllCampaigns;
