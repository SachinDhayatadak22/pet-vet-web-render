import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar/index';
import Header from '../components/Header/index.jsx';

const EXCLUDED_PATHS = [
  "/", "/login", "/login/admin", "/signup", "/admin-login", "/admin-signup", "/forget-password",
  "/forget-password-email", "/forget-password-otp", "/reset-password"
];

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const isExcluded = EXCLUDED_PATHS.includes(location.pathname) ||
    location.pathname.startsWith("/verify-code/") ||
    location.pathname.startsWith("/reset-password/");

  return (
    <div className="bg-primary font-poppins">
      <div className="flex h-screen overflow-hidden">
        {!isExcluded && <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden h-screen">
          {!isExcluded && <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;