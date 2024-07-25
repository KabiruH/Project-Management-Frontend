
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoMenu } from "react-icons/io5";
import Sidebar from "../components/sidebar"
import { IoSettingsSharp } from "react-icons/io5";
import { smallScreenCustomStyles } from '../styles/smallScreenCustomStyles';
import Modal from "react-modal"
const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [breadcrum,setBreadcrum] = useState(false);
  const [logoutModal,setLogoutModal] = useState(false)
  const navigate = useNavigate()
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
      <div className="w-full min-h-[100vh] grid grid-cols-1 md:grid-cols-[16%_auto] md:p-2 md:gap-3 bg-bgGrey">
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
          <div className='p-3 bg-white rounded grow overflow-auto'>
          <div className='w-full p-4 flex justify-end mb-6 '>
           <div className='rounded-[32px] flex gap-3 px-3 py-2 bg-white '>
            <input placeholder='search ' className='rounded-[30px] h-10 outline outline-none focus:outline-none bg-bgColor px-2 my-1' />
            <IoSettingsSharp className='text-primary text-3xl cursor-pointer my-auto' onClick={()=>setBreadcrum(prev => !prev)} />
            
           </div>
        {breadcrum && (  <div class="absolute top-[150px] md:top-16 right-20 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                <div class="py-1" role="none">
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-0">Account settings</a>
                  <a href="#" class="block px-4 py-2 text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-1">Support</a>
                  <form>
                    <button onClick={()=>setLogoutModal(true)} class="block w-full px-4 py-2 text-left text-sm text-gray-700" role="menuitem" tabindex="-1" id="menu-item-3">Sign out</button>
                  </form>
                </div>
          </div>)}
         </div>
          {children}
          </div>
      </div>
      <Modal style={smallScreenCustomStyles} isOpen={logoutModal} onRequestClose={()=>setLogoutModal(false)} contentLabel='Logout'>
       <div className='flex justify-center items-center flex-col h-full'>
       <h2 className="subtitle2 mb-4">Goodbye!! </h2>
       Are you sure you want to Logout?
        <div className="flex justify-end mt-4">
          <button onClick={()=>{
            localStorage.clear()
            setLogoutModal(false)
            navigate('/signin')
          }} className="bg-primary px-5 text-white p-2 rounded mr-2">
           Yes
          </button>
          <button onClick={()=>setLogoutModal(false)} className="outline outline-1 outline-primary text-primary px-5 p-2 rounded">
            No
          </button>
        </div>
       </div>
      </Modal>
    </div>
  );
};

export default Layout;


