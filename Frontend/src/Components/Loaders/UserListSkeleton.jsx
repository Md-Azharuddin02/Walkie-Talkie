import React from "react";

export default function UsreListSkeleton() {
  return (
    <div className="w-full max-w-sm mx-auto h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="px-4 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <div className="h-8 w-20 bg-gray-800 rounded animate-pulse"></div>
          <div className="flex gap-3">
            <div className="w-7 h-7 bg-gray-300 rounded animate-pulse"></div>
            <div className="w-7 h-7 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full h-11 bg-gray-50 border border-gray-200 rounded-lg flex items-center px-4">
          <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse mr-3"></div>
          <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="px-4 py-4 flex gap-3 border-b border-gray-50">
        <div className="px-4 py-2 bg-green-100 rounded-full">
          <div className="h-4 w-8 bg-green-400 rounded animate-pulse"></div>
        </div>
        <div className="px-4 py-2 bg-transparent">
          <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="px-4 py-2 bg-transparent">
          <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
        </div>
        <div className="px-4 py-2 bg-transparent">
          <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Chat Item 1 - Prince */}
        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-16 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Chat Item 2 - undefineddddddddf */}
        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-36 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Chat Item 3 - Hanuman */}
        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Chat Item 4 - Saurabh Sharma */}
        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-28 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Chat Item 5 - User_5493 */}
        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Additional skeleton items for scrolling */}
        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-32 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-28 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-20 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="px-4 py-4 flex items-center gap-3 hover:bg-gray-50 cursor-pointer border-b border-gray-50">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0 animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 w-24 bg-gray-800 rounded animate-pulse"></div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        /* Hide scrollbar */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

        /* Responsive adjustments */
        @media (min-width: 640px) {
          .max-w-sm {
            max-width: 24rem;
          }
        }

        @media (min-width: 768px) {
          .max-w-sm {
            max-width: 28rem;
          }
        }
      `}</style>
    </div>
  );
}