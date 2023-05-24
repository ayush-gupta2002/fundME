import Button from "../components/Button";
import React from "react";
import FormInput from "../components/FormInput";
import Terms from "../components/Terms";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div className="text-center">
      <Navbar></Navbar>
      <div className="w-screen h-screen flex bg-gradient-to-r from-teal-100 via-yellow-100 to-orange-300">
        <div className="my-auto p-10 mx-4 sm:mx-auto sm:w-fit bg-white rounded-xl">
          <div className="text-3xl">CREATE AN ACCOUNT</div>
          <form className="my-4">
            <div className="sm:flex w-full">
              <FormInput placeholder="First Name"></FormInput>
              <FormInput placeholder="Last Name"></FormInput>
            </div>
            <div className="sm:flex w-full">
              <FormInput placeholder="Username"></FormInput>
            </div>
            <div className="sm:flex w-full">
              <FormInput placeholder="Email"></FormInput>
            </div>
            <div className="sm:flex w-full">
              <FormInput placeholder="Password"></FormInput>
              <FormInput placeholder="Confirm Password"></FormInput>
            </div>
          </form>
          <div className="my-5">
            <Terms></Terms>
          </div>

          <Button bgRed wide>
            Sign Up
          </Button>
          <Link to="/login">
            <div className="mt-5 text-md">
              Already have an account?{" "}
              <span className="font-semibold hover:underline decoration-solid cursor-pointer">
                Sign in
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Register;
