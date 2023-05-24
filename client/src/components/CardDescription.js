import React from "react";

function CardDescription({ desc }) {
  return (
    <div className="h-[100px] overflow-hidden">
      <p className="text-gray-700 text-xs text-left font-serif line-clamp-6">
        {desc}
      </p>
    </div>
  );
}
export default CardDescription;
