
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/sidebar"

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative max-width-screen">
      <div className="w-full md:hidden py-3 pl-4 sticky top-0 z-[100] bg-white mb-1">
        <IoMenu
          type="button"
          className="md:hidden text-secondary text-[40px] mr-5"
          id="menu-button"
          aria-expanded={isSidebarOpen}
          aria-haspopup="true"
          onClick={toggleSidebar}
        />
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-[20%_auto] md:p-2 md:gap-3 bg-bgGrey">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div className="p-3 bg-white rounded grow overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;


