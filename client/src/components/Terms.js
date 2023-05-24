import React from "react";

function Terms() {
  return (
    <div className="flex items-center my-4">
      <input
        id="terms-checkbox"
        type="checkbox"
        value=""
        className="w-4 h-4 text-black bg-white border-black rounded focus:ring-black cursor-pointer"
      ></input>
      <label
        for="terms-checkbox"
        className="ml-2 text-sm font-medium text-gray-900"
      >
        I agree with the{" "}
        <b className="hover:underline decoration-solid cursor-pointer">
          terms and conditions{" "}
        </b>
        and have read and understand the{" "}
        <b className="hover:underline decoration-solid cursor-pointer">
          Privacy Policy
        </b>
        .
      </label>
    </div>
  );
}

export default Terms;
