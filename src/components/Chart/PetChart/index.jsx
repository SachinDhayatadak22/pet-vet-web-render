import React, { useState } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import CustomTooltip from "./Tooltip.jsx";
import LegendComponent from "./Legend.jsx";
import ToggleButtons from "./ToggleButtons.jsx";

// Data for different timeframes
const dataSets = {
  week: [
    { name: "Sun", dog: 800, cat: 500 },
    { name: "Mon", dog: 850, cat: 550 },
    { name: "Tue", dog: 900, cat: 600 },
    { name: "Wed", dog: 1600, cat: 700 },
    { name: "Thu", dog: 1300, cat: 750 },
    { name: "Fri", dog: 1200, cat: 650 },
    { name: "Sat", dog: 1400, cat: 500 },
  ],
  month: Array.from({ length: 30 }, (_, i) => ({
    name: `Day ${i + 1}`,
    dog: Math.floor(Math.random() * 2000),
    cat: Math.floor(Math.random() * 1000),
  })),
  year: Array.from({ length: 12 }, (_, i) => ({
    name: new Date(0, i).toLocaleString("default", { month: "short" }),
    dog: Math.floor(Math.random() * 2000),
    cat: Math.floor(Math.random() * 1000),
  })),
};

const PetChart = () => {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <div className="p-5 shadow-md rounded-lg bg-white w-full">
      <div className="flex items-center justify-between mb-17">
        <LegendComponent />
        <ToggleButtons setTimeframe={setTimeframe} timeframe={timeframe} />
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataSets[timeframe]}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Line type="monotone" dataKey="dog" stroke="#172554" strokeWidth={3} dot={false} />
          <Line type="monotone" dataKey="cat" stroke="#06B6D4" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PetChart;
