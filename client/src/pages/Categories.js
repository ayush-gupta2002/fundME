import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useSelector } from "react-redux";
import Category from "../components/Category";
import Footer from "../components/Footer";
import Error from "../components/Error";

function Categories() {
  const user = useSelector((state) => state.user);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories", {
          headers: { token: `Bearer ${user.currentUser.accessToken}` },
        });
        setCategories(res.data);
        setIsLoading(false);
        setIsError(false);
      } catch (err) {
        setIsError(true);
      }
    };
    getCategories();
  }, []);

  const renderedCategories = categories.map((c) => {
    return <Category cover={c.cover} title={c.name} cat={c.name}></Category>;
  });

  let content = <div></div>;
  if (isLoading) {
    content = (
      <div className="w-full h-full flex">
        <div className="spinner m-auto"></div>
      </div>
    );
  } else if (!isLoading && !isError) {
    content = (
      <div className="h-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 px-4">
        {renderedCategories}
      </div>
    );
  } else {
    content = (
      <div className="w-full h-full flex">
        <Error></Error>
      </div>
    );
  }

  return (
    <div className="max-w-full text-center h-full bg-gray-100">
      <Navbar></Navbar>
      <div className="text-3xl font-semibold text-gray-700 text-center my-10 border-b-2">
        Collections
      </div>
      {content}
      <Footer></Footer>
    </div>
  );
}

export default Categories;
