import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHome, FaSearch, FaCode, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { useAuth } from '../context/store';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(window.innerWidth >= 768);
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      {!isOpen && (
        <button 
          onClick={toggleSidebar} 
          className="md:hidden fixed top-4 left-4 z-50 text-gray-800 bg-white p-2 rounded shadow-md hover:bg-gray-100 focus:outline-none"
        >
          <FaBars />
        </button>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      <div className={`
        bg-gray-900 text-white h-screen flex flex-col transition-all duration-300 ease-in-out
        fixed md:relative z-50
        ${isOpen ? 'w-64 translate-x-0' : 'w-64 md:w-20 -translate-x-full md:translate-x-0'}
      `}>
        <div className="p-4 flex items-center justify-between border-b border-gray-800">
          {isOpen && <h1 className="text-xl font-bold"><span className='text-2xl font-extrabold font-mono text-blue-500'>P</span>astebins</h1>}
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
    </>
  );
};

export default Sidebar;