import React, { useEffect, useRef } from "react";
import { FaRegCopy, FaThumbsUp, FaThumbsDown, FaRedo } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// Optimized icon component to reduce repetition
const ActionIcon = ({ Icon, hoverColor = "hover:text-gray-700", onClick }) => (
  <Icon 
    className={`w-6 h-6 cursor-pointer ${hoverColor} transition-colors p-1 rounded hover:bg-gray-200`}
    onClick={onClick}
  />
);

export default function ChatMessage({ type, message }) {
  const isPrompt = type === "prompt";

  const containerClasses = `w-full px-4 mb-4 flex ${isPrompt ? "justify-end" : "justify-start"}`;
  const messageClasses = `rounded-2xl px-4 py-3 text-sm break-words ${
    isPrompt ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-900"
  }`;

  const promptIcons = [
    { Icon: FaRegCopy, hoverColor: "hover:text-red-700" },
    { Icon: MdDelete, hoverColor: "hover:text-gray-700" }
  ];

  const responseIcons = [
    { Icon: FaThumbsUp, hoverColor: "hover:text-gray-700" },
    { Icon: FaThumbsDown, hoverColor: "hover:text-gray-700" },
    { Icon: FaRegCopy, hoverColor: "hover:text-gray-700" },
    { Icon: FaRedo, hoverColor: "hover:text-gray-700" }
  ];

  const icons = isPrompt ? promptIcons : responseIcons;

  // === Auto-scroll logic ===
  const messageRef = useRef(null);

  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className={containerClasses} ref={messageRef}>
      <div className="max-w-[80%] md:max-w-[80%]">
        <div
          className={messageClasses}
          dangerouslySetInnerHTML={{
            __html: isPrompt ? message.prompt : message.response,
          }}
        />
        
        <div className="flex items-center gap-3 text-gray-500 mt-2 px-1">
          {icons.map(({ Icon, hoverColor }, index) => (
            <ActionIcon
              key={index}
              Icon={Icon}
              hoverColor={hoverColor}
              onClick={() => {
                // Add your click handlers here
                console.log(`${Icon.name} clicked`);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
