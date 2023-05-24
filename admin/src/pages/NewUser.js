import React from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";

function NewUser() {
  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-4/5 overflow-scroll">
          <div>
            <h1 className="text-3xl font-semibold m-4">New User</h1>
            <form className="flex flex-wrap w-full m-10">
              <div className="w-1/2 flex flex-col my-4">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Username
                </label>
                <input
                  placeholder="john"
                  type="text"
                  className="tetx-lg rounded-lg p-2 border-2 w-1/2"
                ></input>
              </div>
              <div className="w-1/2 flex flex-col my-4">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Fullname
                </label>
                <input
                  placeholder="John Smith"
                  type="text"
                  className="tetx-lg rounded-lg p-2 border-2 w-1/2"
                ></input>
              </div>
              <div className="w-1/2 flex flex-col my-4">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Email
                </label>
                <input
                  placeholder="john@gmail.com"
                  type="email"
                  className="tetx-lg rounded-lg p-2 border-2 w-1/2"
                ></input>
              </div>
              <div className="w-1/2 flex flex-col my-4">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Password
                </label>
                <input
                  type="password"
                  className="tetx-lg rounded-lg p-2 border-2 w-1/2"
                ></input>
              </div>
              <div className="w-1/2 flex flex-col my-4">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Phone
                </label>
                <input
                  placeholder="1234567890"
                  type="text"
                  className="tetx-lg rounded-lg p-2 border-2 w-1/2"
                ></input>
              </div>
              <div className="w-1/2 flex flex-col my-4">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Address
                </label>
                <input
                  placeholder="Delhi"
                  type="text"
                  className="tetx-lg rounded-lg p-2 border-2 w-1/2"
                ></input>
              </div>
              <div className="my-4 w-1/2">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Gender
                </label>
                <div>
                  <input
                    name="gender"
                    id="male"
                    value="male"
                    type="radio"
                  ></input>
                  <label for="male" className="mx-4 text-gray-500">
                    Male
                  </label>
                  <input
                    name="gender"
                    id="female"
                    value="female"
                    type="radio"
                  ></input>
                  <label for="female" className="mx-4 text-gray-500">
                    Female
                  </label>
                  <input
                    name="gender"
                    id="other"
                    value="other"
                    type="radio"
                  ></input>
                  <label for="other" className="mx-4 text-gray-500">
                    Other
                  </label>
                </div>
              </div>
              <div className="w-1/2 flex flex-col my-4">
                <label className="text-lg font-semibold text-gray-400 mb-4">
                  Active
                </label>
                <select
                  name="active"
                  id="active"
                  className="tetx-lg rounded-lg p-2 border-2 w-1/2"
                >
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <button className="bg-teal-500 rounded-lg text-white py-2 px-16 font-semibold mt-6 ">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewUser;
