import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SnippetCard from '../components/SnippetCard';
import Navbar from '../components/Navbar';
import { SERVER_URL } from '../config';
import Cookies from 'js-cookies';
import Sidebar from '../components/Sidebar';
import { topProgramming } from '../constants';

const Explore = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search State
  const [searchType, setSearchType] = useState('language');
  const [searchLanguage, setSearchLanguage] = useState(topProgramming[0]?.id || 'javascript');
  const [searchText, setSearchText] = useState('');

  const token = Cookies.getItem('token');
  const isAuthenticated = !!token;

  const fetchSnippets = async () => {
    setLoading(true);
    try {
      let url = `${SERVER_URL}/snippets/public`;
      let headers = {};

      if (token) {
        url = `${SERVER_URL}/snippets`;
        headers = {
          'Authorization': `Bearer ${token}`
        };
      }

      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error('Failed to fetch snippets');
      }
      const data = await response.json();
      setSnippets(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSnippets();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast.error("Please login to search snippets");
      return;
    }

    const trimmedText = searchText.trim();

    if ((searchType === 'tag' || searchType === 'userName') && !trimmedText) {
        toast.error(`Please enter a ${searchType === 'userName' ? 'username' : 'tag'}`);
        return;
    }

    setLoading(true);
    setError(null);

    try {
      let url = `${SERVER_URL}/snippets/search?`;

      if (searchType === 'language') {
        url += `language=${searchLanguage}`;
      } else if (searchType === 'tag') {
        url += `tag=${encodeURIComponent(trimmedText)}`;
      } else if (searchType === 'userName') {
        url += `userName=${encodeURIComponent(trimmedText)}`;
      }
      console.log("Search URL:", url);

      const headers = {
        'Authorization': `Bearer ${token}`
      };

      const response = await fetch(url, { headers });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Session expired. Please login again.");
        }
        throw new Error('Failed to search snippets');
      }

      const data = await response.json();
      setSnippets(data);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchTypeChange = (e) => {
    setSearchType(e.target.value);
    setSearchText('');
  };

  const handleDeleteSnippet = (id) => {
    setSnippets(prev => prev.filter(s => s._id !== id));
  };

  const pageContent = (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Explore Snippets</h1>

      {/* Search Component */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Search By</label>
            <select
              value={searchType}
              onChange={handleSearchTypeChange}
              className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="language">Language</option>
              <option value="tag">Tag</option>
              <option value="userName">Username</option>
            </select>
          </div>

          <div className="w-full md:flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {searchType === 'language' ? 'Select Language' : `Enter ${searchType === 'userName' ? 'Username' : 'Tag'}`}
            </label>
            {searchType === 'language' ? (
              <select
                value={searchLanguage}
                onChange={(e) => setSearchLanguage(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {topProgramming.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                placeholder={`Type ${searchType === 'userName' ? 'username' : 'tag'}...`}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                className="w-full p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )}
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full md:w-auto bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-sm"
            >
              Search
            </button>
          </div>
        </form>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">
          Error: {error}
        </div>
      ) : snippets.length === 0 ? (
        <div className="text-center text-gray-600 py-10 bg-white rounded-lg shadow-sm">
          <p className="text-xl">No snippets found.</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {snippets.map((snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} onDelete={handleDeleteSnippet} />
          ))}
        </div>
      )}
    </div>
  );

  if (isAuthenticated) {
    return (
      <div className="flex min-h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 overflow-y-auto h-screen">
          {pageContent}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      {pageContent}
    </div>
  );
};

export default Explore;
