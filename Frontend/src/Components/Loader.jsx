import React from "react";
export default function Loader() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="relative">
        {/* Outer rotating ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500 animate-spin w-24 h-24"></div>
        
        {/* Middle pulsing ring */}
        <div className="absolute inset-2 rounded-full border-4 border-transparent border-b-pink-500 border-l-indigo-400 animate-spin w-20 h-20" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        
        {/* Inner glow circle */}
        <div className="absolute inset-6 rounded-full bg-purple-100 animate-pulse w-12 h-12 flex items-center justify-center">
          <div className="w-6 h-6 bg-indigo-500 rounded-full"></div>
        </div>
        
        {/* Orbiting dots */}
        <div className="absolute inset-0 animate-spin w-24 h-24" style={{ animationDuration: '3s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-indigo-500 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute inset-0 animate-spin w-24 h-24" style={{ animationDuration: '3s', animationDelay: '1s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-purple-500 rounded-full shadow-lg"></div>
        </div>
        <div className="absolute inset-0 animate-spin w-24 h-24" style={{ animationDuration: '3s', animationDelay: '2s' }}>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-pink-500 rounded-full shadow-lg"></div>
        </div>
      </div>
    </div>
  );
}