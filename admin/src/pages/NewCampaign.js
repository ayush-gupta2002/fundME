import React, { useState } from "react";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import InputField from "../components/InputField";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addCampaign } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 } from "uuid";

function NewCampaign() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currentUser);
  const [inputs, setInputs] = useState({
    availability: "Unavailable",
    categories: "petwalk",
  });
  const [file, setFile] = useState([]);
  const [urls, setUrls] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    setUrls([]);
    console.log(file[0]);
    for (let i = 0; i < file.length; i++) {
      const imageRef = ref(storage, `images/${file[i].name + v4()}`);
      uploadBytes(imageRef, file[i])
        .then((snapshot) => {
          alert(`Image ${file[i].name} has been uploaded`);
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          urls.push(downloadURL);
          console.log(downloadURL);
          setUrls(urls);
        });
    }
  };

  const handleClick = (e) => {
    e.preventDefault();
    const newCampaign = { ...inputs, ["img"]: urls };
    addCampaign(dispatch, newCampaign, user);
    navigate("/campaigns");
  };

  const categories = [
    { value: "petwalk", label: "Pet Walk" },
    { value: "website", label: "Website Development" },
    { value: "assignments", label: "Assignments" },
  ];

  const handleChange = (e) => {
    if (e.target.name === "availability" || e.target.name === "categories") {
      let tempInputs = inputs;
      tempInputs[e.target.name] = e.target.value;
      setInputs(tempInputs);
    } else {
      setInputs((prev) => {
        return { ...prev, [e.target.name]: e.target.value };
      });
    }
  };

  const renderedCategories = categories.map((category) => {
    return <option value={category.value} label={category.label}></option>;
  });

  const renderedImages = urls.map((image) => {
    return <img className="w-20 h-20 rounded-lg" src={image}></img>;
  });

  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-full">
          <h1 className="m-6 font-semibold text-3xl">New Campaign</h1>
          <form className="grid grid-cols-2 m-6">
            <InputField
              label="Title"
              required
              id="title"
              type="text"
              handleChange={handleChange}
            ></InputField>
            <div className="flex flex-col">
              <label className="text-xl text-gray-600 mb-4" htmlFor="desc">
                Description
              </label>
              <textarea
                className="focus:outline-none bg-gray-100 w-2/3 text-lg p-2 rounded-lg text-gray-600"
                id="desc"
                required
                onChange={handleChange}
                name="desc"
              ></textarea>
            </div>
            <InputField
              label="Target (INR)"
              id="target"
              type="number"
              required
              handleChange={handleChange}
            ></InputField>
            <InputField
              label="Last Date"
              id="deadline"
              type="date"
              required
              handleChange={handleChange}
            ></InputField>
            <div className="flex flex-col my-2">
              <label
                htmlFor="availability"
                className="text-xl text-gray-600 mb-4"
              >
                Availability
              </label>
              <select
                className="w-1/3 my-2 bg-gray-100 text-lg p-2 focus:outline-none rounded-lg text-gray-600 cursor-pointer"
                onChange={handleChange}
                id="availability"
                name="availability"
                defaultValue="Unavailable"
              >
                <option value="Available">Available</option>
                <option value="Unavailable">Unavailable</option>
              </select>
            </div>
            <InputField
              type="number"
              id="perPrice"
              label="Price per Unit (INR)"
              required
              handleChange={handleChange}
            ></InputField>
            <div className="flex flex-col my-2">
              <label className="text-xl text-gray-600 mb-4">Category</label>
              <select
                id="categories"
                className="w-1/3 my-2 bg-gray-100 p-2 focus:outline-none rounded-lg text-gray-600 cursor-pointer text-lg"
                onChange={handleChange}
                name="categories"
                defaultValue={categories[0].value}
              >
                {renderedCategories}
              </select>
            </div>
            <div className="flex flex-col my-2">
              <label className="text-xl text-gray-600 mb-2" htmlFor="img">
                Images
              </label>
              <div className="flex">
                <input
                  accept="image/png, image/gif, image/jpeg"
                  multiple
                  type="file"
                  id="img"
                  className="bg-gray-100 p-2 w-1/3 rounded-lg cursor-pointer text-lg text-gray-600 h-fit"
                  onChange={(e) => {
                    setFile(e.target.files);
                    // console.log("target", e.target.files);
                    // console.log("file", file);
                  }}
                ></input>
                <button
                  className="p-2 bg-gray-100 mx-2 font-semibold shadow-lg cursor-pointer hover:bg-gray-200 h-fit"
                  onClick={(e) => {
                    handleUpload(e);
                  }}
                >
                  Upload
                </button>
                <div className="grid grid-cols-4 h-fit gap-2">
                  {renderedImages}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                handleClick(e);
              }}
              className="bg-red-400 text-white font-semibold p-2 w-1/3 mx-auto col-span-2 mt-10"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewCampaign;
