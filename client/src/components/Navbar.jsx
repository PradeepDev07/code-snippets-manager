import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCode, FaHome, FaSearch, FaSignInAlt, FaUserPlus, FaColumns, FaBars, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookies';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const isAuthenticated = !!Cookies.getItem('token');

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-400 transition-colors">
            <FaCode className="text-blue-500" />
            <h1 className="text-xl font-bold"><span className='text-2xl font-extrabold font-mono text-blue-500'>P</span>astebins</h1>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-white focus:outline-none p-2">
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-4 flex flex-col bg-gray-800 rounded-lg p-4 shadow-xl border border-gray-700 animate-fadeIn">
            <Link to="/" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-400 transition-colors py-2 border-b border-gray-700">
              <FaHome /> <span>Home</span>
            </Link>
            <Link to="/noauth-explore" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-400 transition-colors py-2 border-b border-gray-700">
              <FaSearch /> <span>Explore</span>
            </Link>
            
            {!isAuthenticated ? (
              <>
                <Link to="/login" onClick={toggleMenu} className="flex items-center gap-2 hover:text-blue-400 transition-colors py-2">
                  <FaSignInAlt /> <span>Login</span>
                </Link>
                <Link to="/signup" onClick={toggleMenu} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md mt-2">
                  <FaUserPlus /> <span>Sign Up</span>
                </Link>
              </>
            ) : (
              <Link to="/dashboard" onClick={toggleMenu} className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 transition-all shadow-md mt-2">
                <FaColumns /> <span>Dashboard</span>
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
