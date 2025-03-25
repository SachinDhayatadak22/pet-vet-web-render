import React from 'react';
import TableProvider from '../components/Tables/TableProvider';
import PaginationProvider from '../components/Tables/PaginationProvider';
import AppointmentsFilterSearchAdd from "../components/Tables/AppointmentsFilterSearchAdd";

const Appointments = () => {
  const columnNames = [
    { key: "fitpezId", name: "FitPez ID", indexCol: true },
    { key: "name", name: "Name" },
    { key: "date", name: "Date" },
    { key: "time", name: "Time" },
    { key: "doctor", name: "Doctor" },
    { key: "treatment", name: "Treatment" },
    { key: "clinicId", name: "Clinic ID" },
    { key: "status", name: "Status", actionColumn: true }
  ];

  const tableData = [
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "confirmed"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "confirmed"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "pending"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "cancelled"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "confirmed"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "pending"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "cancelled"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "confirmed"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "confirmed"
    },
    {
      fitpezId: "4587",
      name: "Aryani Soni",
      date: "2025-01-17",
      time: "09:00",
      doctor: "Dr. Jenny Paul",
      treatment: "Check up",
      clinicId: "8765",
      status: "confirmed"
    }
  ];

  const handleFilterChange = (filter) => {
    console.log("Selected Filter:", filter);
  };

  const handleSearch = (query) => {
    console.log("Search Query:", query);
  };

  const handleAdd = () => {
    console.log("Add Appointment Clicked");
  };

  return (
    <div className="px-[30px]">
      <div>
        <AppointmentsFilterSearchAdd
          onFilterChange={handleFilterChange}
          onSearch={handleSearch}
          onAdd={handleAdd}
        />
      </div>
      <div>
        <TableProvider
        tableName = "appointments"
          columnNames={columnNames}
          tableData={tableData}
        />
      </div>
      <div>
        <PaginationProvider
          currentPage={8}
          totalPages={15}
        // onPageChange
        />
      </div>
    </div>
  );
}

export default Appointments;
