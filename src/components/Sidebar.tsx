import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, MessageSquare, Video, Menu, X } from 'lucide-react';

export const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile menu button - visible only on small screens */}
      <button 
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 left-4 z-50 bg-white p-2 rounded-md shadow-md"
        aria-label="Toggle menu"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Sidebar - different styles for mobile vs desktop */}
      <div className={`
        bg-white h-screen border-r z-50
        fixed lg:static 
        ${isMobileMenuOpen ? 'left-0' : '-left-64'}
        transition-all duration-300 ease-in-out
        w-64
      `}>
        <div className="p-4 pt-16 lg:pt-4">
          <h1 className="text-xl font-bold mb-8">Travel Planner</h1>
          <nav className="space-y-2">
            <Link
              to="/"
              className={`flex items-center gap-3 p-3 rounded-lg ${
                location.pathname === '/' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Home size={20} />
              <span>Dashboard</span>
            </Link>
            <Link
              to="/chat"
              className={`flex items-center gap-3 p-3 rounded-lg ${
                location.pathname === '/chat' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <MessageSquare size={20} />
              <span>Chat & Map</span>
            </Link>
            <Link
              to="/explore"
              className={`flex items-center gap-3 p-3 rounded-lg ${
                location.pathname === '/explore' ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Video size={20} />
              <span>Explore</span>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};