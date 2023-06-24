import classNames from "classnames";
import React, { useEffect, useState } from "react";
import ReviewStars from "./ReviewStars";
import Button from "./Button";
import { AiFillStar } from "react-icons/ai";
import axios from "axios";
import { useSelector } from "react-redux";
import Review from "./Review";

function Reviews({ foundReviews, foundCampaign }) {
  let totalStars = 0;
  const [expandedIndex, setExpandedIndex] = useState(-1);
  const [loadedReviews, setLoadedReviews] = useState(4);
  const [reviewComment, setReviewComment] = useState("");
  const [newRating, setNewRating] = useState(1);
  const [authors, setAuthors] = useState([]);
  const user = useSelector((state) => state.user.currentUser);

  const getAuthor = async (authorID) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/users/find/${authorID}`
      );
      return res.data;
    } catch (err) {
      console.log("User in review error", err);
    }
  };

  useEffect(() => {
    const getAuthors = async () => {
      let tempAuthors = [];

      for (let i = 0; i <= expandedIndex; i++) {
        getAuthor(foundReviews[i].userId)
          .then((res) => {
            tempAuthors[i] = res;
            console.log(tempAuthors[i]);
          })
          .catch((err) => console.log(err));
      }

      console.log(tempAuthors);

      setAuthors(tempAuthors);
    };
    getAuthors();
  }, [foundReviews, expandedIndex]);

  console.log("authors", authors);

  const loadMoreReviews = () => {
    setLoadedReviews(loadedReviews + 4);
  };

  const loadLessReviews = () => {
    setLoadedReviews(4);
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
  if (loadedReviews < foundReviews.length) {
    loadMoreButton = (
      <div
        onClick={loadMoreReviews}
        className="text-gray-700 font-bold hover:bg-gray-100 rounded-lg w-fit p-4 cursor-pointer mx-auto"
      >
        Load More
      </div>
    );
  }

  const renderedReviews = foundReviews.map((review, index) => {
    totalStars += review.rating;
    console.log("set", setExpandedIndex);
    return (
      <Review
        expandedIndex={expandedIndex}
        setExpandedIndex={setExpandedIndex}
        review={review}
        index={index}
      ></Review>
    );
  });

  const submitReview = async () => {
    try {
      const options = {
        method: "POST",
        url: `http://localhost:3000/api/reviews/${foundCampaign._id}`,
        headers: { token: `Bearer ${user.accessToken}` },
        data: {
          user: user,
          review: { comment: reviewComment, rating: newRating },
        },
      };
      const res = await axios.request(options);
      console.log(res.data);
    } catch (err) {
      console.log("uh oh", err);
    }
  };

  return (
    <div className="md:flex">
      <div className="w-full md:w-1/2 p-10">
        <div className="text-left font-bold text-gray-700 text-4xl">
          Leave a Review
        </div>
        <div className="flex text-4xl my-3">
          <ReviewStars
            isClickable={true}
            newRating={newRating}
            setNewRating={setNewRating}
          ></ReviewStars>
        </div>
        <div className="w-full h-[300px] mb-4 border border-gray-200 rounded-lg bg-gray-50">
          <div className="px-4 py-2 bg-white rounded-t-lg h-full">
            <label for="content" className="sr-only">
              Your comment
            </label>
            <textarea
              id="content"
              rows="4"
              className="w-full px-0 h-full text-lg text-gray-900 bg-white border-0 focus:ring-0"
              placeholder="Write a comment..."
              onChange={(event) => {
                setReviewComment(event.target.value);
              }}
            ></textarea>
          </div>
          <div className="px-3 py-2 border-t-lg rounded-lg bg-gray-100">
            <Button bgRed rounded handleClick={submitReview}>
              Post review
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4">
        <div className="font-semibold flex my-2 md:my-0">
          <div className="text-xl">Average Rating</div>
          <AiFillStar className="my-auto mx-2 text-xl"></AiFillStar>
          <div className="text-xl">
            {Math.round((totalStars * 100) / foundReviews.length) / 100}/5
          </div>
          <div className="text-gray-700 my-auto mx-2 text-xl">
            ({foundReviews.length} Ratings)
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
    </div>
  );
}

export default Reviews;
