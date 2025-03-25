import { useState } from "react";
import calendarIcon from "../../images/icon/calendar_icon.svg";
import filterIcon from "../../images/icon/filter_icon.svg";
import searchIcon from "../../images/icon/search_icon.svg";
import plusIcon from "../../images/icon/plus_icon.svg";
import arrowDown from "../../images/icon/arrow_down.svg";

const VetListSearchSortFilterAdd = ({ onSearch, onFilter, onSort, onAdd }) => {
    const [birthday, setBirthday] = useState("");
    const [role, setRole] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [showRoleDropdown, setShowRoleDropdown] = useState(false);
    const [showCalendar, setShowCalendar] = useState(false);

    const roles = ["Vet", "Nurse"];

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        if (onSearch) {
            onSearch(e.target.value);
        }
    };

    const handleFilter = (selectedRole) => {
        setRole(selectedRole);
        setShowRoleDropdown(false);
        if (onFilter) {
            onFilter(selectedRole);
        }
    };

    const handleSort = () => {
        if (onSort) {
            onSort();
        }
    };

    const handleAdd = () => {
        if (onAdd) {
            onAdd();
        }
    };

    return (
        <div className="flex justify-between items-center  gap-3 my-4">
            <div className="flex gap-3">

                {/* Birthday Search */}
                <div className="relative">
                    <button
                        className="flex items-center text-sm  gap-2 px-4 py-2 rounded-xl text-textsecondary bg-white "
                        onClick={() => setShowCalendar(!showCalendar)}
                    >
                        <img src={calendarIcon} alt="Calendar Icon" />
                        {birthday || "Search Birthday"}
                    </button>
                    {showCalendar && (
                        <input
                            type="date"
                            className="absolute z-30 mt-2 p-2 border rounded-md shadow bg-white"
                            onChange={(e) => {
                                setBirthday(e.target.value);
                                setShowCalendar(false);
                                handleFilter(e.target.value);
                            }}
                        />
                    )}
                </div>

                {/* Role Filter */}
                <div className="relative">
                    <button
                        className="flex items-center gap-2 text-sm  px-4 py-2 border rounded-xl text-textsecondary bg-white "
                        onClick={() => setShowRoleDropdown(!showRoleDropdown)}
                    >
                        <img src={filterIcon} alt="Filter Icon" />
                        {role || "Role"}
                        <img src={arrowDown} alt="arrowDown" />
                    </button>
                    {showRoleDropdown && (
                        <ul className="absolute mt-2 w-32 z-30 bg-white border rounded-lg shadow-md">
                            {roles.map((r) => (
                                <li
                                    key={r}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => handleFilter(r)}
                                >
                                    {r}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex gap-3">

                {/* Search Input */}
                <div className="relative flex items-center bg-white rounded-xl w-60">
                    <img src={searchIcon} alt="Search Icon" className="pl-3" />
                    <input
                        type="text"
                        placeholder="Search Anything"
                        className="pl-3 pr-3 py-2 w-full text-sm rounded-xl outline-none"
                        value={searchQuery}
                        onChange={handleSearch}
                    />
                </div>

                {/* Add Employee Button */}
                <button
                    className="ml-auto flex items-center gap-2 text-sm px-4 py-2 bg-buttonPrimary  text-white rounded-xl"
                    onClick={handleAdd}
                >
                    <img src={plusIcon} alt="Plus Icon" />
                    Add Employee
                </button>
            </div>
        </div>
    );
};

export default VetListSearchSortFilterAdd;
