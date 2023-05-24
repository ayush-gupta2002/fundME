import React, { useEffect, useState } from "react";
import ReviewStars from "./ReviewStars";
import classNames from "classnames";
import axios from "axios";

function Review({ review, index, expandedIndex, setExpandedIndex }) {
  console.log(setExpandedIndex);
  console.log("index", index);
  console.log("expandedindex", expandedIndex);
  const [isExpanded, setIsExpanded] = useState(false);

  const [author, setAuthor] = useState({});
  useEffect(() => {
    const getAuthor = async (author) => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/users/find/${review.userId}`
        );
        setAuthor(res.data);
      } catch (err) {
        console.log("Review error", err);
      }
    };
    getAuthor(author);
  }, []);
  let expandButton = "Read More";
  if (isExpanded) {
    expandButton = "Read Less";
  }
  const descriptionClasses = classNames({
    "mb-2": true,
    "text-gray-700": true,
    "text-left": true,
    "line-clamp-1": !isExpanded,
  });
  return (
    <div
      key={review.id}
      className="mx-2 sm:mx-auto bg-gray-100 p-4 rounded-lg w-full my-2 h-fit"
    >
      <div className="flex items-center mb-4 space-x-4">
        <img className="w-10 h-10 rounded-full" src={author.profilePic}></img>
        <div className="space-y-1 font-semibold text-black text-left">
          {author.fullname}
          <p>
            <time className="block text-sm text-gray-600">
              {author.createdAt}
            </time>
          </p>
        </div>
      </div>
      <div>
        <ReviewStars
          newRating={review.rating}
          heading={review.heading}
          isExpanded={isExpanded}
        ></ReviewStars>
      </div>
      <div className="mb-5 text-sm text-gray-600 text-left">
        <time datetime="2022-11-23 12:00">{review.createdAt}</time>
      </div>
      <p className={descriptionClasses}>{review.comment}</p>
      <div
        onClick={() => {
          setExpandedIndex(index);
          setIsExpanded(!isExpanded);
        }}
        className="w-fit text-xs font-bold text-gray-600 hover:text-blue-600 hover:underline decoration-solid cursor-pointer"
      >
        {expandButton}
      </div>
    </div>
  );
}

export default Review;
