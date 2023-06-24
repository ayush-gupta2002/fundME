import React, { useState } from "react";
import { SiGmail } from "react-icons/si";
import { AiFillLinkedin, AiFillInstagram } from "react-icons/ai";
import classNames from "classnames";

function WorkDescription({ foundCampaign, foundAuthor }) {
  const [isDescExpanded, setIsDescExpanded] = useState(false);

  let expandedButton;

  if (isDescExpanded) {
    expandedButton = "Read Less";
  } else {
    expandedButton = "Read More";
  }

  const descClasses = classNames({
    "line-clamp-4": !isDescExpanded,
    "text-gray-600": true,
    "mb-3": true,
    "text-left": true,
  });

  const handleClick = () => {
    setIsDescExpanded(!isDescExpanded);
  };

  return (
    <div className="mx-3 w-full sm:w-1/2 bg-gray-100 p-4 sm:mx-auto h-full mt-3 rounded-lg">
      <div className="text-2xl mb-5 font-semibold text-gray-600 text-left">
        My work
      </div>
      <p className={descClasses}>{foundAuthor.workDesc}</p>
      <div
        className="text-gray-700 cursor-pointer hover:text-blue-700 font-bold text-right w-fit mb-3"
        onClick={handleClick}
      >
        {expandedButton}
      </div>
      <div className="text-2xl mb-5 font-semibold text-gray-600 text-left">
        Requirements
      </div>
      <ul className="list-disc text-gray-600 mx-4 my-4 text-left">
        <li>Assignment Questions (if any)</li>
        <li>Writing Style (handwritten or typed)</li>
        <li>Required length of the assignment (in number of pages)</li>
        <li>Topic and level of content (if any)</li>
        <li>Any other suggestions</li>
      </ul>
      <div className="text-2xl mb-5 font-semibold text-gray-600 text-left">
        Connect with me
      </div>
      <div className="mb-5">
        <div className="flex">
          <div className="w-fit">
            <SiGmail
              size={25}
              className="mx-2 opacity-70 hover:opacity-100 cursor-pointer"
            ></SiGmail>
          </div>
          <div className="w-fit">
            <AiFillLinkedin
              size={25}
              className="mx-2 opacity-70 hover:opacity-100 cursor-pointer"
            ></AiFillLinkedin>
          </div>
          <div className="w-fit">
            <AiFillInstagram
              size={25}
              className="mx-2 opacity-70 hover:opacity-100 cursor-pointer"
            ></AiFillInstagram>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WorkDescription;
