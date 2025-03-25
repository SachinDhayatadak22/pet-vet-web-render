import { IoArrowBack, IoSearchOutline } from 'react-icons/io5';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import userPic from "../../images/duser.png";
import backArrowicon from "../../images/icon/backarrow.svg";
import ManageProfile from '../Sidebar/ManageProfile';
const DASHBOARD_PATH = "/dashboard";
const CLINIC_PROFILE_PATH = ["/clinic-profile", "/vets/vet-profile"];

// Define titles for each route
const pageTitles = {
  "/appointments": "Appointments",
  "/appointments/add": "Appointments / Add Appointment",
  "/pet-patients/add": "Pet List / Add Patient",
  "/vets/add": "Vets / Add Vet",
  "/patients": "Patients",
  "/settings": "Settings",
  "/reports": "Reports",
  "/pet-patients": "Pet List",
  "/vets": "Employee",
};

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isProfile = CLINIC_PROFILE_PATH.includes(location.pathname);
  console.log(isProfile);
  const isDashboard = location.pathname === DASHBOARD_PATH;

  // Get the title dynamically based on path, default to empty if not listed
  const title = pageTitles[location.pathname] || "";
  let isSubpage = location.pathname.split("/").length > 2;
  if(isProfile){
   isSubpage = false;
  }



  return (
    <header className={`flex items-center justify-between py-3 px-[30px] ${isProfile ? 'bg-[#C4C4C4]' : isDashboard ? 'bg-white' : 'bg-[#F5F7F9]'}`}>
      <div className="relative">
        {isDashboard ? (
          <>
            <span className="absolute text-textsecondary text-[17px] font-bold top-[15px] left-[15px]">
              <IoSearchOutline />
            </span>
            <input
              type="text"
              className="w-[230px] py-3 pl-10.5 pr-[20px] rounded-lg bg-primary text-textsecondary outline-none focus:ring-2 focus:ring-secondary2"
              placeholder="Search Anything"
            />
          </>
        ):(
          <>
            <h2 className="text-textsecondary2 text-[26px] font-bold leading-[25px] flex items-center gap-x-4">
              {isSubpage && (
                <button
                  onClick={() => navigate(-1)}
                  className=""
                >
                  <img src={backArrowicon} alt="back" />
                </button>
              )}
              {title}
            </h2>
          </>
        )}
      </div>
      <ManageProfile/>
    </header>
  );
};

export default Header;
