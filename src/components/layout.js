
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/sidebar"
import { IoSettingsSharp } from "react-icons/io5";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative max-width-screen h-full">
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
      <div className="w-full min-h-[100vh] grid grid-cols-1 md:grid-cols-[20%_auto] md:p-2 md:gap-3 bg-bgGrey">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
        <div className="p-3 flex flex-col gap-3">
         <div className='w-full p-4 flex justify-end'>
           <div className='rounded-[32px] flex gap-3 px-3 py-2 bg-white '>
            <input placeholder='search ' className='rounded-[30px] outline outline-none focus:outline-none bg-bgColor px-2 my-1' />
            <IoSettingsSharp className='text-primary cursor-pointer my-auto' />
            <div className='rounded-full min-h-8 min-w-8 bg-bgColor'>
              <img className='w-10 h-10 rounded-full' src='person.jpg' />
            </div>
           </div>
         </div>
          <div className='p-3 bg-white rounded grow overflow-auto'>
          {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;


