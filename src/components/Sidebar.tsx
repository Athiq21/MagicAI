import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white h-screen border-r">
      <div className="p-4">
        <h1 className="text-xl font-bold mb-8">Travel Planner</h1>
        <nav className="space-y-2">
          <Link
            to="/"
            className={`flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/chat"
            className={`flex items-center gap-3 p-3 rounded-lg ${
              location.pathname === '/chat' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MessageSquare size={20} />
            <span>Chat & Map</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};