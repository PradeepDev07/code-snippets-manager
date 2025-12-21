import React from 'react';
import Sidebar from '../components/Sidebar';

const Dashboardpage = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.firstName || 'User'}!</h1>
          <p className="text-gray-600">Manage your code snippets and discover new ones.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Dashboard Widgets */}
          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-500">
            <h3 className="text-xl font-bold mb-2">My Snippets</h3>
            <p className="text-3xl font-bold text-blue-600">0</p>
            <p className="text-gray-500 text-sm">Total snippets created</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
            <h3 className="text-xl font-bold mb-2">Favorites</h3>
            <p className="text-3xl font-bold text-green-600">0</p>
            <p className="text-gray-500 text-sm">Snippets you've saved</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-purple-500">
            <h3 className="text-xl font-bold mb-2">Recent Activity</h3>
            <p className="text-gray-500 text-sm">No recent activity</p>
          </div>
        </div>
        
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Quick Actions</h2>
            <div className="flex gap-4">
                <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors shadow-md">
                    Create New Snippet
                </button>
                <button className="bg-white text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-50 border border-gray-200 transition-colors shadow-sm">
                    Browse Public Snippets
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboardpage;