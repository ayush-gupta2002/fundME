import React from "react";
import ErrorClipart from "../assets/error.png";

function Error() {
  return (
    <div className="p-6 m-auto flex flex-col">
      <img src={ErrorClipart} alt="clipart" className="h-24 w-24 mx-auto"></img>
      <h1 className="font-semibold text-2xl mx-auto my-4">
        Media could not be loaded
      </h1>
    </div>
  );
}

export default Error;
