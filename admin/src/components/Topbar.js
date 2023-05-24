import React, { useEffect, useState } from "react";
import { AiFillNotification } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import { GrLanguage } from "react-icons/gr";
import { FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/apiCalls";

function Topbar() {
  const user = useSelector((state) => state.user);
  const [signLink, setSignLink] = useState(null);
  const [profilePicLink, setProfilePicLink] = useState(null);
  const dispatch = useDispatch();

  const handleLogout = () => {
    logout(dispatch, user);
  };

  useEffect(() => {
    if (user.currentUser) {
      setSignLink(
        <button
          onClick={() => {
            handleLogout();
          }}
          className="text-sm font-semibold bg-red-400 text-white px-3 rounded-lg hover:bg-red-500 my-auto"
        >
          Logout
        </button>
      );
      setProfilePicLink(user.currentUser._doc.profilePic);
    } else {
      setSignLink(<div className="text-sm font-semibold">Login</div>);
      setProfilePicLink(
        "https://cdn.vectorstock.com/i/1000x1000/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.webp"
      );
    }
  }, [user.currentUser]);
  return (
    <div className="w-full h-[50px] bg-white sticky top-0 z-50 mb-5">
      <div className="justify-between flex h-full px-[20px] w-full py-4">
        <div className="text-left">
          <span className="font-bold text-2xl cursor-pointer text-red-500 my-auto">
            fundME Admin
          </span>
        </div>
        <div className="text-right flex gap-4">
          <Badge badgeContent={4} color="primary">
            <AiFillNotification className="cursor-pointer my-auto text-xl"></AiFillNotification>
          </Badge>
          <FiSettings className="cursor-pointer text-xl"></FiSettings>
          <GrLanguage className="cursor-pointer text-xl"></GrLanguage>
          {signLink}
          <img
            className="w-8 h-8 rounded-full border-2 my-auto"
            src={profilePicLink}
          ></img>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
