import React from "react";

function InputField(props) {
  return (
    <div className="flex flex-col my-2">
      <label className="text-xl text-gray-600 mb-4" htmlFor={props.id}>
        {props.label}
      </label>
      <input
        className="bg-gray-100 text-lg w-2/3 p-2 focus:outline-none rounded-lg text-gray-600"
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        required={props.required}
        onChange={props.handleChange}
        name={props.id}
      ></input>
    </div>
  );
}

export default InputField;
