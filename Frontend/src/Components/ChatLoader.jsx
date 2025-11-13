import React from 'react';
export default function ChatLoader() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Icon skeleton */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" 
               style={{
                 animation: 'shimmer 1.5s infinite linear, float 3s ease-in-out infinite'
               }}>
          </div>
        </div>
        
        {/* Title skeleton */}
        <div className="flex justify-center mb-4">
          <div className="h-7 w-40 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%]"
               style={{
                 animation: 'shimmer 1.5s infinite linear, fadeInOut 2s ease-in-out infinite',
                 animationDelay: '0s, 0.2s'
               }}>
          </div>
        </div>
        
        {/* Description skeleton - two lines */}
        <div className="flex flex-col items-center gap-2">
          <div className="h-4 w-64 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%]"
               style={{
                 animation: 'shimmer 1.5s infinite linear, fadeInOut 2s ease-in-out infinite',
                 animationDelay: '0s, 0.4s'
               }}>
          </div>
          <div className="h-4 w-48 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded bg-[length:200%_100%]"
               style={{
                 animation: 'shimmer 1.5s infinite linear, fadeInOut 2s ease-in-out infinite',
                 animationDelay: '0s, 0.6s'
               }}>
          </div>
        </div>
        
        <style>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          
          @keyframes float {
            0%, 100% {
              transform: translateY(0px) scale(1);
            }
            50% {
              transform: translateY(-10px) scale(1.05);
            }
          }
          
          @keyframes fadeInOut {
            0%, 100% {
              opacity: 0.4;
            }
            50% {
              opacity: 1;
            }
          }
        `}</style>
      </div>
    </div>
  );
}