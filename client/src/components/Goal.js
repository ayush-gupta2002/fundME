import classNames from "classnames";
import React, { useState } from "react";

function Goal({ foundCampaign }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const goalClasses = classNames({
    "line-clamp-6": !isExpanded,
    "text-gray-600": true,
    "mb-5": true,
    "text-left": true,
  });

  let expandedButton;

  if (isExpanded) {
    expandedButton = "Read Less";
  } else {
    expandedButton = "Read More";
  }

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="mx-3 sm:w-1/2 bg-gray-100 p-4 sm:mx-auto h-full mt-3 rounded-lg">
      <div className="text-2xl mb-5 font-semibold text-gray-600 text-left">
        My Goal
      </div>
      <p className={goalClasses}>
        {/* My best friend's birthday is around the corner. I want to gift him this
        high end gaming console. He is very fond of video games and I would love
        to be able to fulfill his dream. I know I could have gone for the
        cheaper version of the PS5 or any other gaming console for that matter
        but he really really likes this one and is not able to buy one as his
        parents have just lost big money in gambling.I know I could have gone
        for the cheaper version of the PS5 or any other gaming console for that
        matter but he really really likes this one and is not able to buy one as
        his parents have just lost big money in gambling. My best friend's
        birthday is around the corner. I want to gift him this high end gaming
        console. He is very fond of video games and I would love to be able to
        fulfill his dream. I know I could have gone for the cheaper version of
        the PS5 or any other gaming console for that matter but he really really
        likes this one and is not able to buy one as his parents have just lost
        big money in gambling.I know I could have gone for the cheaper version
        of the PS5 or any other gaming console for that matter but he really
        really likes this one and is not able to buy one as his parents have
        just lost big money in gambling. */}
        {foundCampaign.desc}
      </p>
      <div
        className="font-bold text-gray-700 hover:text-blue-700 cursor-pointer"
        onClick={handleClick}
      >
        {expandedButton}
      </div>
    </div>
  );
}

export default Goal;
