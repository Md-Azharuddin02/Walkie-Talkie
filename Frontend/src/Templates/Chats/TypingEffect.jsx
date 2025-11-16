import React from "react";

const TypingEffect = () => {
  return (
      <div className="w-full max-w-2xl">
        <div className="w-full flex px-2 sm:px-4 justify-start mb-3 sm:mb-4">
          <div
            className="
              bg-white 
              text-gray-800 
              rounded-2xl
              rounded-bl-md
              p-3
              shadow-sm 
              max-w-[60%]
            "
          >
            {/* Typing text with animated dots inline */}
            <div className="flex items-end space-x-1.5">
              <span className="font-medium text-sm text-gray-600">Typing</span>
              <span
                className="w-1.5 h-1.5 bg-gray-500 rounded-full mb-0.5"
                style={{
                  animation: "wave 1.2s ease-in-out infinite",
                  animationDelay: "-0.4s",
                }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-gray-500 rounded-full mb-0.5"
                style={{
                  animation: "wave 1.2s ease-in-out infinite",
                  animationDelay: "-0.2s",
                }}
              ></span>
              <span
                className="w-1.5 h-1.5 bg-gray-500 rounded-full mb-0.5"
                style={{
                  animation: "wave 1.2s ease-in-out infinite",
                }}
              ></span>
            </div>
          </div>
        </div>

      <style>{`
        @keyframes wave {
          0%, 100% { 
            transform: translateY(0); 
          }
          50% { 
            transform: translateY(-8px); 
          }
        }
      `}</style>
    </div>
  );
};

export default TypingEffect;