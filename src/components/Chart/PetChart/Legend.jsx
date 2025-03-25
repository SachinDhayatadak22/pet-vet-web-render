import React from "react";

const LegendComponent = () => {
  return (
    <div className="flex items-center space-x-4 mb-4">
      <div className="flex items-center">
        <span className="w-4 h-4 bg-[#172554] rounded-full inline-block mr-2"></span>
        <span>Dog</span>
      </div>
      <div className="flex items-center">
        <span className="w-4 h-4 bg-[#06B6D4] rounded-full inline-block mr-2"></span>
        <span>Cat</span>
      </div>
    </div>
  );
};

export default LegendComponent;
