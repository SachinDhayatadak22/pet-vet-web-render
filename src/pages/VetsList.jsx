import React from 'react'
import TableProvider from '../components/Tables/TableProvider'
import PaginationProvider from '../components/Tables/PaginationProvider'
import VetListSearchSortFilterAdd from '../components/Tables/VetListSearchSortFilterAdd'
import { useNavigate } from 'react-router-dom';

const VetsList = () => {
  const navigate = useNavigate();

  const columnNames = [
    {key : "name", name : "Name"},
    {key : "department", name : "Department"},
    {key : "specialist", name : "Specialist"},
    {key : "workingHours", name : "Working Hours"},
    {key : "status", name : "Availability"},
    {key : "action", name : "Action"},
  ]

  const tableData = [
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "active",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "inactive",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "active",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "inactive",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "active",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "inactive",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "active",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "inactive",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "active",
      action: true
    },
    {
      name : "Optimus",
      department : "General Medicine",
      specialist : "Routine Check up",
      workingHours : "09:00 - 17:00",
      status: "inactive",
      action: true
    },
  ]

  return (
    <div className='px-[30px]'>
      <div>
        <VetListSearchSortFilterAdd
          onAdd={()=>navigate("/vets/add")}
        />
      </div>
      <div>
        <TableProvider
          tableName="vetlist"
          columnNames={columnNames}
          tableData={tableData}
        />
      </div>
      <div>
        <PaginationProvider
          currentPage={3}
          totalPages={10}
        />
      </div>
    </div>
  )
}

export default VetsList