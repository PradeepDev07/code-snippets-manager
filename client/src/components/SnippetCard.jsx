import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SnippetCard = ({ snippet }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="p-4 border-b border-gray-100">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold text-gray-800">{snippet.title}</h3>
          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">
            {snippet.language}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-3">{snippet.description}</p>
        <div className="flex flex-wrap gap-2">
          {snippet.tags && snippet.tags.map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>
      </div>
      
      <div className="max-h-64 overflow-y-auto">
        <SyntaxHighlighter 
          language={snippet.language} 
          style={vscDarkPlus}
          customStyle={{ margin: 0, borderRadius: 0 }}
          showLineNumbers={true}
        >
          {snippet.code}
        </SyntaxHighlighter>
      </div>

      <div className="p-3 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center gap-2">
           {/* Placeholder for user avatar if available, or initials */}
           <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs">
             {snippet.createdBy?.userName ? snippet.createdBy.userName[0].toUpperCase() : 'U'}
           </div>
           <span>{snippet.createdBy?.userName || 'Unknown User'}</span>
        </div>
        <span>{new Date(snippet.createdAt).toLocaleDateString()}</span>
      </div>
    </div>
  );
};

export default SnippetCard;
