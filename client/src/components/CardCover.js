import React from "react";
import classNames from "classnames";
import { Link } from "react-router-dom";

function CardCover(props) {
  const classes = classNames({
    "h-full": true,
    "sm:h-[150px]": props.smallCover,
    "sm:h-[200px]": props.bigCover,
    "w-full": true,
    "rounded-sm": true,
    "bg-cover": true,
    "bg-center": true,
  });
  return (
    <Link className="h-full w-full" to={`/campaign/${props.id}`}>
      <div
        className={classes}
        style={{ backgroundImage: `url(${props.cover})` }}
      ></div>
    </Link>
  );
}

export default CardCover;
