import React, { useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { AiFillEye, AiFillEdit } from "react-icons/ai";
import ViewProfile from "../components/ViewProfile";
import EditProfile from "../components/EditProfile";

function Profile() {
  const [visibleContent, setVisibleContent] = useState("view-profile");

  let content = <ViewProfile></ViewProfile>;

  if (visibleContent == "view-profile") {
    content = <ViewProfile></ViewProfile>;
  } else if (visibleContent == "edit-profile") {
    content = <EditProfile></EditProfile>;
  }

  const handleClick = (newContent) => {
    setVisibleContent(newContent);
  };

  return (
    <div className="w-full h-full text-center">
      <Navbar></Navbar>
      <div className="w-full bg-gray-700 p-3 flex">
        <div
          className="flex text-white text-lg p-3 w-fit hover:bg-gray-600 cursor-pointer rounded-xl"
          onClick={() => {
            handleClick("view-profile");
          }}
        >
          <AiFillEye className="my-auto mx-2"></AiFillEye>
          <p>View Profile</p>
        </div>
        <div
          className="flex text-white text-lg p-3 w-fit hover:bg-gray-600 cursor-pointer rounded-xl"
          onClick={() => {
            handleClick("edit-profile");
          }}
        >
          <AiFillEdit className="my-auto mx-2"></AiFillEdit>
          <p>Edit Profile</p>
        </div>
      </div>
      {content}
      <Footer></Footer>
    </div>
  );
}

export default Profile;
