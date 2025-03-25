import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import PetChart from '../../components/Chart/PetChart/index.jsx';
import EmployeeBarChart from '../../components/Chart/EmployeeBarChart/index.jsx';
import EmpBirth from '../../components/EmpBirth/index.jsx';
import PetsCard from '../../components/PetsCard/index.jsx';
import AppointmentCard from '../../components/AppointmentCard/index.jsx';
import EmployeeAbsence from '../../components/EmployeeAbsence/index.jsx';
import TableProvider from '../../components/Tables/TableProvider.jsx';
import PaginationProvider from '../../components/Tables/PaginationProvider.jsx';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const columnNames = [
    { key: "username", name: "User name" },
    { key: "date", name: "Date" },
    { key: "status", name: "Status" },
  ]

  const tableData = [
    {
      username: "Peter Parker",
      date: "17/3/2025",
      status: "pending"
    },
    {
      username: "Bruce Banner",
      date: "17/3/2025",
      status: "approved"
    },
    {
      username: "Peter Parker",
      date: "17/3/2025",
      status: "pending"
    },
    {
      username: "Natasha Romanoff",
      date: "17/3/2025",
      status: "rejected"
    },
    {
      username: "Peter Parker",
      date: "17/3/2025",
      status: "pending"
    },
    {
      username: "Bruce Banner",
      date: "17/3/2025",
      status: "approved"
    },
    {
      username: "Peter Parker",
      date: "17/3/2025",
      status: "pending"
    },
    {
      username: "Natasha Romanoff",
      date: "17/3/2025",
      status: "rejected"
    },
    {
      username: "Peter Parker",
      date: "17/3/2025",
      status: "pending"
    },
    {
      username: "Natasha Romanoff",
      date: "17/3/2025",
      status: "rejected"
    },
  ]

  return (
    <>
      <div className="p-[30px] bg-primary rounded-lg ">
        <div className="grid grid-cols-[70%_30%] gap-[10px]">
          <div className="">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-[14px]">
              <EmpBirth />
              <PetsCard />
              <AppointmentCard />
            </div>
            <PetChart />
            <div className='font-semibold mt-6 mb-4 text-lg text-textsecondary'>Connection Requests</div>
            <TableProvider
              tableName="connectionRequests"
              columnNames={columnNames}
              tableData={tableData}
            />
            <PaginationProvider
              tableName="connectionRequests"
              currentPage={5}
              totalPages={20}
            // onPageChange = {}
            />
          </div>
          <div>
            <EmployeeBarChart />
            <EmployeeAbsence />
          </div>
        </div>

      </div>
    </>
  );
};

export default Dashboard;
