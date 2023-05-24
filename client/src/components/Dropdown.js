import React from "react";
import { useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { DropdownOptions } from "../DropdownOptions";
import Panel from "./Panel";

function Dropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  let content = "Search By";
  if (value) {
    content = value;
  }

  const renderedOptions = DropdownOptions.map((option) => {
    return (
      <div
        className="dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-gray-500 hover:bg-gray-100"
        style={{ cursor: "pointer" }}
        onClick={() => {
          onChange(option.title);
          setIsOpen(!isOpen);
        }}
        key={option.value}
      >
        {option.title}
      </div>
    );
  });
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  let media = undefined;
  if (isOpen) {
    media = <Panel>{renderedOptions}</Panel>;
  }

  return (
    <div>
      <div className="flex rounded-lg text-gray-500 font-semibold cursor-pointer my-auto max-w-full">
        <span
          className="my-auto"
          onClick={() => {
            toggleMenu();
          }}
        >
          {content}
        </span>
        <RiArrowDropDownLine
          onClick={() => {
            toggleMenu();
          }}
          className="h-6 w-6 my-auto"
        ></RiArrowDropDownLine>
      </div>
      {media}
    </div>
  );
}

export default Dropdown;
