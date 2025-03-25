import React from 'react'
import TableProvider from "../components/Tables/TableProvider";
import PaginationProvider from "../components/Tables/PaginationProvider";
import PetListSortFilterSearchAdd from "../components/Tables/PetListSortFilterSearchAdd";
import { useNavigate } from 'react-router-dom';

const PetList = () => {
    const navigate = useNavigate();

    const columnNames = [
        { key: "name", name: "Name", },
        { key: "id", name: "ID" },
        { key: "age", name: "Age" },
        { key: "checkIn", name: "Check In" },
        { key: "treatment", name: "Treatment" },
        { key: "doctorAssigned", name: "Doctor Assigned" },
        { key: "status", name: "Status" },
    ]

    const tableData = [
        {
            name : "Optimus Prime",
            id : "301",
            age : "1 Year",
            checkIn : "20 July 2025",
            treatment : "Routine Check up",
            doctorAssigned : "Dr. Jenny Paul",
            status : "active"
        },
        {
            name : "Asteroid Destroyer",
            id : "311",
            age : "2 Year",
            checkIn : "25 July 2025",
            treatment : "Stomach Operation",
            doctorAssigned : "Dr. Aryan Paul",
            status : "new"
        },
        {
            name : "Optimus Prime",
            id : "301",
            age : "1 Year",
            checkIn : "20 July 2025",
            treatment : "Routine Check up",
            doctorAssigned : "Dr. Jenny Paul",
            status : "active"
        },
        {
            name : "Asteroid Destroyer",
            id : "311",
            age : "2 Year",
            checkIn : "25 July 2025",
            treatment : "Stomach Operation",
            doctorAssigned : "Dr. Aryan Paul",
            status : "new"
        },
        {
            name : "Optimus Prime",
            id : "301",
            age : "1 Year",
            checkIn : "20 July 2025",
            treatment : "Routine Check up",
            doctorAssigned : "Dr. Jenny Paul",
            status : "active"
        },
        {
            name : "Asteroid Destroyer",
            id : "311",
            age : "2 Year",
            checkIn : "25 July 2025",
            treatment : "Stomach Operation",
            doctorAssigned : "Dr. Aryan Paul",
            status : "new"
        },
        {
            name : "Optimus Prime",
            id : "301",
            age : "1 Year",
            checkIn : "20 July 2025",
            treatment : "Routine Check up",
            doctorAssigned : "Dr. Jenny Paul",
            status : "active"
        },
        {
            name : "Asteroid Destroyer",
            id : "311",
            age : "2 Year",
            checkIn : "25 July 2025",
            treatment : "Stomach Operation",
            doctorAssigned : "Dr. Aryan Paul",
            status : "new"
        },
        {
            name : "Optimus Prime",
            id : "301",
            age : "1 Year",
            checkIn : "20 July 2025",
            treatment : "Routine Check up",
            doctorAssigned : "Dr. Jenny Paul",
            status : "active"
        },
        {
            name : "Asteroid Destroyer",
            id : "311",
            age : "2 Year",
            checkIn : "25 July 2025",
            treatment : "Stomach Operation",
            doctorAssigned : "Dr. Aryan Paul",
            status : "new"
        },
    ]

    return (
        <div className='px-[30px]'>
            <div>
                <PetListSortFilterSearchAdd
                    onAdd={() => navigate("/pet-patients/add")}
                />
            </div>
            <div>
                <TableProvider
                    tableName = "petlist"
                    columnNames={columnNames}
                    tableData={tableData}
                />
            </div>
            <div>
                <PaginationProvider
                currentPage = {3}
                 totalPages = {13}
                // onPageChange = {}
                />
            </div>
        </div>
    )
}

export default PetList