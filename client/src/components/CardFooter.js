import React from "react";

function CardFooter({ profilePic, author, date }) {
  return (
    <div className="flex items-center mt-2 hover:bg-gray-100 rounded-lg">
      <img
        className="w-6 h-6 rounded-full mr-4"
        src={profilePic}
        alt="profile pic"
      ></img>
      <div className="text-xs">
        <p className="text-gray-900 leading-none text-left font-semibold">
          {author}
        </p>
        <p className="text-gray-500 text-left">{date}</p>
      </div>
    </div>
  );
}

export default CardFooter;
