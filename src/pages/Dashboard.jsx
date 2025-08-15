import React from 'react';
import { Calendar, MapPin, Clock } from 'lucide-react';
import { mockLostFoundItems, mockEvents, mockPYQs, mockRecentActivity } from '../data/mock';

const Dashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome back, John</h1>
        <p className="text-gray-600">Here's what's happening on campus</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <Calendar className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Upcoming Events</p>
              <p className="text-2xl font-bold">12</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <MapPin className="w-8 h-8 text-green-600 mr-3" />
            <div>
              <p className="text-sm text-gray-600">Lost Items</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-blue-600 font-bold">📄</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">PYQ Documents</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <span className="text-purple-600 font-bold">⭐</span>
            </div>
            <div>
              <p className="text-sm text-gray-600">Your Contributions</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lost & Found */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Lost & Found</h3>
              <button className="text-blue-600 text-sm hover:text-blue-700">View All</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {mockLostFoundItems.slice(0, 2).map((item) => (
              <div key={item.id} className="flex items-center space-x-3 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="w-8 h-8 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <div className="flex items-center text-xs text-gray-500 space-x-2">
                    <MapPin className="w-3 h-3" />
                    <span>{item.location}</span>
                    <Clock className="w-3 h-3" />
                    <span>{item.time}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  item.status === 'lost' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">Upcoming Events</h3>
              <button className="text-blue-600 text-sm hover:text-blue-700">See Calendar</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {mockEvents.map((event) => (
              <div key={event.id} className="border-l-4 border-blue-600 pl-4 hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <p className="font-medium text-sm">{event.title}</p>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <Clock className="w-3 h-3" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 space-x-2">
                  <MapPin className="w-3 h-3" />
                  <span>{event.location}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PYQ Zone */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">PYQ Zone</h3>
              <button className="text-blue-600 text-sm hover:text-blue-700">Browse All</button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {mockPYQs.map((pyq) => (
              <div key={pyq.id} className="hover:bg-gray-50 p-2 rounded-lg transition-colors">
                <div className="flex items-center space-x-2 mb-1">
                  <div className="w-6 h-6 bg-blue-100 rounded flex items-center justify-center">
                    <span className="text-xs text-blue-600">📄</span>
                  </div>
                  <span className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">{pyq.subject}</span>
                </div>
                <p className="font-medium text-sm">{pyq.title}</p>
                <div className="flex items-center text-xs text-gray-500 space-x-3">
                  <span>👁️ {pyq.year}</span>
                  <span>⭐ {pyq.downloads}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow-sm border">
        <div className="p-6 border-b">
          <h3 className="font-semibold">Recent Activity</h3>
        </div>
        <div className="p-6 space-y-4">
          {mockRecentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-3 hover:bg-gray-50 p-3 rounded-lg transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                activity.type === 'item' ? 'bg-blue-100' :
                activity.type === 'event' ? 'bg-green-100' : 'bg-purple-100'
              }`}>
                <span className="text-xs">
                  {activity.type === 'item' ? '📦' : activity.type === 'event' ? '📅' : '📄'}
                </span>
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm">{activity.title}</p>
                <p className="text-sm text-gray-600">{activity.description}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
