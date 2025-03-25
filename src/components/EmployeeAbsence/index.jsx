import { useState } from "react";
import  ChevronDown  from "../../images/icon/chevron.svg";

const absences = [
  { name: "Mr. John", role: "Vet", date: "12 Jan, 2025", status: "Full Day" },
  { name: "Mr. John", role: "", date: "12 Jan, 2025", status: "Full Day" },
  { name: "Mr. John", role: "", date: "12 Jan, 2025", status: "Full Day" },
  { name: "Mr. John", role: "", date: "12 Jan, 2025", status: "Full Day" },
  { name: "Mr. John", role: "", date: "12 Jan, 2025", status: "Full Day" },
  { name: "Mr. John", role: "", date: "12 Jan, 2025", status: "Full Day" },
  { name: "Mr. John", role: "", date: "12 Jan, 2025", status: "Full Day" },
];

export default function EmployeeAbsence() {
  const [month, setMonth] = useState("January 2025");
  const [dateRange, setDateRange] = useState("12 Jan - 24 Jan");

  return (
    <div className="bg-white w-full mt-[10px] p-[20px]">
      <h2 className="text-[26px] font-semibold text-texttertiary leading-[25px]">Employee Absence</h2>
      <div className="flex justify-between items-center mt-[30px] ">
        <button className="text-[20px] font-semibold text-texttertiary flex items-center justify-start gap-[13px]">
          {month}
          <img src={ChevronDown} alt="" />
        </button>
        <button className="text-[10px] font-normal text-texttertiary flex items-center justify-start gap-[4px]">
          {dateRange}
          <img src={ChevronDown} alt="" />
        </button>
      </div>
      <div className="mt-5">
        {absences.map((absence, index) => (
          <div key={index} className="flex justify-between items-center mb-[13px]">
            <div>
              <p className="text-[16px] font-normal text-black">
                {absence.name} {absence.role && <span className="text-gray-500">({absence.role})</span>}
              </p>
              <p className="text-sm text-gray-500">{absence.date}</p>
            </div>
            <p className="text-sm text-gray-700">{absence.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
