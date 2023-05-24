import React from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Button from "./Button";
import Dropdown from "./Dropdown";

function SearchBar() {
  return (
    <div className="items-center mx-4 sm:mx-auto max-w-md max-h-fit sm:flex sm:items-center p-2 space-x-6 bg-gray-100 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 sm:max-h-fit sm:max-w-fit mb-9">
      <div className="max-w-full mx-auto sm:mx-0 flex bg-white p-2 w-72 space-x-4 rounded-lg align-middle">
        <div className="align-middle my-auto">
          <AiOutlineSearch opacity={0.4}></AiOutlineSearch>
        </div>
        <input
          className="bg-white outline-none align-middle my-auto w-full"
          type="text"
          placeholder="Search Term"
        ></input>
      </div>
      <Dropdown></Dropdown>
      <div className="max-w-full">
        <Button primary rounded>
          Search
        </Button>
      </div>
    </div>
  );
}

export default SearchBar;
