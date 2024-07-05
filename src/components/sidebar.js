import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaCalendarAlt, FaBuilding, FaUser, FaProjectDiagram, FaCogs, FaSignOutAlt } from 'react-icons/fa';
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
    {
      name: 'Institutions',
      icon: <FaBuilding />,
      dropdown: [
        { name: 'Institution', path: '/institutions/addInstitutions' },
        { name: 'Counties', path: '/institutions/addCounties' },
        { name: 'Status', path: '/institutions/institutionStatus' },
        { name: 'Stages', path: '/institutions/institutionStages' },
      ]
    },
    {
      name: 'Participants',
      icon: <FaUser />,
      dropdown: [
        { name: 'Participant', path: '/participants/participant' },
        { name: 'Levels', path: '/participants/participantLevels' }
      ]
    },
    {
      name: 'Project',
      icon: <FaProjectDiagram />,
      dropdown: [
        { name: 'Projects', path: '/project/project' },
        { name: 'Status', path: '/project/projectStatus' },
        { name: 'Testimonials', path: '/project/testimonials' },
        { name: 'Donors', path: '/project/donors' }
      ]
    },
    {
      name: 'Program',
      icon: <FaCogs />,
      dropdown: [{ name: 'Program', path: '/program/program' }]
    },
    {
      name: 'Helpers',
      icon: <FaUser />,
      dropdown: [
        { name: 'Helper', path: '/helpers/helper' },
        { name: 'Helper Type', path: '/helpers/helperType' }
      ]
    },
    {
      name: 'Training',
      icon: <FaCogs />,
      dropdown: [
        { name: 'Training', path: '/training/training' },
        { name: 'Training Level', path: '/training/trainingLevel' },
        { name: 'Training Category', path: '/training/trainingCategory' },
        { name: 'Training Type', path: '/training/trainingType' }
      ]
    },
    {
      name: 'Financial',
      icon: <FaCogs />,
      dropdown: [
        { name: 'Budget', path: '/financials/budget' },
        { name: 'Funding Type', path: '/financials/fundingType' }
      ]
    },
    {
      name: 'Partnership',
      icon: <FaCogs />,
      dropdown: [
        { name: 'Partners', path: '/partnership/partnership' },
        { name: 'Partner Type', path: '/partnership/partnertype' }
      ]
    },
    {
      name: 'Research',
      icon: <FaCogs />,
      dropdown: [
        { name: 'Feedback', path: '/research/feedback' }]
    },
    {
      name: 'Reports',
      icon: <FaCogs />,
      dropdown: ['Participants', 'Institutions', 'Financial Reports']
    },
    {
      name: 'Users',
      icon: <FaUser />,
      dropdown: ['User', 'User Type']
    },
  ];

  return (
    <div className={`w-64 h-screen ${darkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'} p-5`}>
      <div className="mb-5 flex items-center">
        {/* Logo or brand name can go here */}
      </div>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-1">
            <button
              onClick={() => toggleDropdown(item.name)}
              className="w-full text-left p-2 flex items-center block hover:bg-gray-400 dark:hover:bg-gray-300 focus:outline-none"
            >
              <span className="mr-2">{item.icon}</span>
              {item.name}
            </button>
            {item.dropdown && dropdown === item.name && (
              <ul className="ml-4 mt-1">
                {item.dropdown.map((subItem, subIndex) => (
                  <li key={subIndex} className="mb-1">
                    {typeof subItem === 'object' ? (
                      <Link
                        to={subItem.path || ''}
                        className="w-full text-left p-2 hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none block"
                      >
                        {subItem.name}
                      </Link>
                    ) : (
                      <div className="w-full text-left p-2">{subItem}</div>
                    )}
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
