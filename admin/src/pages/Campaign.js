import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Chart from "../components/Chart";
import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import ntdmn from "number-to-date-month-name";
import InputField from "../components/InputField";
import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate } from "react-router-dom";
import { storage } from "../firebase";
import { updateCampaign } from "../redux/apiCalls";

function Campaign() {
  const location = useLocation();
  const campaignID = location.pathname.split("/")[2];
  const campaign = useSelector((state) =>
    state.campaign.campaigns.find((campaign) => campaign._id === campaignID)
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [campaignStats, setCampaignStats] = useState([]);
  const [file, setFile] = useState([]);
  const [inputs, setInputs] = useState({
    availability: campaign.availability,
    categories: campaign.categories,
  });
  const [urls, setUrls] = useState([]);

  const handleUpload = (e) => {
    e.preventDefault();
    setUrls([]);
    for (let i = 0; i < file.length; i++) {
      const imageRef = ref(storage, `images/${file[i].name + v4()}`);
      uploadBytes(imageRef, file[i])
        .then((snapshot) => {
          alert(`Image ${file[i].name} has been uploaded`);
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadURL) => {
          urls.push(downloadURL);
          setUrls(urls);
        });
    }
  };

  console.log("urls", urls);

  const handleClick = (e) => {
    e.preventDefault();
    const newCampaign = {
      ...inputs,
      ["_id"]: campaign._id,
      ["current"]: campaign.current,
      ["img"]: urls,
    };
    updateCampaign(dispatch, newCampaign, user);
    navigate("/campaigns");
  };
  const user = useSelector((state) => state.user.currentUser);
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

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/campaigns/stats/${campaignID}`,
          { headers: { token: `Bearer ${user.accessToken}` } }
        );
        let tempStats = [];
        for (let i = 0; i < res.data.length; i++) {
          tempStats[i] = {
            total: res.data[i].total,
            month: ntdmn.toMonth(res.data[i]._id),
          };
        }
        setCampaignStats(tempStats);
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, []);

  const renderedImages = urls.map((image) => {
    return <img className="w-20 h-20 rounded-lg" src={image}></img>;
  });

  const renderedCampaignImages = campaign.img.map((image) => {
    return <img className="w-20 h-20 rounded-lg" src={image}></img>;
  });

  console.log(inputs);

  return (
    <div>
      <Topbar></Topbar>
      <div className="flex gap-4 w-full justify-between">
        <Sidebar></Sidebar>
        <div className="w-4/5 overflow-scroll">
          <div className="p-6">
            <div className="flex justify-between">
              <h1 className="font-semibold text-3xl">Campaign</h1>
              <Link to="/newcampaign">
                <button className="rounded-lg p-2 bg-teal-500 text-white">
                  Create
                </button>
              </Link>
            </div>
            <div className="flex justify-between">
              <div className="w-1/2">
                <Chart
                  data={campaignStats}
                  dataKey="total"
                  title="Number of Unique Contributions"
                  XAxis="month"
                ></Chart>
              </div>
              <div className="w-1/2 h-fit shadow-lg p-8 m-8">
                <div>
                  <span className="font-semibold my-auto ml-4">
                    {campaign.title}
                  </span>
                  <div className="grid grid-cols-5 gap-2">
                    {renderedCampaignImages}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex">
                    <span>id: </span>
                    <span className="text-gray-500 ml-2">{campaign._id}</span>
                  </div>
                  <div className="flex">
                    <span>Availability: </span>
                    <span className="text-gray-500 ml-2">
                      {campaign.availability}
                    </span>
                  </div>
                  <div className="flex">
                    <span>Price: </span>
                    <span className="text-gray-500 ml-2">
                      INR {campaign.perPrice}
                    </span>
                  </div>
                  <div className="flex">
                    <span>Completion %: </span>
                    <span className="text-gray-500 ml-2">
                      {(campaign.current * 100) / campaign.target}
                    </span>
                  </div>
                  <div className="flex">
                    <span>Deadline : </span>
                    <span className="text-gray-500 ml-2">
                      {campaign.deadline}
                    </span>
                  </div>
                  <div className="flex">
                    <span>Created On : </span>
                    <span className="text-gray-500 ml-2">
                      {campaign.createdAt}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="shadow-lg w-full p-4">
              <form className="grid grid-cols-2 m-6">
                <InputField
                  label="Title"
                  required
                  id="title"
                  type="text"
                  handleChange={handleChange}
                  placeholder={campaign.title}
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
                    placeholder={campaign.desc}
                  ></textarea>
                </div>
                <InputField
                  label="Target (INR)"
                  id="target"
                  type="number"
                  required
                  handleChange={handleChange}
                  placeholder={campaign.target}
                ></InputField>
                <InputField
                  label="Last Date"
                  id="deadline"
                  type="date"
                  required
                  handleChange={handleChange}
                  placeholder={campaign.deadline}
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
                    defaultValue={campaign.availability}
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
                  placeholder={campaign.perPrice}
                ></InputField>
                <div className="flex flex-col my-2">
                  <label className="text-xl text-gray-600 mb-4">Category</label>
                  <select
                    id="categories"
                    className="w-1/3 my-2 bg-gray-100 p-2 focus:outline-none rounded-lg text-gray-600 cursor-pointer text-lg"
                    onChange={handleChange}
                    name="categories"
                    defaultValue={campaign.categories}
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
                      onChange={(e) => setFile(e.target.files)}
                    ></input>
                    <button
                      className="p-2 bg-gray-100 mx-2 font-semibold shadow-lg cursor-pointer hover:bg-gray-200 h-fit"
                      onClick={(e) => {
                        handleUpload(e);
                      }}
                    >
                      Upload
                    </button>
                    <div className="h-fit grid grid-cols-4 gap-2">
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
      </div>
    </div>
  );
}

export default Campaign;
