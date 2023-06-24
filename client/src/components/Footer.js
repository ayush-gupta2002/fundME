import React from "react";
import { IoIosMailOpen } from "react-icons/io";
import Terms from "./Terms";
import Button from "./Button";
import { AiFillLinkedin, AiFillGithub } from "react-icons/ai";
import { BsGlobe } from "react-icons/bs";

function Footer() {
  return (
    <div className="bg-gray-200 h-fit sm:flex mt-10 p-10">
      <div className="h-full w-1/2 my-5 sm:my-auto mx-auto sm:mx-0">
        <div className="text-gray-700 font-bold text-xl">
          Find the developer of this website here.
        </div>
        <div className="flex mt-3">
          <div className="flex mx-auto">
            <a
              className="w-fit mx-2"
              href="https://www.linkedin.com/in/ayushgupta2002/"
            >
              <AiFillLinkedin
                className="mx-auto cursor-pointer opacity-70 hover:opacity-100"
                size={40}
              ></AiFillLinkedin>
            </a>
            <a className="w-fit mx-2" href="https://github.com/ayush-gupta2002">
              <AiFillGithub
                className="mx-auto cursor-pointer opacity-70 hover:opacity-100"
                size={40}
              ></AiFillGithub>
            </a>
            <a
              className="w-fit mx-2"
              href="https://jazzy-melomakarona-63ff08.netlify.app"
            >
              <BsGlobe
                className="mx-auto cursor-pointer opacity-70 hover:opacity-100"
                size={40}
              ></BsGlobe>
            </a>
          </div>
        </div>
      </div>
      <div className="w-[300px] mx-auto">
        <IoIosMailOpen size={30} className="m-auto"></IoIosMailOpen>
        <div className="text-gray-800 font-semibold mt-1">
          The fundME Newsletter
        </div>
        <div className="text-sm text-gray-800 font-light">
          Discover new and clever campaigns in the fundME newsletter
        </div>
        <input
          className="bg-white outline-none align-middle my-4 w-full text-sm p-2"
          type="text"
          placeholder="Your email address"
        ></input>
        <Terms></Terms>
        <div className="mx-auto text-center">
          <Button center bgRed wide>
            SIGN ME UP
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Footer;
