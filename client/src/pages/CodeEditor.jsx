import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { topProgramming } from '../constants';
import { FaSave, FaArrowLeft } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { SERVER_URL } from '../config';
import Cookies from 'js-cookies';

const CodeEditor = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { initialData, isEdit, isReadOnly } = location.state || {};
    
    const [snippet, setSnippet] = useState({
        title: '',
        language: 'javascript',
        description: '',
        isPublic: false,
        tags: '',
        code: '// Write your code here...',
        ...initialData
    });
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!snippet.title || !snippet.code) {
            toast.error("Title and Code are required");
            return;
        }

        setSaving(true);
        try {
            const token = Cookies.getItem('token');

            // Format tags
            const tagsArray = typeof snippet.tags === 'string'
                ? snippet.tags.split(',').map(t => t.trim()).filter(t => t)
                : snippet.tags;

            const payload = {
                ...snippet,
                tags: tagsArray
            };

            let url = `${SERVER_URL}/snippets`;
            let method = 'POST';

            if (isEdit && snippet._id) {
                url = `${SERVER_URL}/snippets/${snippet._id}`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to save snippet');
            }

            toast.success(`Snippet ${isEdit ? 'updated' : 'saved'} successfully!`);
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="flex min-h-screen bg-gray-100">
            <Sidebar />
            <div className="flex-1 flex flex-col h-screen">
                {/* Header */}
                <header className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center shadow-sm z-10">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate('/dashboard')} className="text-gray-500 hover:text-gray-700">
                            <FaArrowLeft />
                        </button>
                        <input
                            type="text"
                            value={snippet.title}
                            onChange={(e) => setSnippet({ ...snippet, title: e.target.value })}
                            disabled={isReadOnly}
                            className="text-xl font-bold text-gray-800 border-none focus:ring-0 outline-none bg-transparent placeholder-gray-400 disabled:opacity-70"
                            placeholder="Untitled Snippet"
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Public:</span>
                            <div
                                className={`w-12 h-6 rounded-full p-1 transition-colors ${snippet.isPublic ? 'bg-blue-600' : 'bg-gray-300'} ${isReadOnly ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}`}
                                onClick={() => !isReadOnly && setSnippet({ ...snippet, isPublic: !snippet.isPublic })}
                            >
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${snippet.isPublic ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </div>
                        </div>
                        {!isReadOnly && (
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                            >
                                <FaSave /> {saving ? 'Saving...' : (isEdit ? 'Update Snippet' : 'Save Snippet')}
                            </button>
                        )}
                    </div>
                </header>

                {/* Main Content */}
                <div className="flex-1 flex overflow-hidden">
                    {/* Editor Area */}
                    <div className="flex-1 bg-[#1e1e1e] relative overflow-hidden flex flex-col">
                        <div className="bg-[#2d2d2d] text-gray-400 px-4 py-2 text-xs flex justify-between items-center border-b border-[#3e3e3e]">
                            <span>main.{snippet.language === 'javascript' ? 'js' : snippet.language === 'python' ? 'py' : 'txt'}</span>
                            <span className="uppercase">{snippet.language}</span>
                        </div>
                        <textarea
                            value={snippet.code}
                            onChange={(e) => setSnippet({ ...snippet, code: e.target.value })}
                            disabled={isReadOnly}
                            className="flex-1 w-full h-full bg-[#1e1e1e] text-[#d4d4d4] p-4 font-mono text-sm outline-none resize-none border-none focus:ring-0 leading-relaxed disabled:opacity-80"
                            spellCheck="false"
                        ></textarea>
                    </div>

                    {/* Settings Sidebar */}
                    <div className="w-80 bg-white border-l border-gray-200 p-6 overflow-y-auto">
                        <h3 className="font-bold text-gray-700 mb-4">Snippet Settings</h3>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Language</label>
                                <select
                                    value={snippet.language}
                                    onChange={(e) => setSnippet({ ...snippet, language: e.target.value })}
                                    disabled={isReadOnly}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                                >
                                    {topProgramming.map(lang => (
                                        <option key={lang.id} value={lang.id}>{lang.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Description</label>
                                <textarea
                                    value={snippet.description}
                                    onChange={(e) => setSnippet({ ...snippet, description: e.target.value })}
                                    disabled={isReadOnly}
                                    rows="4"
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none resize-none disabled:bg-gray-100"
                                    placeholder="Describe what this snippet does..."
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-600 mb-1">Tags</label>
                                <input
                                    type="text"
                                    value={snippet.tags}
                                    onChange={(e) => setSnippet({ ...snippet, tags: e.target.value })}
                                    disabled={isReadOnly}
                                    className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 outline-none disabled:bg-gray-100"
                                    placeholder="comma, separated, tags"
                                />
                                <p className="text-xs text-gray-400 mt-1">Separate tags with commas</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CodeEditor;
