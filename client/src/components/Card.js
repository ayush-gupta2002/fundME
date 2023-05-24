import React from "react";
import CardCover from "./CardCover";
import CardContent from "./CardContent";
import classNames from "classnames";
import axios from "axios";
import { useEffect, useState } from "react";

function Card(props) {
  const [foundAuthor, setFoundAuthor] = useState({});
  const classes = classNames({
    flex: true,
    "sm:block": true,
    "h-fit": true,
    "w-full": true,
    "sm:w-1/4": props.fourthWidth,
    "sm:w-1/2": props.halfWidth,
    "my-4": true,
    "cursor-pointer": true,
    "shadow-lg": true,
    "hover:shadow-xl": true,
    transform: true,
    "hover:scale-105": true,
    transition: true,
    "duration-500": true,
    "mx-auto": true,
    "mx-1": true,
    "sm:mx-4": true,
  });
  const author = props.author;

  async function getAuthor(author) {
    const response = await axios.get(
      `http://localhost:3000/api/users/find/${author}`
    );
    setFoundAuthor(response.data);
  }
  useEffect(() => {
    getAuthor(author);
    // console.log("foundAuthor", foundAuthor);
  }, []);
  let cover;
  if (props.bigCover) {
    cover = <CardCover bigCover cover={props.cover} id={props.id}></CardCover>;
  } else {
    cover = (
      <CardCover smallCover cover={props.cover} id={props.id}></CardCover>
    );
  }

  // "flex sm:block h-fit w-full sm:w-1/4 my-4 cursor-pointer shadow-lg hover:shadow-xl transform hover:scale-105 transition duration-500 mx-auto mx-1 sm:mx-4"
  return (
    <div className={classes}>
      {cover}
      <CardContent
        title={props.title}
        profilePic={foundAuthor.profilePic}
        current={props.current}
        desc={props.desc}
        author={foundAuthor.fullname}
        date={props.date}
        goal={props.goal}
        perPrice={props.perPrice}
        daysLeft={props.daysLeft}
        id={props.id}
      ></CardContent>
    </div>
  );
}

export default Card;
