import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBuilding, FaUser, FaProjectDiagram, FaCogs, FaSignOutAlt, FaSun, FaMoon } from 'react-icons/fa'; 
import { DarkModeContext } from './darkMode';

const Sidebar = () => {
  const [dropdown, setDropdown] = useState(null);
  const { darkMode } = useContext(DarkModeContext);

  const toggleDropdown = (item) => {
    setDropdown(dropdown === item ? null : item);
  };



  const menuItems = [
    { name: 'Dashboard', path: '/dashboard', icon: <FaHome /> },
    { name: 'Calendar', path: '/calendar', icon: <FaCalendarAlt /> },
    { name: 'Institutions', path: '/institutions', icon: <FaBuilding />, dropdown: ['Register', 'Region', 'Status', 'Stages'] },
    { name: 'Participants', path: '/participants', icon: <FaUser />, dropdown: ['Participant', 'Levels'] },
    { name: 'Project', path: '/project', icon: <FaProjectDiagram />, dropdown: ['Projects', 'Status', 'Testimonials', 'Donors'] },
    { name: 'Program', icon: <FaCogs />, dropdown: ['Programs'] },
    { name: 'Helpers', path: '/helpers', icon: <FaUser />, dropdown: ['Award Leaders', 'Volunteers'] },
    { name: 'Training', path: '/training', icon: <FaCogs />, dropdown: ['Trainings', 'Categories', 'Levels', 'Training Type'] },
    { name: 'Financial', path: '/financial', icon: <FaCogs />, dropdown: ['Budget', 'Budget Request', 'Funding Type'] },
    { name: 'Partnership', path: '/partnerships', icon: <FaCogs />, dropdown: ['Partners', 'Partner Type'] },
    { name: 'Research', path: '/research', icon: <FaCogs />, dropdown: ['Feedback', 'Feedback Type'] },
    { name: 'Reports', icon: <FaCogs />, dropdown: ['Participants', 'Institutions', 'Financial Reports'] },
    { name: 'Users', icon: <FaUser />, dropdown: ['User', 'User Type'] },

  ];

  return (
    <div className={`w-64 h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'} p-5`}>
      <div className="mb-5 flex items-center">

      </div>
     
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-1">
            <Link
              to={item.path || ''}
              className="w-full text-left p-2 flex items-center block hover:bg-gray-400 dark:hover:bg-gray-300 focus:outline-none"
              onClick={() => toggleDropdown(item.name)}
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </Link>
            {item.dropdown && dropdown === item.name && (
              <ul className="ml-4 mt-1">
                {item.dropdown.map((subItem, subIndex) => (
                  <li key={subIndex} className="mb-1">
                    <button className="w-full text-left p-2 hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none">
                      {subItem}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
