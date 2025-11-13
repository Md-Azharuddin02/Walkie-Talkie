import React from 'react';
export default function UserListLoader() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white px-4 py-4 flex items-center justify-between border-b border-gray-200">
        <h1 className="text-xl font-semibold text-gray-900">Chats</h1>
        <div className="flex gap-3">
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-white px-4 py-3">
        <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white px-4 py-3 flex gap-3 border-b border-gray-200">
        <div className="h-8 w-16 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-8 w-24 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="h-8 w-20 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* User List Skeletons */}
      <div className="bg-white">
        {[...Array(10)].map((_, index) => (
          <div 
            key={index} 
            className="px-4 py-4 flex items-center gap-3 border-b border-gray-100"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {/* Avatar Skeleton */}
            <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
            
            {/* Name Skeleton */}
            <div className="flex-1">
              <div 
                className="h-4 bg-gray-200 rounded animate-pulse"
                style={{ width: `${60 + Math.random() * 40}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}