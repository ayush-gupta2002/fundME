import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/apiCalls";
import Button from "../components/Button";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    login(dispatch, { username, password });
  };

  return (
    <div className="w-full h-screen bg-[#f8edeb]">
      <div className="w-full flex">
        <h1 className="mx-auto text-6xl font-bold cursor-pointer text-red-500 mt-10">
          fundME Admin
        </h1>
      </div>
      <div className="flex w-full h-full">
        <div className="m-auto rounded-lg bg-white p-10 flex flex-col w-1/3 h-1/3 gap-4">
          <h3 className="font-semibold text-2xl text-gray-500 text-center">
            Login
          </h3>
          <input
            className="border-2 rounded-lg p-2 mt-5 text-lg focus:outline-none text-gray-500"
            type="text"
            placeholder="username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          ></input>
          <input
            className="border-2 rounded-lg p-2 mt-5 text-lg focus:outline-none text-gray-500"
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
          <Button wide bgRed handleClick={handleLogin}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Login;
