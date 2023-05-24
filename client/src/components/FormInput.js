import { PinDropSharp } from "@material-ui/icons";
import React from "react";

function FormInput(props) {
  return (
    <input
      placeholder={props.placeholder}
      onChange={(event) => {
        props.handleChange(event.target.value);
      }}
      className="bg-gray-100 font-gray-700 p-3 rounded-xl my-2 mx-2 w-full outline-none text-lg"
      type={props.type}
    ></input>
  );
}

export default FormInput;
