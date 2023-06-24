import React from "react";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Slider from "../components/Slider";
import CardRow from "../components/CardRow";
import Button from "../components/Button";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import "../loader.css";
import HomeCategories from "../components/HomeCategories";

function Home() {
  return (
    <div className="container max-w-full h-full text-center">
      <Announcement></Announcement>
      <Navbar></Navbar>
      <Slider></Slider>
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <div className="text-3xl mb-2">Find it first on fundMe.</div>
          <div className="text-lg text-gray-700 font-light mb-2">
            fundMe is where people get their work done and help others achieve
            their dreams. Register before it becomes too mainstream.
          </div>
          <div className="flex mx-auto text-center">
            <div className="mx-auto sm:flex">
              <Button bgRed>SIGN UP NOW</Button>
              <Button bgWhite>LEARN MORE</Button>
            </div>
          </div>
        </div>
        {/* <SearchBar></SearchBar> */}
        <div className="text-gray-600 text-2xl text-center">
          People of Delhi Technology University
        </div>
        <CardRow></CardRow>
        <div className="mt-10">
          <div className="text-gray-600 text-2xl text-center">
            Our Top Collections
          </div>
          <HomeCategories></HomeCategories>
        </div>
      </div>
      <Link
        to="/categories"
        className="font-semibold text-xl text-gray-600 hover:bg-gray-100 p-4 rounded-lg cursor-pointer"
      >
        View all collections
      </Link>
      <Footer></Footer>
    </div>
  );
}

export default Home;
