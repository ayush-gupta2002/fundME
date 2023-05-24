import React from "react";
import { MdPermIdentity, MdPublish } from "react-icons/md";
import { FaBirthdayCake } from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { GiEarthAfricaEurope } from "react-icons/gi";
import { Link } from "react-router-dom";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

function User() {
  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-4/5 overflow-scroll">
          <div className="p-4">
            <div className="flex justify-between">
              <h1 className="font-semibold text-3xl">Edit User</h1>
              <Link to="/newuser">
                <button className="rounded-lg p-2 bg-teal-500 text-white">
                  Create
                </button>
              </Link>
            </div>
            <div className="flex mt-4">
              <div className="shadow-lg p-4 w-1/3">
                <div className="flex">
                  <img
                    src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=1600&q=60"
                    className="rounded-full w-8 h-8 my-auto"
                  ></img>
                  <div className="flex flex-col my-auto ml-2">
                    <span className="font-semibold">Anna Becker</span>
                    <span className="text-gray-600">Software Engineer</span>
                  </div>
                </div>
                <div className="mt-4">
                  <span className="font-semibold text-gray-500">
                    Account Details
                  </span>
                  <div className="flex my-2">
                    <MdPermIdentity className="my-auto mr-2"></MdPermIdentity>
                    <span>annabeck99</span>
                  </div>
                  <div className="flex my-2">
                    <FaBirthdayCake className="my-auto mr-2"></FaBirthdayCake>
                    <span>10.12.1999</span>
                  </div>
                  <span className="font-semibold text-gray-500">
                    Contact Details
                  </span>
                  <div className="flex my-2">
                    <AiOutlinePhone className="my-auto mr-2"></AiOutlinePhone>
                    <span>+911234567890</span>
                  </div>
                  <div className="flex my-2">
                    <AiOutlineMail className="my-auto mr-2"></AiOutlineMail>
                    <span>annabeck99@gmail.com</span>
                  </div>
                  <div className="flex my-2">
                    <GiEarthAfricaEurope className="my-auto mr-2"></GiEarthAfricaEurope>
                    <span>Delhi, India</span>
                  </div>
                </div>
              </div>
              <div className="shadow-lg p-4 w-2/3 ml-2">
                <span className="text-2xl font-semibold">Edit</span>
                <form className="flex mt-4 justify-between">
                  <div className="w-1/2">
                    <div className="flex flex-col my-2">
                      <label className="mr-2 mb-2 text-lg">Username</label>
                      <input
                        type="text"
                        placeholder="annabeck99"
                        className="border-b-2 border-gray-300"
                      ></input>
                    </div>
                    <div className="flex flex-col my-2">
                      <label className="mr-2 mb-2 text-lg">Full Name</label>
                      <input
                        type="text"
                        placeholder="Anna Becker"
                        className="border-b-2 border-gray-300"
                      ></input>
                    </div>
                    <div className="flex flex-col my-2">
                      <label className="mr-2 mb-2 text-lg">Email</label>
                      <input
                        type="text"
                        placeholder="annabeck99@gmail.com"
                        className="border-b-2 border-gray-300"
                      ></input>
                    </div>
                    <div className="flex flex-col my-2">
                      <label className="mr-2 mb-2 text-lg">Phone</label>
                      <input
                        type="text"
                        placeholder="1234567890"
                        className="border-b-2 border-gray-300"
                      ></input>
                    </div>
                    <div className="flex flex-col my-2">
                      <label className="mr-2 mb-2 text-lg">Address</label>
                      <input
                        type="text"
                        placeholder="Delhi"
                        className="border-b-2 border-gray-300"
                      ></input>
                    </div>
                  </div>
                  <div className="justify-between flex flex-col">
                    <div className="flex gap-4">
                      <img
                        src="https://images.unsplash.com/photo-1664575602554-2087b04935a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8d29tYW58ZW58MHx8MHx8&auto=format&fit=crop&w=1600&q=60"
                        className="rounded-lg w-20 h-20"
                      ></img>
                      <label htmlFor="file" className="my-auto mr-4 text-2xl">
                        <MdPublish className="cursor-pointer"></MdPublish>
                      </label>
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                      ></input>
                    </div>
                    <button className="p-2 rounded-lg bg-teal-500 text-white">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default User;
