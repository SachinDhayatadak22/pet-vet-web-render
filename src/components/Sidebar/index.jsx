import React, { useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { IoPawOutline, IoSettingsOutline } from 'react-icons/io5';
import { motion } from 'framer-motion';
import { ToggleMenuIcon } from '../../images/icon/Icon.jsx';
import logoInside from '../../images/icon/logo_internal.svg';
import { FaHandHoldingMedical, FaUserDoctor } from 'react-icons/fa6';
import { CiCalendar } from 'react-icons/ci';
import { BiClinic } from 'react-icons/bi';

const sidebarLinks = [
  {
    to: '/dashboard',
    icon: <RxDashboard className="text-[32px]" />,
    label: 'Home',
  },
  {
    to: '/appointments',
    icon: <IoPawOutline className="text-[32px]" />,
    label: 'Appointments',
  },
  {
    to: '/pet-patients',
    icon: <FaHandHoldingMedical className="text-[32px]" />,
    label: 'Pet Patients',
  },
  {
    to: '/vets',
    icon: <FaUserDoctor className="text-[32px]" />,
    label: 'Vets',
  },
  {
    to: '/scheduled',
    icon: <CiCalendar className="text-[32px]" />,
    label: 'Scheduled',
  },
  {
    to: '/clinic-profile',
    icon: <BiClinic className="text-[32px]" />,
    label: 'Clinic Profile',
  },
  {
    to: '/settings',
    icon: <IoSettingsOutline className="text-[32px]" />,
    label: 'Settings',
  },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const sidebarRef = useRef(null);

  return (
    <motion.div
      animate={{ width: sidebarOpen ? '22.375rem' : '7.5rem' }}
      className="absolute left-0 top-0 z-50 h-screen overflow-y-hidden bg-white shadow-lg transition-all duration-300 lg:static 2xl:w-[358px] xl:w-[300px] lg:w-[250px] md:w-[200px] sm:w-[180px] w-[120px]"
      ref={sidebarRef}
    >
      <div
        className={`flex flex-col h-full py-14 gap-13.5 ${
          sidebarOpen ? 'pl-[30px] pr-[78px]' : 'px-[15px]'
        }`}
      >
        {/* Sidebar Header */}
        <div
          className={`flex items-center ${
            sidebarOpen ? 'gap-7.5 justify-end' : 'justify-center'
          }`}
        >
          {sidebarOpen && (
            <NavLink to="/dashboard">
              <img src={logoInside} alt="logo" />
            </NavLink>
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            <ToggleMenuIcon classList={sidebarOpen ? '' : 'rotate-180'} />
          </button>
        </div>

        {/* Sidebar Links */}
        <nav className="mt-4 flex flex-col gap-2">
          {sidebarLinks.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-4 text-lg px-7 py-3 rounded-xl hover:bg-secondary2 hover:text-white transition-all ${
                  isActive ? 'bg-secondary2 text-white' : 'text-black'
                }`
              }
            >
              {icon}
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>
    </motion.div>
  );
};

export default Sidebar;
