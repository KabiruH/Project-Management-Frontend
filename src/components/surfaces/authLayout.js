import React from 'react';
import Footer from '../footer';

const AuthLayout = ({children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 grow min-h-screen">
     <div className='w-full h-full flex justify-center items-center'>
        {children}
     </div>
     <div className='hidden md:flex justify-center items-center h-full w-full bg-auth-bg-image bg-cover bg-center rounded-bl-[120px]'>
      <div className='flex flex-col justify-center items-center gap-1'>
       <div className='rounded-full bg-white h-[150px] w-[140px] flex justify-center items-center'>
        <img  src='/assets/logo.png'/>
       </div>
        <p className='subtitle1 text-white'>President's Award - Kenya</p>
        <p className='h2 text-white'>Project Management Portal</p>
      </div>
     </div>
    </div>
  );
};

export default AuthLayout;