import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition">
          Placement Platform
        </Link>
        <nav className="flex gap-6">
          <Link to="/" className="text-gray-600 hover:text-blue-600 font-medium transition">
            About Us
          </Link>
          <Link to="/services" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Services
          </Link>
          <Link to="/certification" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Certifications
          </Link>
          <Link to="/current-jobs" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Current Jobs
          </Link>
          <Link to="/registration" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Register
          </Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-600 font-medium transition">
            Contact
          </Link>
          <Link to="/signup" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Sign Up
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
