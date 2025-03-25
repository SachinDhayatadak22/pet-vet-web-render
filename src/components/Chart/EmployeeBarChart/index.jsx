import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, CartesianGrid } from "recharts";
import ToggleButtons from "./ToggleButtons.jsx";
import { CiCalendar } from 'react-icons/ci';

// dummy data
const dataSets = {
  today: [
    { name: "Jai", appointments: 5 },
    { name: "Smith", appointments: 3 },
    { name: "Peter", appointments: 2 },
    { name: "Finn", appointments: 4 },
    { name: "Jenny", appointments: 2 },
  ],
  week: [
    { name: "Jai", appointments: 15 },
    { name: "Smith", appointments: 9 },
    { name: "Peter", appointments: 5 },
    { name: "Finn", appointments: 10 },
    { name: "Jenny", appointments: 6 },
  ],
  month: [
    { name: "Jai", appointments: 50 },
    { name: "Smith", appointments: 30 },
    { name: "Peter", appointments: 20 },
    { name: "Finn", appointments: 40 },
    { name: "Jenny", appointments: 25 },
  ],
};

const EmployeeBarChart = () => {
  const [timeframe, setTimeframe] = useState("week");

  return (
    <div className="p-5 shadow-md rounded-lg bg-white w-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Employee Appointments</h2>
      </div>

      <div className="flex items-center justify-between mb-[6px]">
        <ToggleButtons setTimeframe={setTimeframe} timeframe={timeframe} />
         <span className="cursor-pointer">
          <CiCalendar className="text-[24px]"/>
        </span>
      </div>


      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={dataSets[timeframe]}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis stroke="#E4E4E4" dataKey="name" tick={{ fill: "black" }}/>
          <YAxis stroke="#E4E4E4" tick={false}/>
          <Bar dataKey="appointments" fill="#E4E4E4" barSize={32} radius={[12, 12, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EmployeeBarChart;
