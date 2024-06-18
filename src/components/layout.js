// Layout.js
import React from 'react';
import Sidebar from './sidebar';


const Layout = ({ children }) => {
  return (
    <div className="flex">
  
      <Sidebar />
      <div className="flex-grow p-5 bg-gray-100 ">
        {children}
      </div>
    </div>
  );
};

export default Layout;
