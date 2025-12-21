import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/store';
import { hasPermission, PERMISSIONS } from '../config/permissions';
import { SERVER_URL } from '../config';
import Cookies from 'js-cookies';
import toast from 'react-hot-toast';

const SnippetCard = ({ snippet, onDelete }) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Check permissions
  // Note: snippet.createdBy might be an object (populated) or an ID string.
  const ownerId = snippet.createdBy?._id || snippet.createdBy;
  
  const canEdit = hasPermission(user, PERMISSIONS.UPDATE_SNIPPET, ownerId);
  const canDelete = hasPermission(user, PERMISSIONS.DELETE_SNIPPET, ownerId);

  const performDelete = async () => {
    try {
      const token = Cookies.getItem('token');
      const response = await fetch(`${SERVER_URL}/snippets/${snippet._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete snippet');
      }

      toast.success('Snippet deleted successfully');
      if (onDelete) onDelete(snippet._id);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDelete = () => {
    toast((t) => (
      <div className="flex flex-col gap-2 items-center">
        <p className="font-medium text-gray-800">Delete this snippet?</p>
        <div className="flex gap-2">
          <button
            onClick={() => {
              toast.dismiss(t.id);
              performDelete();
            }}
            className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 transition-colors"
          >
            Delete
          </button>
          <button
            onClick={() => toast.dismiss(t.id)}
            className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    ), {
      duration: 5000,
      position: 'top-center',
      style: {
        border: '1px solid #e5e7eb',
        padding: '16px',
        color: '#1f2937',
      },
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300 flex flex-col">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800 truncate pr-2">{snippet.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded whitespace-nowrap">
            {snippet.language}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{snippet.description}</p>
        <div className="flex flex-wrap gap-2">
          {snippet.tags && snippet.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="max-h-64 overflow-y-auto flex-1">
        <SyntaxHighlighter 
          language={snippet.language} 
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: 0, height: '100%' }}
          showLineNumbers={true}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
           <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
             {snippet.createdBy?.userName ? snippet.createdBy.userName[0].toUpperCase() : 'U'}
           </div>
           <span className="truncate max-w-[100px]">{snippet.createdBy?.userName || 'Unknown User'}</span>
        </div>
        
        <div className="flex items-center gap-3">
            {/* View Action */}
            <button 
                onClick={() => navigate('/editor', { state: { initialData: snippet, isReadOnly: true } })}
                className="text-gray-500 hover:text-blue-600 transition-colors"
                title="View Code"
            >
                <FaEye />
            </button>

            {canEdit && (
                <button 
                    onClick={() => navigate('/editor', { state: { initialData: snippet, isEdit: true } })}
                    className="text-gray-500 hover:text-green-600 transition-colors"
                    title="Edit Snippet"
                >
                    <FaEdit />
                </button>
            )}

            {canDelete && (
                <button 
                    onClick={handleDelete}
                    className="text-gray-500 hover:text-red-600 transition-colors"
                    title="Delete Snippet"
                >
                    <FaTrash />
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default SnippetCard;
