import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Category from "./Category";

function HomeCategories() {
  const [categories, setCategories] = useState([]);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories", {
          headers: { token: `Bearer ${user.currentUser.accessToken}` },
        });
        setCategories(res.data.slice(0, 3));
      } catch (err) {
        console.log(err);
      }
    };
    getCategories();
  }, []);

  const renderedCategories = categories.map((c) => {
    return (
      <Category
        key={c._id}
        cover={c.cover}
        title={c.name}
        cat={c.name}
      ></Category>
    );
  });

  return <>{renderedCategories}</>;
}

export default HomeCategories;
