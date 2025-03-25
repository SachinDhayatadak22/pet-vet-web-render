import { useState } from "react";
import calendarIcon from "../../images/icon/calendar_icon.svg"
import filterIcon from "../../images/icon/filter_icon.svg"
import searchIcon from "../../images/icon/search_icon.svg";
import plusIcon from "../../images/icon/plus_icon.svg"
import arrowDown from "../../images/icon/arrow_down.svg"
import { useNavigate } from 'react-router-dom';

const PetListSortFilterSearchAdd = ({ onSearch, onFilter, onSort, onAdd }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [dateRange, setDateRange] = useState({ start: null, end: null });
    const [selectedTreatment, setSelectedTreatment] = useState("All Treatments");
    const [selectedStatus, setSelectedStatus] = useState("All Status");
    const [treatmentDropdownOpen, setTreatmentDropdownOpen] = useState(false);
    const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

    const treatmentOptions = ["All Treatments", "Surgery", "Therapy"];
    const statusOptions = ["All Status", "Active", "New Patient"];

    return (
        <div>
            <div className="flex justify-between my-4">
                <div className="flex items-center gap-4 rounded-2xl">
                    {/* Date Range Picker */}

                    <div className="flex gap-2 py-2 px-4 text-sm  bg-white text-textsecondary rounded-xl">
                        <img src={calendarIcon} alt="calendarIcon" />
                        <span>1 July - 20 July 2025</span>
                    </div>

                    <div className="relative">
                        <button
                            onClick={() => setTreatmentDropdownOpen(!treatmentDropdownOpen)}
                            className="w-42 bg-white text-sm  text-textsecondary border flex gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left"
                        >
                            <img src={filterIcon} alt="filterIcon" />
                            {selectedTreatment || "All Treatments"}
                            <img src={arrowDown} alt="arrowDown" />
                        </button>
                        {treatmentDropdownOpen && (
                            <div className="absolute z-30 left-0 mt-2 w-42 bg-white border rounded-lg shadow-lg">
                                <ul>
                                    {treatmentOptions.map((treatment) => (
                                        <li
                                            key={treatment}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedTreatment(treatment);
                                                setTreatmentDropdownOpen(false);
                                            }}
                                        >
                                            {treatment}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                    {/* Status Filter */}
                    <div className="relative">
                        <button
                            onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                            className="w-36 bg-white text-sm  text-textsecondary border flex gap-2 whitespace-nowrap rounded-lg px-3 py-2 text-left"
                        >
                            <img src={filterIcon} alt="filterIcon" />
                            {selectedStatus || "All Treatments"}
                            <img src={arrowDown} alt="arrowDown" />
                        </button>
                        {statusDropdownOpen && (
                            <div className="absolute z-30 left-0 mt-2 w-36 bg-white border rounded-lg shadow-lg">
                                <ul>
                                    {statusOptions.map((status) => (
                                        <li
                                            key={status}
                                            className="px-3 py-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => {
                                                setSelectedStatus(status);
                                                setStatusDropdownOpen(false);
                                            }}
                                        >
                                            {status}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>

                </div>
                <div className="flex gap-3">

                    {/* Search Input */}
                    <div className="relative">
                        <span className="absolute left-3 top-2.5 text-gray-400">
                            <img src={searchIcon} alt="searchIcon" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search Anything"
                            value={searchQuery}
                            onChange={(e) => {
                                setSearchQuery(e.target.value);
                                onSearch && onSearch(e.target.value);
                            }}
                            className="pl-10 pr-4 py-2 rounded-xl focus:outline-none text-sm"
                        />
                    </div>

                    {/* Add Patient Button */}
                    <div>

                        <button
                            className="bg-buttonPrimary hover:bg-buttonPrimary text-white flex px-4 py-2 rounded-xl text-sm transition"
                            onClick={onAdd}
                        >
                            <img src={plusIcon} alt="plusIcon" className="mr-2" />
                            <span>Add Patient</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PetListSortFilterSearchAdd;