import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaCode, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import Cookies from 'js-cookies';
import toast from 'react-hot-toast';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    Cookies.removeItem('token');
    localStorage.removeItem('user');
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className={`bg-gray-900 text-white h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-20'} flex flex-col`}>
      <div className="p-4 flex items-center justify-between border-b border-gray-800">
        {isOpen && <h1 className="text-xl font-bold">SnippetManager</h1>}
        <button onClick={toggleSidebar} className="text-gray-400 hover:text-white focus:outline-none">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <nav className="flex-1 py-6">
        <ul className="space-y-2">
          <li>
            <Link to="/dashboard" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors">
              <FaHome className="text-xl" />
              {isOpen && <span className="ml-4">Dashboard</span>}
            </Link>
          </li>
          <li>
            <Link to="/explore" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors">
              <FaSearch className="text-xl" />
              {isOpen && <span className="ml-4">Explore</span>}
            </Link>
          </li>
          <li>
            <Link to="/dashboard/my-snippets" className="flex items-center px-4 py-3 hover:bg-gray-800 transition-colors">
              <FaCode className="text-xl" />
              {isOpen && <span className="ml-4">My Snippets</span>}
            </Link>
          </li>
        </ul>
      </nav>

      <div className="p-4 border-t border-gray-800">
        <button 
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-3 text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors rounded"
        >
          <FaSignOutAlt className="text-xl" />
          {isOpen && <span className="ml-4">Logout</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;