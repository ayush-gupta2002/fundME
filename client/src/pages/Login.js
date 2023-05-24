import Button from "../components/Button";
import React, { useState } from "react";
import FormInput from "../components/FormInput";
import { AiFillFacebook, AiFillGithub } from "react-icons/ai";
import { SiGmail } from "react-icons/si";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { isFetching, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  console.log(username, password);
  const handleClick = () => {
    login(dispatch, { username, password });
  };
  console.log(error);
  return (
    <div className="text-center">
      <Navbar></Navbar>
      <div className="w-screen h-screen flex bg-gradient-to-r from-teal-100 via-yellow-100 to-orange-300">
        <div className="my-auto p-10 mx-4 sm:mx-auto w-[500px] h-fit bg-white rounded-xl">
          {error && (
            <div className="w-full h-fit p-6 text-center text-red-500 font-semibold text-lg">
              Something went wrong!
            </div>
          )}
          <div className="text-3xl">SIGN IN</div>
          <form className="my-4">
            <div className="sm:flex w-full">
              <FormInput
                placeholder="Email ID or Username"
                handleChange={setUsername}
                type="text"
              ></FormInput>
            </div>
            <div className="sm:flex w-full">
              <FormInput
                placeholder="Password"
                handleChange={setPassword}
                type="password"
              ></FormInput>
            </div>
          </form>

          <Button bgRed wide handleClick={handleClick} isDisabled={isFetching}>
            Log in
          </Button>
          <Link
            className="hover:text-blue-500 cursor-pointer hover:underline my-2 text-gray-600"
            to="/register"
          >
            Don't have an account? Sign up now
          </Link>
          <hr></hr>
          <div className="text-lg text-gray-500 my-3">or log in using</div>
          <div className="flex mt-3">
            <div className="flex mx-auto">
              <div className="w-fit mx-2">
                <AiFillFacebook
                  className="mx-auto cursor-pointer opacity-70 hover:opacity-100"
                  size={30}
                ></AiFillFacebook>
              </div>
              <div className="w-fit mx-2">
                <SiGmail
                  className="mx-auto cursor-pointer opacity-70 hover:opacity-100"
                  size={30}
                ></SiGmail>
              </div>
              <div className="w-fit mx-2">
                <AiFillGithub
                  className="mx-auto cursor-pointer opacity-70 hover:opacity-100"
                  size={30}
                ></AiFillGithub>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
