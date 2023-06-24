import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

function star({ isFilled }) {
  let visibleStar;
  if (isFilled) {
    visibleStar = <AiFillStar></AiFillStar>;
  } else {
    visibleStar = <AiOutlineStar></AiOutlineStar>;
  }

  return <div>{visibleStar}</div>;
}

export default star;
