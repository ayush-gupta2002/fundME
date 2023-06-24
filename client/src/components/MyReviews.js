import classNames from "classnames";
import React, { useState } from "react";
import { reviewsData } from "../ReviewsData";
import ReviewStars from "./ReviewStars";
import { AiFillStar } from "react-icons/ai";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function MyReviews({ reviews }) {
  let totalStars = 0;
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [loadedReviews, setLoadedReviews] = useState(4);
  const user = useSelector((state) => state.user);

  const loadMoreReviews = () => {
    setLoadedReviews(loadedReviews + 4);
  };

  const loadLessReviews = () => {
    setLoadedReviews(4);
  };

  const handleClick = (index) => {
    if (index === expandedIndex) {
      setExpandedIndex(-1);
    } else {
      setExpandedIndex(index);
    }
  };

  let loadLessButton;
  if (loadedReviews > 4) {
    loadLessButton = (
      <div
        onClick={loadLessReviews}
        className="text-gray-700 font-bold hover:bg-gray-100 rounded-lg w-fit p-4 cursor-pointer mx-auto"
      >
        Load Less
      </div>
    );
  }
  let loadMoreButton;
  if (loadedReviews < reviewsData.length) {
    loadMoreButton = (
      <div
        onClick={loadMoreReviews}
        className="text-gray-700 font-bold hover:bg-gray-100 rounded-lg w-fit p-4 cursor-pointer mx-auto"
      >
        Load More
      </div>
    );
  }

  const renderedReviews = reviews.map((review) => {
    totalStars += review.rating;
    const isExpanded = review.id === expandedIndex;
    const descriptionClasses = classNames({
      "mb-2": true,
      "text-gray-700": true,
      "text-left": true,
      "line-clamp-1": !isExpanded,
      "font-semibold": true,
    });

    let expandButton;

    if (review.id === expandedIndex) {
      expandButton = "Read Less";
    } else {
      expandButton = "Read More";
    }

    return (
      <div
        key={review._id}
        className="mx-2 sm:mx-auto bg-gray-100 p-4 rounded-lg w-full my-2 h-fit"
      >
        <div className="flex items-center mb-4 space-x-4">
          <img
            className="w-10 h-10 rounded-full"
            src={user.currentUser._doc.profilePic[0]}
            alt="profile pic"
          ></img>
          <div className="space-y-1 font-semibold text-black text-left">
            <p>
              {user.currentUser._doc.fullname}
              <time className="block text-sm text-gray-600">
                {user.currentUser._doc.createdAt}
              </time>
            </p>
          </div>
        </div>
        <div>
          <ReviewStars
            newRating={review.rating}
            isExpanded={isExpanded}
          ></ReviewStars>
        </div>
        <div className="mb-2 text-sm text-gray-600 text-left flex flex-col">
          <time>{review.createdAt}</time>
          <Link
            to={`/campaign/${review.campaignId}`}
            className="text-md text-gray-600 text-left hover:underline"
          >
            View Campaign
          </Link>
        </div>
        <p className={descriptionClasses}>{review.comment}</p>
        <div
          onClick={() => {
            handleClick(review.id);
          }}
          className="w-fit text-xs font-bold text-gray-600 hover:text-blue-600 hover:underline decoration-solid cursor-pointer"
        >
          {expandButton}
        </div>
      </div>
    );
  });

  return (
    <div className="w-full p-4">
      <div className="font-semibold flex my-2 md:my-0">
        <div className="text-xl">Average Rating</div>
        <AiFillStar className="my-auto mx-2 text-xl"></AiFillStar>
        <div className="text-xl">{totalStars / reviews.length}/5</div>
        <div className="text-gray-700 my-auto mx-2 text-xl">
          ({reviews.length} Ratings)
        </div>
      </div>
      <div className="sm:grid sm:grid-cols-2 sm:gap-4">
        {renderedReviews.slice(0, loadedReviews)}
      </div>
      <div className="flex">
        {loadMoreButton}
        {loadLessButton}
      </div>
    </div>
  );
}

export default MyReviews;
