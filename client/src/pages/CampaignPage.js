import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProgressBar from "../components/ProgressBar";
import Button from "../components/Button";
import Footer from "../components/Footer";
import ImageSlider from "../components/ImageSlider";
import Sidebar from "../components/Sidebar";
import classNames from "classnames";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { addProduct } from "../redux/cartRedux";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

//font-normal text-lg mt-3 max-w-full line-clamp-4

function CampaignPage() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [foundCampaign, setFoundCampaign] = useState({});
  const [foundAuthor, setFoundAuthor] = useState({});
  const [foundReviews, setFoundReviews] = useState([]);
  const [sliderImg, setSliderImg] = useState([]);
  const [prevCampaigns, setPrevCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state) => state.user);
  const location = useLocation();
  const dispatch = useDispatch();

  const token = user.currentUser.accessToken;

  const campaignID = location.pathname.split("/")[2];
  let buttonDisabled = false;

  useEffect(() => {
    const getCampaign = async function () {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/campaigns/${campaignID}`,
          { headers: { token: `Bearer ${token}` } }
        );
        setFoundCampaign(res.data);
        setSliderImg(res.data.img);
        if (foundCampaign && foundReviews && foundAuthor && prevCampaigns) {
          setIsLoading(false);
        }
      } catch (err) {
        console.log("uhoh", err);
      }
    };
    getCampaign();
  }, []);

  if (foundCampaign.availability === "Available") {
    buttonDisabled = false;
  } else {
    buttonDisabled = true;
  }

  useEffect(() => {
    const getUser = async function () {
      if (foundCampaign !== {}) {
        // console.log("in author hook", foundCampaign);
        try {
          const res = await axios.get(
            `http://localhost:3000/api/users/find/${foundCampaign.author}`
          );
          setFoundAuthor(res.data);
          if (foundCampaign && foundReviews && foundAuthor && prevCampaigns) {
            setIsLoading(false);
          }
        } catch (err) {
          console.log("User error", err);
        }
      }
    };
    getUser();
  }, [foundCampaign]);

  useEffect(() => {
    const getPrevCampaigns = async () => {
      if (foundAuthor) {
        const res = await axios.get(
          `http://localhost:3000/api/campaigns/user/${foundAuthor._id}`,
          { headers: { token: `Bearer ${user.currentUser.accessToken}` } }
        );
        setPrevCampaigns(res.data);
        if (foundCampaign && foundReviews && foundAuthor && prevCampaigns) {
          setIsLoading(false);
        }
      }
    };
    getPrevCampaigns();
  }, [foundAuthor]);

  useEffect(() => {
    const getReviews = async function () {
      if (foundCampaign) {
        try {
          const res = await axios.get(
            `http://localhost:3000/api/reviews/campaign/${foundCampaign._id}`,
            { headers: { token: `Bearer ${token}` } }
          );
          setFoundReviews(res.data);
          if (foundCampaign && foundReviews && foundAuthor && prevCampaigns) {
            setIsLoading(false);
          }
        } catch (err) {
          console.log("Reviews Error", err);
        }
      }
    };
    getReviews();
  }, [foundCampaign]);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  let expandedButton;
  if (isExpanded) {
    expandedButton = "Read Less";
  } else {
    expandedButton = "Read More";
  }

  const descClasses = classNames({
    "font-normal": true,
    "text-lg": true,
    "mt-3": true,
    "max-w-full": true,
    "line-clamp-4": !isExpanded,
  });

  const handleBuy = () => {
    dispatch(
      addProduct({ product: foundCampaign, price: foundCampaign.perPrice })
    );
  };

  let content = (
    <div className="w-full h-screen flex">
      <div className="m-auto spinner"></div>
    </div>
  );

  if (!isLoading) {
    content = (
      <div className="w-4xl sm:mt-8">
        <div className="md:flex border-b-2 p-2 mx-3">
          <ImageSlider sliderImg={sliderImg}></ImageSlider>
          <div className="text-left w-5/6 w-full md:w-1/2 h-full sm:mt-20 mx-auto">
            <div className="text-5xl text-gray-700 font-semibold">
              {foundCampaign.title}
            </div>
            <p className={descClasses}>{foundCampaign.desc}</p>
            <div
              className="text-gray-700 font-semibold text-right hover:text-blue-700 cursor-pointer"
              onClick={handleClick}
            >
              {expandedButton}
            </div>
            <Link
              to={`/users/${foundAuthor._id}`}
              className="flex items-center mt-2 hover:bg-gray-100 rounded-lg p-2 cursor-pointer w-fit"
            >
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={foundAuthor.profilePic}
                alt="profile pic"
              ></img>
              <div className="text-xs">
                <p className="text-gray-900 text-lg leading-none text-left line-clamp-1 text-left font-semibold">
                  {foundAuthor.fullname}
                </p>
              </div>
            </Link>
            <ProgressBar
              current={foundCampaign.current}
              goal={foundCampaign.target}
              daysLeft={foundCampaign.deadline}
              largeHeadings
            ></ProgressBar>
            <div className="sm:flex gap-5">
              <div className="font-bold text-2xl max-w-full my-auto">
                Rs.{foundCampaign.perPrice} per assignment
              </div>
              <div className="font-bold max-w-full my-auto">
                {foundCampaign.availability}
              </div>
              <Button bgRed isDisabled={buttonDisabled} handleClick={handleBuy}>
                BUY NOW
              </Button>
            </div>
          </div>
        </div>
        <Sidebar
          foundCampaign={foundCampaign}
          foundAuthor={foundAuthor}
          foundReviews={foundReviews}
          prevCampaigns={prevCampaigns}
        ></Sidebar>
      </div>
    );
  }

  return (
    <div className="w-full h-full text-center">
      <Navbar></Navbar>
      {content}
      <Footer></Footer>
    </div>
  );
}

export default CampaignPage;
