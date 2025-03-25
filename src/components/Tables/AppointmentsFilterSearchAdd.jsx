import React, { useState } from "react";
import searchIcon from "../../images/icon/search_icon.svg"
import calendar_icon from "../../images/icon/calendar_icon.svg"
import arrowDown from "../../images/icon/arrow_down.svg"
import plusIcon from "../../images/icon/plus_icon.svg"
import { useNavigate } from "react-router-dom";

const FilterSearchBar = ({ onFilterChange, onSearch, onAdd }) => {
    const [activeFilter, setActiveFilter] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // Default to today
    const navigate = useNavigate();

    const filters = [
        { label: "All", count: 128 },
        { label: "Confirmed", count: 18 },
        { label: "Pending", count: 28 },
        { label: "Cancelled", count: 28 },
    ];

    return (
        <div className="flex justify-between items-center py-4 rounded-lg">
            {/* Filter Tabs */}
            <div className="flex space-x-3 bg-white p-[0.15rem] rounded-xl">
                {filters.map((filter) => (
                    <button
                        key={filter.label}
                        className={`px-4 py-2 rounded-xl text-sm transition ${activeFilter === filter.label
                            ? "bg-buttonPrimary text-white"
                            : ""
                            }`}
                        onClick={() => {
                            setActiveFilter(filter.label);
                            onFilterChange && onFilterChange(filter.label);
                        }}
                    >
                        {filter.label} ({filter.count})
                    </button>
                ))}
            </div>

            {/* Search & Date Picker */}
            <div className="flex space-x-3 items-center">
                {/* Search Input */}
                <div className="relative">
                    <span className="absolute left-3 top-2.5 text-gray-400">
                        <img src={searchIcon} alt="searchIcon" />
                    </span>
                    <input
                        type="text"
                        placeholder="Search Anything"
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            onSearch && onSearch(e.target.value);
                        }}
                        className="pl-10 pr-4 py-2 rounded-xl focus:outline-none text-sm"
                    />
                </div>

                {/* Date Picker */}
                <div className="flex gap-2 px-3 py-2 rounded-xl text-sm bg-white">
                    <img src={calendar_icon} alt="calendar_icon" />
                    <span>Today</span>
                    <img src={arrowDown} alt="arrowDown" />
                </div>

                {/* <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="px-3 py-2 rounded-xl text-sm"
                /> */}

                {/* Add Appointment Button */}
                <button
                    className="bg-buttonPrimary hover:bg-buttonPrimary text-white flex px-4 py-2 rounded-xl text-sm transition"
                    onClick={() => navigate("/appointments/add")}
                >
                    <img src={plusIcon} alt="plusIcon" className="mr-2" />
                    <span>Add Appointment</span>
                </button>
            </div>
        </div>
    );
};

export default FilterSearchBar;
