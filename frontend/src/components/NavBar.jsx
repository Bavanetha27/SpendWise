import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-black shadow-md fixed top-0 w-full z-50 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/"><img src={logo} alt="Logo" className="h-16 w-auto" /></Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <Link to="/" className="hover:text-blue-400">Home</Link>
            <Link to="/exp" className="hover:text-blue-400">ExpenseCalculator</Link>
            <Link to="/contact" className="hover:text-blue-400">Contact</Link>

            {/* Profile Icon with Dropdown */}
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="text-white p-2 hover:bg-gray-700 rounded-full"
              >
                <FaUserCircle size={24} />
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-200">Profile</Link>
                  <Link to="/dashboard" className="block px-4 py-2 hover:bg-gray-200">Dashboard</Link>
                </div>
              )}
            </div>

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition text-black dark:text-white"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            {/* Theme Toggle for Mobile */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 transition text-black dark:text-white"
            >
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>

            <button onClick={toggleMenu} className="text-white">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-black">
          <a href="#home" className="block text-white hover:text-blue-400">Home</a>
          <a href="#features" className="block text-white hover:text-blue-400">Features</a>
          <a href="#about" className="block text-white hover:text-blue-400">About</a>
          <a href="#contact" className="block text-white hover:text-blue-400">Contact</a>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
