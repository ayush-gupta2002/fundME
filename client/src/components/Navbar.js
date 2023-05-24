import React, { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import Badge from "@mui/material/Badge";
import { ShoppingCartOutlined } from "@material-ui/icons";
import NavbarLink from "./NavbarLink";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";
function Navbar() {
  const [signLink, setSignLink] = useState(null);
  const [profilePicLink, setProfilePicLink] = useState(null);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
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
          className="text-sm font-semibold bg-red-400 text-white px-3 rounded-lg hover:bg-red-500"
        >
          Log out
        </button>
      );
      setProfilePicLink(user.currentUser._doc.profilePic);
    } else {
      setSignLink(
        <div className="flex">
          <NavbarLink redirect="/register">Register</NavbarLink>
          <NavbarLink redirect="/login">Sign in</NavbarLink>
        </div>
      );
      setProfilePicLink(
        "https://cdn.vectorstock.com/i/1000x1000/77/30/default-avatar-profile-icon-grey-photo-placeholder-vector-17317730.webp"
      );
    }
  }, [user.currentUser]);

  return (
    <div className="sticky bg-white md:top-0 md:z-50 container max-w-full h-12 px-3 py-3 justify-between my-1 align-middle inline block sm:flex">
      <div className="mx-auto flex-auto flex w-1/3 my-2 sm:my-0 sm:mx-0">
        <span className="text-sm my-auto opacity-50">EN</span>
        <div className=" bg-gray-100 flex border-gray-400 align-middle ml-5 px-1 rounded-lg">
          <input className="text-gray-600 text-sm bg-gray-100 outline-none"></input>
          <AiOutlineSearch opacity={0.4} className="my-auto"></AiOutlineSearch>
        </div>
      </div>
      <div className="mx-auto flex-auto w-1/3 font-extrabold text-4xl text-center text-red-500 sm:mx-0">
        fundME
      </div>
      <div className="mx-auto sm:mx-0 block justify-end w-1/3 text-left my-2 sm:my-0 cursor-pointer sm:flex flex-auto">
        <NavbarLink redirect="/">Start Campaign</NavbarLink>
        <NavbarLink redirect="/cart">
          <Badge badgeContent={cart.quantity} color="secondary">
            <ShoppingCartOutlined />
          </Badge>
        </NavbarLink>
        {signLink}
        <img
          className="w-8 h-8 sm:my-auto rounded-full ml-3 border-gray-400 border-2 cursor-pointer"
          src={profilePicLink}
        ></img>
      </div>
    </div>
  );
}

export default Navbar;
