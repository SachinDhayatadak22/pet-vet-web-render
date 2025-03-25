import React from "react";

const ToggleButtons = ({ setTimeframe, timeframe }) => {
  return (
    <div className="flex justify-end mb-4 bg-bgSecondary p-[5px] rounded-[8px]">
      {["Week", "Month", "Year"].map((item) => (
        <button
          key={item}
          className={`px-3 py-1 mx-1 rounded-[8px] text-[10px] font-medium ${timeframe === item.toLowerCase() ? "bg-bgTertiary text-white" : ""}`}
          onClick={() => setTimeframe(item.toLowerCase())}
        >
          {item}
        </button>
      ))}
    </div>
  );
};

export default ToggleButtons;
