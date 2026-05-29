import { useContext, useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaBars, FaTimes, FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";
import logo from "../assets/logo.png";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("darkmode") === "true";
  });

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleTheme = () => setDarkMode(!darkMode);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const { user, dispatch } = useContext(AuthContext);
  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkmode", darkMode);
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    setDropdownOpen(false);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;
  const linkBaseClass = "relative px-3 py-2 text-sm font-medium transition-all duration-300";
  const linkActiveClass = "text-brand-500 dark:text-brand-400";
  const linkInactiveClass = "text-gray-600 dark:text-gray-300 hover:text-brand-500 dark:hover:text-brand-400";

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'py-2' : 'py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`glass rounded-2xl flex justify-between items-center px-6 transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 hover:scale-105 transition-transform duration-300">
             <Link to="/" className="flex items-center gap-2">
                <HiOutlineSparkles className="text-brand-500 text-3xl" />
                <span className="font-display font-bold text-2xl tracking-tight text-gray-900 dark:text-white">
                  SpendWise
                </span>
             </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className={`${linkBaseClass} ${isActive('/') ? linkActiveClass : linkInactiveClass}`}>
              Home
              {isActive('/') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>}
            </Link>

            {!isLoggedIn ? (
              <>
                <Link to="/login" className={`${linkBaseClass} ${isActive('/login') ? linkActiveClass : linkInactiveClass}`}>
                  Login
                  {isActive('/login') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>}
                </Link>
                <Link to="/signup" className="ml-4 px-6 py-2.5 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-medium hover:bg-gray-800 dark:hover:bg-gray-100 hover:scale-105 transition-all shadow-lg hover:shadow-xl">
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link to="/exp" className={`${linkBaseClass} ${isActive('/exp') ? linkActiveClass : linkInactiveClass}`}>
                  Calculator
                  {isActive('/exp') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>}
                </Link>
                <Link to="/contact" className={`${linkBaseClass} ${isActive('/contact') ? linkActiveClass : linkInactiveClass}`}>
                  Contact
                  {isActive('/contact') && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-500 rounded-full"></span>}
                </Link>

                {/* Profile Icon with Dropdown */}
                <div className="relative ml-2">
                  <button
                    onClick={toggleDropdown}
                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors focus:outline-none"
                  >
                    <FaUserCircle size={24} className="text-gray-700 dark:text-gray-300" />
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-3 w-56 glass rounded-xl shadow-2xl py-2 animate-fade-in-up border border-gray-200 dark:border-dark-border">
                      <Link to="/profile" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border/50 hover:text-brand-500 transition-colors">Profile</Link>
                      <Link to="/dashboard" className="block px-4 py-2.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-border/50 hover:text-brand-500 transition-colors">Dashboard</Link>
                      <div className="border-t border-gray-100 dark:border-dark-border my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="ml-2 p-2.5 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-all duration-300 text-gray-600 dark:text-gray-400 hover:text-brand-500 dark:hover:text-brand-400 hover:rotate-12"
            >
              {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-dark-border transition-colors text-gray-600 dark:text-gray-400"
            >
              {darkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>

            <button onClick={toggleMenu} className="p-2 text-gray-600 dark:text-gray-400 hover:text-brand-500 transition-colors">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full px-4 pt-2 pb-4">
          <div className="glass rounded-2xl p-4 flex flex-col space-y-2 animate-fade-in-up">
            <Link to="/" className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/50 text-gray-800 dark:text-gray-200">Home</Link>
            {!isLoggedIn ? (
              <>
                <Link to="/login" className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/50 text-gray-800 dark:text-gray-200">Login</Link>
                <Link to="/signup" className="px-4 py-3 rounded-xl bg-brand-500 text-white font-medium text-center mt-2">Get Started</Link>
              </>
            ) : (
              <>
                <Link to="/exp" className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/50 text-gray-800 dark:text-gray-200">Calculator</Link>
                <Link to="/contact" className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/50 text-gray-800 dark:text-gray-200">Contact</Link>
                <Link to="/profile" className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/50 text-gray-800 dark:text-gray-200">Profile</Link>
                <Link to="/dashboard" className="px-4 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-dark-border/50 text-gray-800 dark:text-gray-200">Dashboard</Link>
                <button onClick={handleLogout} className="px-4 py-3 rounded-xl text-left text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20">
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

