import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import ExpenseCalculator from "./components/ExpenseCalculator";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Profile from "./components/Profile";


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
        <Navbar /> {/* ✅ This appears on all pages */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exp" element={<ExpenseCalculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
