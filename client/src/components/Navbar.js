import React, { useContext, useEffect, useState } from "react";
import Badge from "@mui/material/Badge";
import { ShoppingCartOutlined } from "@material-ui/icons";
import NavbarLink from "./NavbarLink";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/apiCalls";
import { useNavigate } from "react-router-dom";
import { FlashContext } from "../App";
import { FaTimes, FaBars } from "react-icons/fa";
import classNames from "classnames";
import { Link } from "react-router-dom";

function Navbar() {
  const [signLink, setSignLink] = useState(null);
  const [profilePicLink, setProfilePicLink] = useState(null);
  const cart = useSelector((state) => state.cart);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { setFlash } = useContext(FlashContext);
  const [nav, setNav] = useState(false);

  const handleLogout = () => {
    logout(dispatch, user, cart);
    navigate("/login");
    setFlash("Logged out");
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setNav(false);
    }
  }, []);

  useEffect(() => {
    if (user.currentUser) {
      setSignLink(
        <button
          onClick={() => {
            handleLogout();
          }}
          className="text-sm font-semibold bg-red-400 text-white px-3 rounded-lg hover:bg-red-500 ml-2 my-auto h-full"
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
        "https://firebasestorage.googleapis.com/v0/b/fundme-6ee6d.appspot.com/o/images%2Fplaceholder.jpeg?alt=media&token=4193d35b-f3a9-4e3c-99be-0b83df9126d9"
      );
    }
  }, [user.currentUser]);

  const sidebarClasses = classNames({
    hidden: !nav,
    "flex flex-col": nav,
    "h-screen": true,
    "z-10": true,
    "bg-gray-50": true,
    "w-screen": true,
    "p-6": true,
    "rounded-lg": true,
  });

  const sidebarLinks = [
    { label: "Home", redirect: "/" },
    { label: "Admin", redirect: "/" },
    { label: "Collections", redirect: "/categories" },
    { label: "Campaigns", redirect: "/" },
  ];

  const renderedSidebarLinks = sidebarLinks.map((s) => {
    return (
      <Link
        className="font-semibold text-2xl text-gray-500"
        to={s.redirect}
        onClick={() => {
          setNav(!nav);
        }}
      >
        {s.label}
      </Link>
    );
  });

  function Sidebar() {
    return (
      <div className={sidebarClasses}>
        <div className="w-full flex justify-end">
          <FaTimes
            size={30}
            className="cursor-pointer z-10 text-red-500 hover:scale-105 duration-200"
            onClick={() => {
              setNav(!nav);
            }}
          ></FaTimes>
        </div>
        <div className="w-full flex flex-col justify-center">
          <ul className="mx-auto">
            <img
              onClick={() => {
                navigate(`/user/${user.currentUser._doc._id}`);
              }}
              className="w-28 h-28 md:w-8 md:h-8 rounded-full ml-0 md:ml-3 border-gray-400 border-2 cursor-pointer mb-8 md:mb-0"
              src={profilePicLink}
              alt="profile pic"
            ></img>
            <div className="flex flex-row items-center gap-2">
              <NavbarLink redirect="/cart">
                <Badge badgeContent={cart.quantity} color="secondary">
                  <ShoppingCartOutlined />
                </Badge>
              </NavbarLink>
              <div>{signLink}</div>
            </div>
            <div className="mt-6 flex flex-col gap-8">
              {renderedSidebarLinks}
            </div>
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="md:sticky bg-white top-0 z-50 container max-w-full h-12 px-3  md:py-3 justify-between md:my-1 align-middle inline block sm:flex">
      {/* <div className="mx-auto hidden sm:flex sm:flex-auto flex w-1/3 my-2 sm:my-0 sm:mx-0">
        <span className="text-sm my-auto opacity-50">EN</span>
        <div className=" bg-gray-100 flex border-gray-400 align-middle ml-5 px-1 rounded-lg">
          <input className="text-gray-600 text-sm bg-gray-100 outline-none"></input>
          <AiOutlineSearch opacity={0.4} className="my-auto"></AiOutlineSearch>
        </div>
      </div> */}
      <div className="flex items-center w-full px-4 font-extrabold text-4xl justify-between text-red-500">
        <div>fundME</div>
        <div
          className="md:hidden w-fit"
          onClick={() => {
            setNav(!nav);
          }}
        >
          {!nav && (
            <FaBars
              size={30}
              className="cursor-pointer z-10 text-red-500 hover:scale-105 duration-200 w-fit"
            ></FaBars>
          )}
        </div>
      </div>
      <div className="mx-auto sm:mx-0 block justify-end w-full text-left my-2 sm:my-0 cursor-pointer hidden md:flex flex-auto">
        <NavbarLink redirect="/">Home</NavbarLink>
        <NavbarLink redirect="/">Admin</NavbarLink>
        <NavbarLink redirect="/categories">Collections</NavbarLink>
        <NavbarLink redirect="/campaigns">Campaigns</NavbarLink>

        <NavbarLink redirect="/cart">
          <Badge badgeContent={cart.quantity} color="secondary">
            <ShoppingCartOutlined />
          </Badge>
        </NavbarLink>
        {signLink}
        <img
          onClick={() => {
            navigate(`/user/${user.currentUser._doc._id}`);
          }}
          className="w-8 h-8 sm:my-auto rounded-full ml-3 border-gray-400 border-2 cursor-pointer"
          src={profilePicLink}
          alt="profile"
        ></img>
      </div>

      <Sidebar></Sidebar>
    </div>
  );
}

export default Navbar;
