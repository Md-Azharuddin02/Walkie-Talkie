import React from "react";

const NoChatSelected = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 md:p-8">
      <div className="text-center max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg px-4">
        {/* Animated Icon */}
        <div className="relative mb-6 sm:mb-8 inline-block">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-blue-400 rounded-full blur-2xl sm:blur-3xl opacity-10 animate-pulse"></div>
          
          {/* Main icon container */}
          <div className="relative bg-white p-6 sm:p-8 md:p-10 rounded-full shadow-lg">
            <svg 
              className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-gray-400"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={1.5} 
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" 
              />
            </svg>
          </div>
          
          {/* Floating dots */}
          <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 w-3 h-3 sm:w-4 sm:h-4 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="absolute -bottom-1 -left-1 sm:-bottom-2 sm:-left-2 w-2 h-2 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-bounce [animation-delay:0.3s]"></div>
        </div>

        {/* Main heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">
          No Chat Selected
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-sm sm:text-base md:text-lg mb-1 sm:mb-2 px-2">
          Select a chat from the sidebar to start
        </p>
        <p className="text-gray-500 text-xs sm:text-sm md:text-base mb-6 sm:mb-8 px-2">
          or begin a new conversation
        </p>


        {/* Decorative elements */}
        <div className="mt-8 sm:mt-10 md:mt-12 flex justify-center space-x-2 sm:space-x-3">
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-pulse"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-300 rounded-full animate-pulse [animation-delay:0.2s]"></div>
          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-200 rounded-full animate-pulse [animation-delay:0.4s]"></div>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;