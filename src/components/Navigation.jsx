import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Search, Bell, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Navigation() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-blue-600'
    }`;

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="bg-blue-600 rounded-lg p-2">
            <div className="w-6 h-6 bg-white rounded opacity-90"></div>
          </div>
          <span className="text-xl font-semibold text-gray-900">CampusZone</span>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <NavLink to="/dashboard" className={linkClass}>Dashboard</NavLink>
          <NavLink to="/lostfound" className={linkClass}>Lost &amp; Found</NavLink>
          <NavLink to="/events" className={linkClass}>Events</NavLink>
          <NavLink to="/pyq" className={linkClass}>PYQ Zone</NavLink>
          <NavLink to="/upload-demo" className={linkClass}>Upload Demo</NavLink>
        </div>

        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              className="hidden sm:block pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <Bell className="w-5 h-5 text-gray-600" />
          <div className="flex items-center space-x-2">
            <User className="w-8 h-8 text-gray-600 bg-gray-100 rounded-full p-1" />
            <span className="hidden sm:block text-sm font-medium text-gray-700">{user?.name || 'User'}</span>
          </div>
          <button onClick={handleLogout} className="text-sm text-red-600 hover:text-red-700">Logout</button>
        </div>
      </div>
    </nav>
  );
}