import Button from "../components/Button";
import React, { useContext, useState } from "react";
import FormInput from "../components/FormInput";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FlashContext } from "../App";

function Register() {
  const [file, setFile] = useState({});
  const [url, setUrl] = useState(
    "https://firebasestorage.googleapis.com/v0/b/fundme-6ee6d.appspot.com/o/images%2Fplaceholder.jpeg?alt=media&token=4193d35b-f3a9-4e3c-99be-0b83df9126d9"
  );
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { setFlash } = useContext(FlashContext);

  const handleUpload = (e) => {
    console.log("in handle upload", file);
    e.preventDefault();
    const imageRef = ref(storage, `images/${file.name + v4()}`);
    uploadBytes(imageRef, file)
      .then((snapshot) => {
        alert(`Image ${file.name} has been uploaded`);
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        console.log(downloadURL);
        setUrl(downloadURL);
      });
  };

  const handleSubmit = async (e) => {
    let userInfo = {};
    for (let i = 2; i <= 5; i++) {
      userInfo[e.target[i].name] = e.target[i].value;
    }
    userInfo.profilePic = url;
    console.log(userInfo);

    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        userInfo
      );
      console.log(res);
      if (res.data.name) {
        setError(res.data.message);
      } else if (res.data._id) {
        navigate("/login");
        setFlash("Account created successfully");
      }
    } catch (err) {
      console.log(err);
    }
  };

  let errorContent = <div></div>;
  if (error) {
    errorContent = <p className="text-red-500 font-semibold my-2">{error}</p>;
  }

  console.log("eror", error);

  return (
    <div className="text-center">
      <Navbar></Navbar>
      <div className="w-screen h-screen flex bg-gradient-to-r from-teal-100 via-yellow-100 to-orange-300">
        <div className="my-auto p-10 mx-4 sm:mx-auto sm:w-fit bg-white rounded-xl">
          <div className="text-3xl">CREATE AN ACCOUNT</div>
          {errorContent}
          <form
            className="my-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e);
            }}
          >
            <div className="w-full flex">
              <div className="flex flex-col mx-auto md:flex-row my-2 gap-4 md:gap-0">
                <input
                  accept="image/png, image/gif, image/jpeg"
                  multiple
                  type="file"
                  id="img"
                  name="img"
                  className="bg-gray-100 p-2 rounded-lg cursor-pointer text-lg text-gray-600 h-fit my-auto mx-auto md:mx-0 w-full"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    console.log(e.target.files[0]);
                  }}
                ></input>
                <button
                  onClick={(e) => {
                    handleUpload(e);
                  }}
                  className="p-2 bg-gray-100 mx-2 font-semibold shadow-lg cursor-pointer hover:bg-gray-200 h-fit my-auto"
                >
                  Upload
                </button>
                <img
                  alt="profile pic placeholder"
                  src={url}
                  className="w-16 h-16 rounded-full ml-3 border-gray-400 border-2 my-auto mx-auto md:mx-0"
                ></img>
              </div>
            </div>
            <div className="sm:flex w-full">
              <FormInput
                placeholder="Full Name"
                name="fullname"
                required
                type="text"
              ></FormInput>
            </div>
            <div className="sm:flex w-full">
              <FormInput
                placeholder="Username"
                name="username"
                required
                type="text"
              ></FormInput>
            </div>
            <div className="sm:flex w-full">
              <FormInput
                placeholder="Email"
                name="email"
                required
                type="email"
              ></FormInput>
            </div>
            <div className="sm:flex w-full">
              <FormInput
                placeholder="Password"
                name="password"
                type="password"
                required
              ></FormInput>
            </div>
            <Button bgRed wide>
              Sign Up
            </Button>
          </form>

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
