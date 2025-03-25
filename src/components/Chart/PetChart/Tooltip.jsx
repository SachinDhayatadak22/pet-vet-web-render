import React from "react";

const CustomTooltip = ({ active, payload }) => {
  // console.log(active, payload); Note: remove console logs before commiting the code
  if (active && payload && payload.length) {
    return (
      <div className="p-2 rounded-[9px]">
        <p className="m-0 p-[12px] text-black text-[12px] bg-[#30d5c899]">{payload[0].dataKey} {payload[0].value}</p>
        <p className="m-0 p-[12px] text-black text-[12px] bg-[#30d5c899]">{payload[1].dataKey} {payload[1].value}</p>
      </div>
    );
  }
  return null;
};

export default CustomTooltip;
