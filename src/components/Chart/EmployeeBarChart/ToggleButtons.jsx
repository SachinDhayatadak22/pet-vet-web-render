import React from "react";

const ToggleButtons = ({ setTimeframe, timeframe }) => {
  return (
    <div className="flex">
      {["Today", "Week", "Month"].map((item) => (
        <button
          key={item}
          className={`px-3 py-1 font-semibold ${timeframe === item.toLowerCase() ? "border-b-2 border-black" : "text-gray-500"}`}
          onClick={() => setTimeframe(item.toLowerCase())}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtons;
