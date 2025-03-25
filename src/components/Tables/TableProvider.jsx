import React, { useState } from "react";
import arrowDownPending from '../../images/icon/arrow_down_pending.svg';
import arrowDownSuccess from '../../images/icon/arrow_down_success.svg';
import arrowDownFailure from '../../images/icon/arrow_down_failure.svg';
import editIcon from "../../images/icon/edit_icon.svg";
import deleteIcon from "../../images/icon/delete_icon.svg";

const TableProvider = ({ tableName = "", columnNames = [], tableData = [] }) => {

    const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

    const [statuses, setStatuses] = useState(
        tableData.map(row => capitalize(row.status))
    );

    const [dropdownOpen, setDropdownOpen] = useState(null);

    const appointmentStatusOptions = ["Pending", "Confirmed", "Cancelled"];

    const connectionRequestStatusOptions = ["Pending", "Approved", "Rejected"];

    const handleStatusChange = (rowIndex, newStatus) => {
        const updatedStatuses = [...statuses];
        updatedStatuses[rowIndex] = newStatus;
        setStatuses(updatedStatuses);
        setDropdownOpen(null);
    };

    return (
        <div className="overflow-x-auto rounded-lg max-h-[70vh] bg-white border border-[#E6E6E6]">
            <table className="min-w-full">
                <thead className="sticky top-0 bg-white z-20 rounded shadow">
                    <tr>
                        {columnNames.map((column, index) => (
                            <th key={index} className={`px-6 py-4 text-sm font-medium text-gray-700 ${column.indexCol ? "text-left" : "text-center"}`}>
                                {column.key === "username" && tableName === "connectionRequests" ?
                                    <div className="flex justify-left ">{column.name}</div>
                                    : column.name}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((tableRow, rowIndex) => (
                        <tr className="border-t border-gray-300" key={rowIndex}>
                            {columnNames.map((column, colIndex) => (
                                <td key={colIndex} className={`${tableName === "appointments" ? "py-3" : "py-5"} px-6 text-sm text-gray-700 text-center relative`}>
                                    {column.key === "status" && tableName === "appointments" ?
                                        <div className="relative inline-block">
                                            <button
                                                onClick={() => setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex)}
                                                className={`rounded-xl flex items-center gap-2
                                                    ${statuses[rowIndex] === "Pending" ? "px-4 py-2 bg-yellow-100 text-yellow-500 border border-yellow-500"
                                                        : statuses[rowIndex] === "Confirmed" ? "px-4 py-2 bg-green-100 text-green-500 border border-green-500"
                                                            : "px-4 py-2 bg-red-100 text-red-500 border border-red-500"
                                                    }`}
                                            >
                                                {statuses[rowIndex]}
                                                <span className="ml-2">
                                                    <img src={statuses[rowIndex] === "Pending" ? arrowDownPending : statuses[rowIndex] === "Confirmed" ? arrowDownSuccess : arrowDownFailure} alt="arrowDownSuccess" className="max-w-8" />
                                                </span>
                                            </button>
                                            {dropdownOpen === rowIndex && (
                                                <div className="absolute z-10 left-0 mt-2 w-36 bg-white text-left border border-gray-300 rounded-lg shadow-lg">
                                                    {appointmentStatusOptions.map((status) => (
                                                        <div key={status} onClick={() => handleStatusChange(rowIndex, status)} className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:rounded-lg">
                                                            {status}
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        :
                                        column.key === "status" && tableName === "petlist" ?
                                            <>
                                                {tableRow[column.key] === "active" ?
                                                    <span className="text-[#E1EC0B] bg-[#fbf9ce] border border-[#E1EC0B] px-9 py-2 rounded-xl">Active</span>
                                                    : <span className="text-secondary2 bg-secondarybg border border-secondary2 px-4 py-2 rounded-xl">New Patient</span>
                                                }
                                            </>
                                            :
                                            column.key === "status" && tableName === "vetlist" ?
                                                <>
                                                    {tableRow[column.key] === "active" ?
                                                        <span className="text-green-500 bg-green-100 border border-green-500 px-6 py-2 rounded-xl">Active</span>
                                                        : <span className="text-red-500 bg-red-100 border border-red-500 px-4 py-2 rounded-xl">Inactive</span>
                                                    }
                                                </>
                                                :
                                                column.key === "action" && tableName === "vetlist" ?
                                                    <div className="flex justify-center gap-3">
                                                        <img src={editIcon} alt="editIcon" className="cursor-pointer" />
                                                        <img src={deleteIcon} alt="deleteIcon" className="cursor-pointer" />
                                                    </div>
                                                    :
                                                    column.key === "username" && tableName === "connectionRequests" ?
                                                        <div className="flex justify-left gap-3">
                                                            {tableRow[column.key] || "-"}
                                                        </div>
                                                        :
                                                        column.key === "status" && tableName === "connectionRequests" ?
                                                            <div className="relative inline-block">
                                                                <button
                                                                    onClick={() => setDropdownOpen(dropdownOpen === rowIndex ? null : rowIndex)}
                                                                    className={`rounded-xl flex items-center gap-2
                                                                ${statuses[rowIndex] === "Pending" ? "px-4 py-2 bg-yellow-100 text-yellow-500 border border-yellow-500"
                                                                            : statuses[rowIndex] === "Approved" ? "px-4 py-2 bg-green-100 text-green-500 border border-green-500"
                                                                                : "px-4 py-2 bg-red-100 text-red-500 border border-red-500"
                                                                        }`}
                                                                >
                                                                    {statuses[rowIndex]}
                                                                    <span className="ml-2">
                                                                        <img src={statuses[rowIndex] === "Pending" ? arrowDownPending : statuses[rowIndex] === "Approved" ? arrowDownSuccess : arrowDownFailure} alt="arrowDownSuccess" className="max-w-8" />
                                                                    </span>
                                                                </button>
                                                                {dropdownOpen === rowIndex && (
                                                                    <div className="absolute z-10 left-0 mt-2 w-36 bg-white text-left border border-gray-300 rounded-lg shadow-lg">
                                                                        {connectionRequestStatusOptions.map((status) => (
                                                                            <div key={status} onClick={() => handleStatusChange(rowIndex, status)} className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:rounded-lg">
                                                                                {status}
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                )}
                                                            </div>
                                                            :
                                                            (
                                                                tableRow[column.key] || "-"
                                                            )
                                    }
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TableProvider;
