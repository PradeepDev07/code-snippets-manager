import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/store';
import { SERVER_URL } from '../config';
import Cookies from 'js-cookies';
import SnippetCard from '../components/SnippetCard';
import { useNavigate } from 'react-router-dom';
import { topProgramming } from '../constants';
import { FaPlus, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Dashboardpage = () => {
  const { user } = useAuth();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  // New Snippet State
  const [newSnippet, setNewSnippet] = useState({
    title: '',
    language: topProgramming[0]?.id || 'javascript',
    description: '',
    isPublic: false,
    tags: ''
  });

  useEffect(() => {
    const fetchMySnippets = async () => {
      try {
        const token = Cookies.getItem('token');
        const response = await fetch(`${SERVER_URL}/snippets/me`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const data = await response.json();
          setSnippets(data);
        } else {
          throw new Error('Failed to fetch snippets');
        }
      } catch (error) {
        console.error("Failed to fetch snippets", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMySnippets();
  }, []);

  const handleCreateStart = () => {
    setShowModal(true);
  };

  const handleModalSubmit = (e) => {
    e.preventDefault();
    // Navigate to editor with initial data
    navigate('/editor', { state: { initialData: newSnippet } });
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(prev => prev.filter(s => s._id !== id));
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <header className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.firstName || 'User'}!</h1>
            <p className="text-gray-600">Manage your code snippets and discover new ones.</p>
          </div>
          <button 
            onClick={handleCreateStart}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center gap-2"
          >
            <FaPlus /> Create New Snippet
          </button>
        </header>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-2">My Snippets</h3>
            <p className="text-3xl font-bold text-blue-600">{snippets.length}</p>
            <p className="text-gray-500 text-sm">Total snippets created</p>
          </div>
          {/* Add more stats if needed */}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-gray-800">My Snippets</h2>
        {loading ? (
           <div className="flex justify-center items-center h-32">
             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
           </div>
        ) : snippets.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-white rounded-lg">
            You haven't created any snippets yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map(snippet => (
              <SnippetCard key={snippet._id} snippet={snippet} onDelete={handleDeleteSnippet} />
            ))}
          </div>
        )}
      </div>

      {/* Create Snippet Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl relative">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Create New Snippet</h2>
            <form onSubmit={handleModalSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input 
                  type="text" 
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newSnippet.title}
                  onChange={(e) => setNewSnippet({...newSnippet, title: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
                <select 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  value={newSnippet.language}
                  onChange={(e) => setNewSnippet({...newSnippet, language: e.target.value})}
                >
                  {topProgramming.map(lang => (
                    <option key={lang.id} value={lang.id}>{lang.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="3"
                  value={newSnippet.description}
                  onChange={(e) => setNewSnippet({...newSnippet, description: e.target.value})}
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
                <input 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g. react, hooks, ui"
                  value={newSnippet.tags}
                  onChange={(e) => setNewSnippet({...newSnippet, tags: e.target.value})}
                />
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox" 
                  id="isPublic"
                  checked={newSnippet.isPublic}
                  onChange={(e) => setNewSnippet({...newSnippet, isPublic: e.target.checked})}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700">Make Public</label>
              </div>
              <button 
                type="submit" 
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors font-medium"
              >
                Continue to Editor
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboardpage;