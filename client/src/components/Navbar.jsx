import React from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaHome, FaSearch, FaSignInAlt, FaUserPlus, FaColumns } from 'react-icons/fa';
import Cookies from 'js-cookies';

const Navbar = () => {
  const isAuthenticated = !!Cookies.getItem('token');

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50 ">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-400 transition-colors">
          <FaCode className="text-blue-500" />
          <span>SnippetManager</span>
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <FaHome /> <span>Home</span>
          </Link>
          <Link to="/noauth-explore" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
            <FaSearch /> <span>Explore</span>
          </Link>
          <div className="h-6 w-px bg-gray-700 mx-2"></div>
          
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="flex items-center gap-1 hover:text-blue-400 transition-colors">
                <FaSignInAlt /> <span>Login</span>
              </Link>
              <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-md">
                <FaUserPlus /> <span>Sign Up</span>
              </Link>
            </>
          ) : (
            <Link to="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 shadow-md">
              <FaColumns /> <span>Dashboard</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
