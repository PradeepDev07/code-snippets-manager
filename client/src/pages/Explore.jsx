import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import SnippetCard from '../components/SnippetCard';
import Navbar from '../components/Navbar';
import { SERVER_URL } from '../config';
import Cookies from 'js-cookies';
import Sidebar from '../components/Sidebar';

const Explore = () => {
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const isAuthenticated = !!Cookies.getItem('token');

  useEffect(() => {
    const fetchSnippets = async () => {
      try {
        const token = Cookies.getItem('token');
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

    fetchSnippets();
  }, []);

  const Content = () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Explore Snippets</h1>
      
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
            <SnippetCard key={snippet._id} snippet={snippet} />
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
          <Content />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Content />
    </div>
  );
};

export default Explore;
