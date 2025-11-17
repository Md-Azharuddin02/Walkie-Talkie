import React from "react";

export default function LoadingSkeleton() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" style={{animation: "pulse 3s ease-in-out infinite 1s"}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" style={{animation: "pulse 3s ease-in-out infinite 0.5s"}}></div>
      </div>

      <div className="relative z-10 w-full max-w-md lg:max-w-lg xl:max-w-xl">
        {/* Card Container */}
        <div className="bg-white/70 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/50 p-6 sm:p-8 md:p-10 lg:p-12">
          
          {/* Header Section */}
          <div className="text-center mb-8 md:mb-10">
            {/* Icon Skeleton */}
            <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl mb-4 md:mb-6 shadow-lg animate-pulse"></div>
            
            {/* Title Skeleton */}
            <div className="flex justify-center mb-3">
              <div className="h-8 sm:h-10 md:h-12 w-64 sm:w-80 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 rounded-lg animate-pulse"></div>
            </div>
            
            {/* Subtitle Skeleton */}
            <div className="flex justify-center">
              <div className="h-4 sm:h-5 w-48 sm:w-60 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>

          {/* Phone Input Section */}
          <div className="space-y-4 mb-6">
            {/* Input Field Skeleton */}
            <div className="relative">
              <div className="w-full h-12 sm:h-14 md:h-16 bg-white/80 border-2 border-gray-200 rounded-xl shadow-sm flex items-center px-4">
                {/* +91 Skeleton */}
                <div className="h-5 w-10 bg-gray-300 rounded animate-pulse mr-3"></div>
                {/* Placeholder Text Skeleton */}
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Action Buttons Section */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-2 pt-2">
              {/* Change Number Button Skeleton */}
              <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
              
              {/* Send OTP Button Skeleton */}
              <div className="h-10 w-32 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg shadow-sm animate-pulse"></div>
            </div>
          </div>

          {/* Optional: OTP Input Skeleton (Hidden by default, can be shown) */}
          <div className="opacity-0 pointer-events-none">
            <div className="flex gap-2 sm:gap-3 md:gap-4 justify-center mb-6">
              {[...Array(6)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-10 h-12 sm:w-12 sm:h-14 md:w-14 md:h-16 bg-gray-200 border-2 border-gray-300 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
            
            {/* Verify Button Skeleton */}
            <div className="w-full h-12 sm:h-14 bg-gradient-to-r from-gray-200 to-gray-300 rounded-xl animate-pulse"></div>
          </div>

          {/* Footer Skeleton */}
          <div className="mt-8 space-y-2">
            <div className="flex justify-center">
              <div className="h-3 w-64 sm:w-80 bg-gray-200 rounded animate-pulse"></div>
            </div>
            <div className="flex justify-center">
              <div className="h-3 w-48 sm:w-56 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% {
            background-position: -1000px 0;
          }
          100% {
            background-position: 1000px 0;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        /* Enhanced shimmer effect for gradients */
        .bg-gradient-to-r {
          background-size: 1000px 100%;
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </div>
  );
}