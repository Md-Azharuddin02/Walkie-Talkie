import React from "react";

export default function ChatConversationSkeleton() {
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Left Sidebar */}
      <div className="hidden lg:flex w-16 bg-white border-r border-gray-200 flex-col items-center py-4 space-y-4">
        {/* Mail Icon with Badge */}
        <div className="relative">
          <div className="w-10 h-10 bg-blue-100 rounded-lg animate-pulse flex items-center justify-center">
            <div className="w-5 h-4 bg-blue-300 rounded animate-pulse"></div>
          </div>
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
        </div>
        
        {/* Other Icons */}
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        
        {/* Spacer */}
        <div className="flex-1"></div>
        
        {/* Bottom Icons */}
        <div className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
        <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
      </div>

      {/* Chat List Panel */}
      <div className="hidden md:flex w-80 lg:w-96 bg-white border-r border-gray-200 flex-col">
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="h-7 w-20 bg-gray-800 rounded animate-pulse"></div>
            <div className="flex gap-3">
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
              <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="w-full h-10 bg-gray-50 border border-gray-200 rounded-lg flex items-center px-3">
            <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse mr-2"></div>
            <div className="h-3 w-28 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="px-5 py-3 flex gap-3">
          <div className="px-4 py-1.5 bg-green-100 rounded-full">
            <div className="h-4 w-8 bg-green-400 rounded animate-pulse"></div>
          </div>
          <div className="px-4 py-1.5 bg-gray-100 rounded-full">
            <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="px-4 py-1.5 bg-gray-100 rounded-full">
            <div className="h-4 w-16 bg-gray-300 rounded animate-pulse"></div>
          </div>
          <div className="px-4 py-1.5 bg-gray-100 rounded-full">
            <div className="h-4 w-14 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {[...Array(8)].map((_, idx) => (
            <div key={idx} className="px-5 py-3 flex items-center gap-3 hover:bg-gray-50">
              <div className="w-12 h-12 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 w-24 bg-gray-800 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Chat Header */}
        <div className="h-16 border-b border-gray-200 px-4 sm:px-6 flex items-center justify-between">
          {/* Back button for mobile */}
          <div className="flex items-center gap-3">
            <div className="md:hidden w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            
            {/* User Info */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              <div>
                <div className="h-4 w-32 bg-gray-800 rounded animate-pulse mb-1"></div>
                <div className="h-3 w-20 bg-green-200 rounded animate-pulse"></div>
              </div>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
            <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {/* Received Message 1 */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 sm:p-4">
                <div className="h-3 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="h-2 w-12 bg-gray-200 rounded animate-pulse mt-1 ml-2"></div>
            </div>
          </div>

          {/* Sent Message 1 */}
          <div className="flex items-start gap-2 sm:gap-3 justify-end">
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg flex flex-col items-end">
              <div className="bg-blue-500 rounded-2xl rounded-tr-sm p-3 sm:p-4">
                <div className="h-3 w-48 bg-blue-400 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-32 bg-blue-400 rounded animate-pulse"></div>
              </div>
              <div className="h-2 w-12 bg-gray-200 rounded animate-pulse mt-1 mr-2"></div>
            </div>
            <div className="w-8 h-8 bg-blue-300 rounded-full flex-shrink-0 animate-pulse"></div>
          </div>

          {/* Received Message 2 */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 sm:p-4">
                <div className="h-3 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-2/3 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="h-2 w-12 bg-gray-200 rounded animate-pulse mt-1 ml-2"></div>
            </div>
          </div>

          {/* Sent Message 2 */}
          <div className="flex items-start gap-2 sm:gap-3 justify-end">
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg flex flex-col items-end">
              <div className="bg-blue-500 rounded-2xl rounded-tr-sm p-3 sm:p-4">
                <div className="h-3 w-56 bg-blue-400 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-40 bg-blue-400 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-28 bg-blue-400 rounded animate-pulse"></div>
              </div>
              <div className="h-2 w-12 bg-gray-200 rounded animate-pulse mt-1 mr-2"></div>
            </div>
            <div className="w-8 h-8 bg-blue-300 rounded-full flex-shrink-0 animate-pulse"></div>
          </div>

          {/* Received Message 3 */}
          <div className="flex items-start gap-2 sm:gap-3">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex-shrink-0 animate-pulse"></div>
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg">
              <div className="bg-gray-100 rounded-2xl rounded-tl-sm p-3 sm:p-4">
                <div className="h-3 w-full bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-5/6 bg-gray-300 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-3/4 bg-gray-300 rounded animate-pulse"></div>
              </div>
              <div className="h-2 w-12 bg-gray-200 rounded animate-pulse mt-1 ml-2"></div>
            </div>
          </div>

          {/* Sent Message 3 */}
          <div className="flex items-start gap-2 sm:gap-3 justify-end">
            <div className="flex-1 max-w-xs sm:max-w-md lg:max-w-lg flex flex-col items-end">
              <div className="bg-blue-500 rounded-2xl rounded-tr-sm p-3 sm:p-4">
                <div className="h-3 w-44 bg-blue-400 rounded animate-pulse"></div>
              </div>
              <div className="h-2 w-12 bg-gray-200 rounded animate-pulse mt-1 mr-2"></div>
            </div>
            <div className="w-8 h-8 bg-blue-300 rounded-full flex-shrink-0 animate-pulse"></div>
          </div>
        </div>

        {/* Message Input Area */}
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Attachment Button */}
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
            
            {/* Input Field */}
            <div className="flex-1 h-12 bg-gray-100 border border-gray-200 rounded-full px-4 flex items-center">
              <div className="h-4 w-32 sm:w-48 bg-gray-300 rounded animate-pulse"></div>
            </div>
            
            {/* Emoji Button */}
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse flex-shrink-0"></div>
            
            {/* Send Button */}
            <div className="w-10 h-10 bg-blue-400 rounded-full animate-pulse flex-shrink-0"></div>
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

        /* Responsive adjustments */
        @media (max-width: 767px) {
          .md\\:hidden {
            display: block !important;
          }
          .md\\:flex {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}