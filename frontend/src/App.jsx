import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import ExpenseCalculator from "./components/ExpenseCalculator";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Login from "./components/Login";
import Signup from "./components/Signup";

const AppContent = () => {
  const location = useLocation();
  const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/signup';

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0B0C10] text-gray-900 dark:text-gray-100 transition-colors duration-500 font-sans relative flex flex-col">
      {!hideNavAndFooter && <Navbar />}
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exp" element={<ExpenseCalculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
