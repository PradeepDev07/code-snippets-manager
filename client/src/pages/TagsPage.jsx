import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import SnippetCard from '../components/SnippetCard';
import { SERVER_URL } from '../config';
import Cookies from 'js-cookies';
import toast from 'react-hot-toast';

const TagsPage = () => {
  const { tag } = useParams();
  const [snippets, setSnippets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSnippetsByTag = async () => {
      setLoading(true);
      try {
        const token = Cookies.getItem('token');
        // Remove # if present (though usually it won't be in the param unless encoded)
        const cleanTag = tag.replace(/^#/, '');

        const response = await fetch(`${SERVER_URL}/snippets/tags/${encodeURIComponent(cleanTag)}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch snippets');
        }

        const data = await response.json();
        setSnippets(data);
      } catch (error) {
        console.error("Failed to fetch snippets", error);
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (tag) {
      fetchSnippetsByTag();
    }
  }, [tag]);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto h-screen">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Snippets tagged with <span className="text-blue-600">#{tag}</span>
          </h1>
        </header>

        {loading ? (
           <div className="flex justify-center items-center h-32">
             <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
           </div>
        ) : snippets.length === 0 ? (
          <div className="text-center text-gray-500 py-10 bg-white rounded-lg">
            No snippets found with this tag.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {snippets.map(snippet => (
              <SnippetCard key={snippet._id} snippet={snippet} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TagsPage;