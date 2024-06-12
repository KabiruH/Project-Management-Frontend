import React, { useState } from 'react';

const Sidebar = () => {
  const [dropdown, setDropdown] = useState(null);

  const toggleDropdown = (item) => {
    setDropdown(dropdown === item ? null : item);
  };

  const menuItems = [
    { name: 'Dashboard' , dropdown: ['Participant', 'Project', 'Program']},
    { name: 'Calendar' },
    { name: 'Institutions', dropdown: ['Register', 'Region', 'Status', 'Stages'] },
    { name: 'Participants' , dropdown: ['Participant', 'Levels']},
    { name: 'Project' , dropdown: ['Projects', 'Status', 'Testimonials', 'Donors']},
    { name: 'Program' , dropdown: ['Programs']},
    { name: 'Helpers' , dropdown: ['Award Leaders', 'Volunteers']},
    { name: 'Training' , dropdown: ['Trainings', 'Cartegories', 'Levels', 'Training Type']},
    { name: 'Financial' , dropdown: ['Budget', 'Budget Request', 'Funding Type']},
    { name: 'Partnership' , dropdown: ['Partners', 'Partner Type']},
    { name: 'Research' , dropdown: ['Feedback', 'Feedback Type']},
    { name: 'Reports' , dropdown: ['Participants', 'Institutions', 'Financial Reports']},
    { name: 'Users' , dropdown: ['User', 'User Type']},
    { name: 'Settings' },
    { name: 'Logout' },
  ];

  return (
    <div className="w-64 h-screen bg-gray-800 text-white p-5">
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-2">
            <button
              className="w-full text-left p-2 hover:bg-gray-700 focus:outline-none"
              onClick={() => toggleDropdown(item.name)}
            >
              {item.name}
            </button>
            {item.dropdown && dropdown === item.name && (
              <ul className="ml-4 mt-2">
                {item.dropdown.map((subItem, subIndex) => (
                  <li key={subIndex} className="mb-1">
                    <button className="w-full text-left p-2 hover:bg-gray-700 focus:outline-none">
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
