import React, { useState, useContext } from 'react';
import { useNavigate,useLocation  } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBuilding, FaUser, FaProjectDiagram, FaCogs, FaSignOutAlt } from 'react-icons/fa';
import { IoChevronDownOutline } from "react-icons/io5";
import { MdModelTraining } from "react-icons/md";
import { GiReceiveMoney } from "react-icons/gi";
import { FaLayerGroup } from "react-icons/fa";
import { GiArchiveResearch } from "react-icons/gi";
import { TbFileReport } from "react-icons/tb";

import { FaUsers } from "react-icons/fa";


import { IoClose } from "react-icons/io5";

const Sidebar = ({isOpen, onClose}) => {
  const [dropdown, setDropdown] = useState({ name: 'Dashboard', path: '/dashboard', icon: <FaHome /> });
  const [logoutModal,setLogoutModal] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()


  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Calendar', path: '/calendar', icon: <FaCalendarAlt /> },
    {
      name: 'Institutions',
      icon: <FaBuilding />,
      path: '',
      dropdown: [
        { name: 'Institution', path: '/institutions/addInstitutions' },
        { name: 'Status', path: '/institutions/institutionStatus' },
        { name: 'Stages', path: '/institutions/institutionStages' },
      ]
    },
    {
      name: 'Participants',
      path: '',
      icon: <FaUser />,
      dropdown: [
        { name: 'Participant', path: '/participants/participant' },
        { name: 'Levels', path: '/participants/participantLevels' },
        { name: 'Award Participants', path: '/participants/awardParticipants' },
        { name: 'Participant Projects', path: '/participants/participantsProjects' }
      ]
    },
    {
      name: 'Project',
      path: '',
      icon: <FaProjectDiagram />,
      dropdown: [
        { name: 'Projects', path: '/project/project' },
        { name: 'Projects', path: '/project/project' },
        { name: 'Status', path: '/project/projectStatus' },
        { name: 'Testimonials', path: '/project/testimonials' },
        { name: 'Donors', path: '/project/donors' }
      ]
    },
    {
      name: 'Program',
      path: '',
      icon: <FaCogs />,
      dropdown: [{ name: 'Program', path: '/program/program' }]
    },
    {
      name: 'Helpers',
      path: '',
      icon: <FaUser />,
      dropdown: [
        { name: 'Helper', path: '/helpers/helper' },
        { name: 'Helper Type', path: '/helpers/helperType' }
      ]
    },
    {
      name: 'Training',
      path: '',
      icon: <MdModelTraining />,
      dropdown: [
        { name: 'Training', path: '/training/training' },
        { name: 'Training Level', path: '/training/trainingLevel' },
        { name: 'Training Category', path: '/training/trainingCategory' },
        { name: 'Training Type', path: '/training/trainingType' }
      ]
    },
    {
      name: 'Financial',
      path: '',
      icon: <GiReceiveMoney />,
      dropdown: [
        { name: 'Budget', path: '/financials/budget' },
        { name: 'Funding Type', path: '/financials/fundingType' }
      ]
    },
    {
      name: 'Partnership',
      icon: <FaLayerGroup />,
      path: '',
      dropdown: [
        { name: 'Partners', path: '/partnership/partnership' },
        { name: 'Partner Type', path: '/partnership/partnertype' }
      ]
    },
    {
      name: 'Research',
      path: '',
      icon: <GiArchiveResearch />,
      dropdown: [
        { name: 'Feedback', path: '/research/feedback' }]
    },
    {
      name: 'Reports',
      path: '',
      icon: <TbFileReport />,
      dropdown: [{name: 'Users',path: '/reports/users'}]
    },
    {
      name: 'Users',
      path: '',
      icon: <FaUsers />,
      dropdown: ['User', 'User Type']
    },
  ];
  const localItem = localStorage.getItem('item')
console.log(localItem,dropdown)
  return (
    <>
    <div
    className={`fixed p-2 rounded-md overflow-y-auto z-[101] md:relative md:p-2 inset-y-0 left-0 transform md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-white shadow-lg z-50 md:z-auto w-64 md:w-auto`}
  >
     <div className="flex justify-between items-center p-4">
        <h2 className="text-lg font-semibold"></h2>
        <IoClose
          type="button"
          className="text-secondary block text-[24px] md:hidden"
          onClick={onClose}
        />
      </div>
      <div className="mb-5 mt-6 flex flex-col items-center justify-center gap-2">
        <img src='/assets/logo.png' className='max-w-16 max-h-16' />
        <h3 className='text-[18px] text-secondary font-[600]'>President’s Award - Kenya</h3>
      </div>
      <ul>
      {menuItems.map((item,i)=>{
     return (
      <div key={i}> 
     <button
      onClick={() => {  
        if(item.path !== ''){
          navigate(item.path) 
        }
        setDropdown(item)  
        localStorage.setItem('item',item.name)     
      }}
      className={`w-full  p-2 flex items-center `}
    >
      <span className={location.pathname == item.path ? "mr-2 text-primary" : 'mr-2'  }>{item.icon}</span>
      <span className={location.pathname == item.path ? 'body1 text-secondary font-[500]' :"body1 text-greys mr-3"  }>{item.name}</span>
      {item.path == '' ? <IoChevronDownOutline onClick={()=>{
        if(dropdown.name == item.name){
          localStorage.removeItem('item')
         return setDropdown({})
        }
        localStorage.setItem('item',item.name)  
       return setDropdown(item)
      } } className='ml-auto' /> : '' }
    </button>
    {dropdown.name == item.name || localItem == item.name ? <div className='w-[90%]'>{
      <ul>
        {item.dropdown?.map((d,i)=>{
          return(<li key={i} className={(location.pathname == d.path) ? 'body1 text-main' :"body1 text-greys mr-3"  }>
             <button
      onClick={() => {  
        setDropdown(item)
        navigate(d.path) 
      }}
      className={`w-full ml-6  p-2 flex items-center `}
    >
     
      <span className={location.pathname == d.path ? 'body1 text-main flex items-center gap-3' :"body1 text-greys mr-3"  }><span>{ location.pathname == d.path ? item.icon : ''}</span>   {d.name}</span>
     
    </button>
          </li>)
        })}
      
      </ul>
      }</div> : ''}
   </div>
  ) 
      })}

      </ul>
    </div>
   
    </>
  );
};

export default React.memo(Sidebar);
