import React, { useEffect, useState } from 'react'
import TableProvider from '../components/Tables/TableProvider'
import PaginationProvider from '../components/Tables/PaginationProvider'
import VetListSearchSortFilterAdd from '../components/Tables/VetListSearchSortFilterAdd'
import { useNavigate } from 'react-router-dom';
import { apiGET } from '../utils/apiHelper';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import moment from 'moment';

dayjs.extend(utc);

const VetsList = () => {
  const navigate = useNavigate();

  const columnNames = [
    { key: "name", name: "Name" },
    { key: "department", name: "Department" },
    { key: "specialist", name: "Specialist" },
    { key: "workingHours", name: "Working Hours" },
    { key: "status", name: "Availability" },
    { key: "action", name: "Action" },
  ]

  const [employeeList, setEmployeeList] = useState(null);


  const tableData = employeeList?.map((employee) => {
   
    const extractTime = (dateString) => {
      if (dateString == null) return "00:00";
      return moment.utc(dateString).format("HH:mm");
    };
    const { start, end } = employee?.workingDaysHours?.hours || {};
    const extractedTime = `${extractTime(start)} - ${extractTime(end)}`;

    return {
      name: employee?.fullname,
      department: "OPD",
      specialist: employee?.specialization,
      status: employee?.isActive === true ? "active" : false,
      workingHours: extractedTime ? extractedTime : "no time",
      action: true
    }
  })

  const getEmployeeList = async () => {
    try {
      const response = await apiGET(`/vet/get-all-vets`);
      if (response.status == 200) {
        setEmployeeList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching file details:", error.message);
    }
  };

  useEffect(() => {
    getEmployeeList();
  }, []);

  return (
    <div className='px-[30px]'>
      <div>
        <VetListSearchSortFilterAdd
          onAdd={() => navigate("/vets/add")}
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