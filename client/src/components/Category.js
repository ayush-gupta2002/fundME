import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { Link } from "react-router-dom";

function Category({ cover, title, cat }) {
  return (
    <div className="mt-3 mb-2 flex sm:block">
      <Link to={`/campaigns/${cat}`} className="w-full">
        <div
          className="flex h-[300px]  w-full rounded-lg bg-cover bg-center bg-fixed opacity-50 cursor-pointer transform hover:scale-105 transition duration-500 hover:opacity-80"
          style={{
            backgroundImage: `url(${cover})`,
          }}
        >
          <div className="m-auto h-fit w-full text-4xl font-semibold ">
            {title}
          </div>
        </div>
      </Link>
      <div className="my-auto sm:mt-2 sm:my-0 w-2/6 sm:w-full mx-2 sm:mx-0">
        <Link to={`/campaigns/${cat}`}>
          <div className="flex sm:mt-2">
            <div className="font-semibold text-xs sm:text-left cursor-pointer my-2 sm:my-auto">
              SEE THE COLLECTION
            </div>
            <MdArrowForwardIos
              className="my-auto mx-1 cursor-pointer"
              size={11}
            ></MdArrowForwardIos>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Category;
