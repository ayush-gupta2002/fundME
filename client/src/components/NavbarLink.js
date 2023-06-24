import React from "react";
import { Link } from "react-router-dom";

function NavbarLink(props) {
  return (
    <Link to={props.redirect} className="w-fit h-fit my-auto">
      <div className="text-lg mx-2 font-semibold sm:my-auto my-3">
        {props.children}
      </div>
    </Link>
  );
}

export default NavbarLink;
