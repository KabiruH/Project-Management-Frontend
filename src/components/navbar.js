import React, { useState, useContext } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { DarkModeContext } from './darkMode'

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { darkMode, toggleDarkMode } = useContext(DarkModeContext);


    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        // Implement logout functionality here
        console.log('Logged out');
    };

    return (
        <div className={`w-full h-16 ${darkMode ? 'bg-black text-white' : 'bg-gray-200 text-black'} flex items-center justify-between px-5`}>
            <button className="flex items-center">
                <Link to="/" className="flex items-center">
                    <img src='../assets/logo.png' alt='Logo' className="w-10 h-10 mr-2" />
                    <span className="font-semibold text-lg">The President's Award - Kenya</span>
                </Link>
            </button>
            <div className="flex items-center relative">
                <button
                    onClick={toggleDarkMode}
                    className="focus:outline-none flex items-center mr-4"
                >
                    {darkMode ? <FaSun className="w-6 h-6 mr-2" /> : <FaMoon className="w-6 h-6 mr-2" />}
                    <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <div className="relative">
                    <img
                        src='../assets/logo.png'
                        alt='User Profile'
                        className="w-10 h-10 rounded-full cursor-pointer"
                        onClick={toggleDropdown}
                    />
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg py-2">
                            <Link
                                to="/settings"
                                className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                                onClick={() => setDropdownOpen(false)}
                            >
                                Settings
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
