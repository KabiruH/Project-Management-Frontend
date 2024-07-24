
import React, { useState } from 'react';
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/sidebar"
import { IoSettingsSharp } from "react-icons/io5";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [breadcrum,setBreadcrum] = useState(false);
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="relative max-width-screen pr-3 h-full">
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
          <div className='p-3 bg-white rounded grow overflow-auto'>
          <div className='w-full p-4 flex justify-end mb-6 '>
           <div className='rounded-[32px] flex gap-3 px-3 py-2 bg-white '>
            <input placeholder='search ' className='rounded-[30px] outline outline-none focus:outline-none bg-bgColor px-2 my-1' />
            <IoSettingsSharp className='text-primary cursor-pointer my-auto' onClick={()=>setBreadcrum(prev => !prev)} />
            <div className='rounded-full min-h-8 min-w-8 bg-bgColor'>
              <img className='w-10 h-10 rounded-full' src='/person.jpg' />
            </div>
           </div>
        {breadcrum && (  <div class="absolute top-16 right-20 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-2">License</a>
                  <form>
                    <button type="submit" class="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                  </form>
                </div>
          </div>)}
         </div>
          {children}
          </div>
      </div>
    </div>
  );
};

export default Layout;


