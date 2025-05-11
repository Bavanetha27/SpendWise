import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavBar";
import Home from "./components/Home";
import ExpenseCalculator from "./components/ExpenseCalculator";
import Dashboard from "./components/Dashboard";
import Footer from "./components/Footer";
import Contact from "./components/Contact";
import Profile from "./components/Profile";
import Auth from "./components/Auth";



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 transition-colors duration-500">
        <Navbar /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exp" element={<ExpenseCalculator />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
