import React from "react";

function FormInput(props) {
  let handleChange = () => {};
  if (props.handleChange) {
    handleChange = props.handleChange;
  }

  return (
    <input
      placeholder={props.placeholder}
      onChange={(event) => {
        handleChange(event.target.value);
      }}
      name={props.name}
      id={props.name}
      className="bg-gray-100 font-gray-700 p-3 rounded-xl my-2 mx-2 w-full outline-none text-lg"
      type={props.type}
      required={props.required}
    ></input>
  );
}

export default FormInput;
