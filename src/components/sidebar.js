import React, { useState, useEffect } from 'react';

const Sidebar = () => {
  const [dropdown, setDropdown] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDropdown = (item) => {
    setDropdown(dropdown === item ? null : item);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (darkMode) {
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const menuItems = [
    { name: 'Dashboard'},
    { name: 'Calendar' },
    { name: 'Institutions', dropdown: ['Register', 'Region', 'Status', 'Stages'] },
    { name: 'Participants', dropdown: ['Participant', 'Levels'] },
    { name: 'Project', dropdown: ['Projects', 'Status', 'Testimonials', 'Donors'] },
    { name: 'Program', dropdown: ['Programs'] },
    { name: 'Helpers', dropdown: ['Award Leaders', 'Volunteers'] },
    { name: 'Training', dropdown: ['Trainings', 'Categories', 'Levels', 'Training Type'] },
    { name: 'Financial', dropdown: ['Budget', 'Budget Request', 'Funding Type'] },
    { name: 'Partnership', dropdown: ['Partners', 'Partner Type'] },
    { name: 'Research', dropdown: ['Feedback', 'Feedback Type'] },
    { name: 'Reports', dropdown: ['Participants', 'Institutions', 'Financial Reports'] },
    { name: 'Users', dropdown: ['User', 'User Type'] },
    { name: 'Settings' },
    { name: 'Logout' },
  ];

  return (
    <div className={`w-64 h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'} p-5`}>
      <div className="mb-5 flex items-center">
        <img src="./assets/logo.png" alt='' qclassName="w-10 h-10 mr-2" />
        <span className="font-semibold text-lg">The President's Award - Kenya</span>
      </div>
      <button
        onClick={toggleDarkMode}
        className="focus:outline-none">
          <img
            src={darkMode ? "./assets/light-mode-icon.png" : "./assets/dark-mode-icon.png"}
            alt=''
            className="w-6 h-6"
          />
      </button>
      <ul>
        {menuItems.map((item, index) => (
          <li key={index} className="mb-1">
            <button
              className="w-full text-left p-2 hover:bg-gray-400 dark:hover:bg-gray-700 focus:outline-none"
              onClick={() => toggleDropdown(item.name)}
            >
              {item.name}
            </button>
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
