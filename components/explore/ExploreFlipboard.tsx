import React from 'react';

export default function ExploreFlipboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto p-6">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
            Explore
          </h1>
          <p className="text-gray-600 text-lg">
            Discover new features and capabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-3">Medical Hub</h3>
            <p className="text-gray-600 text-sm mb-4">
              Access medical education, disease prevention, and administrative assistance.
            </p>
            <a 
              href="/medical-hub" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Medical Hub
            </a>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-3">Health Tracking</h3>
            <p className="text-gray-600 text-sm mb-4">
              Track your daily health metrics and wellness goals.
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Start Tracking
            </button>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border">
            <h3 className="font-bold text-gray-800 mb-3">Focus Timer</h3>
            <p className="text-gray-600 text-sm mb-4">
              Use the Pomodoro technique to boost productivity.
            </p>
            <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Start Focus Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
