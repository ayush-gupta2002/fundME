import React from "react";
import CardDescription from "./CardDescription";
import CardTitle from "./CardTitle";
import CardFooter from "./CardFooter";
import ProgressBar from "./ProgressBar";
import { Link } from "react-router-dom";

function CardContent(props) {
  let perPrice;
  if (props.perPrice) {
    perPrice = (
      <div className="text-gray-700 text-sm mb-1 font-bold text-lg">
        Rs.{props.perPrice} per unit
      </div>
    );
  } else {
    perPrice = <div></div>;
  }
  return (
    <div
      className="
  w-full h-full border-r border-b border-l border-gray-400 border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal overflow-hidden"
    >
      <Link className="w-full h-full" to={`/campaign/${props.id}`}>
        <CardTitle className="h-full" title={props.title}></CardTitle>
      </Link>
      <ProgressBar
        current={props.current}
        goal={props.goal}
        daysLeft={props.daysLeft}
      ></ProgressBar>
      {perPrice}
      <CardDescription className="h-sm" desc={props.desc}></CardDescription>
      <CardFooter
        profilePic={props.profilePic}
        author={props.author}
        date={props.date}
      ></CardFooter>
    </div>
  );
}
export default CardContent;
