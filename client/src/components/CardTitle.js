import React from "react";

function CardTitle({ title }) {
  return (
    <div className="h-full text-gray-900 font-semibold text-md mb-2 text-left hover:underline decoration-solid line-clamp-1">
      {title}
    </div>
  );
}

export default CardTitle;
