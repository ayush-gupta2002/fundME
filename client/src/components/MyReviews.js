import classNames from "classnames";
import React, { useState } from "react";
import { reviewsData } from "../ReviewsData";
import ReviewStars from "./ReviewStars";
import Button from "./Button";
import { AiFillStar } from "react-icons/ai";

function MyReviews() {
  let totalStars = 0;
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [loadedReviews, setLoadedReviews] = useState(4);

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

  const renderedReviews = reviewsData.map((review) => {
    totalStars += review.rating;
    console.log("totalStars", totalStars);
    const isExpanded = review.id === expandedIndex;
    const descriptionClasses = classNames({
      "mb-2": true,
      "text-gray-700": true,
      "text-left": true,
      "line-clamp-4": !isExpanded,
    });

    let expandButton;

    if (review.id === expandedIndex) {
      expandButton = "Read Less";
    } else {
      expandButton = "Read More";
    }

    return (
      <div
        key={review.id}
        className="mx-2 sm:mx-auto bg-gray-100 p-4 rounded-lg max-w-lg my-2 h-fit"
      >
        <div className="flex items-center mb-4 space-x-4">
          <img className="w-10 h-10 rounded-full" src={review.profilePic}></img>
          <div className="space-y-1 font-semibold text-black text-left">
            <p>
              {review.author}
              <time
                datetime="2023-01-23 19:00"
                className="block text-sm text-gray-600"
              >
                {review.joiningDate}
              </time>
            </p>
          </div>
        </div>
        <div>
          <ReviewStars
            rating={review.rating}
            heading={review.heading}
            isExpanded={isExpanded}
          ></ReviewStars>
        </div>
        <div className="mb-5 text-sm text-gray-600 text-left">
          <time datetime="2022-11-23 12:00">{review.reviewDate}</time>
        </div>
        <p className={descriptionClasses}>{review.content}</p>
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
        <div className="text-xl">{totalStars / reviewsData.length}/5</div>
        <div className="text-gray-700 my-auto mx-2 text-xl">
          ({reviewsData.length} Ratings)
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
