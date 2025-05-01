// Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="relative">
        {/* Outer spinning ring */}
        <div className="w-16 h-16 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>
        
        {/* Inner pulsing circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>
        
        {/* Loading text */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <p className="text-sm font-medium text-gray-600 animate-pulse">Loading...</p>
        </div>
      </div>
    </div>
  );
};

export default Loader;