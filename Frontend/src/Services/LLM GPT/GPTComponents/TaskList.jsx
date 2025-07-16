import React from "react";
import { TbWindowMinimize } from 'react-icons/tb';
import { FiSearch } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";



const TaskList = () => {
  const chats = [
    "React UI with Tailwind",
    "MongoDB URI Fix", 
    "Nodemon Permission Denied Fix",
    "DNS Resolution Issue",
    "OpenAI Free Integration Strategy",
    "Code Optimization Guide",
    "Integrating ChatGPT with React",
    "Email Recovery via Backup",
    "Missing Packages Installation",
    "React Rendering & JSX Guide",
    "Reconciliation in React",
    "React Rendering Mastery Plan",
    "Developer Roadmap 2025",
    "Software Developer Roadmap 2...",
    "React Todo App CRUD",
    "Mongosh command not found",
  ];

  return (
    <div className="w-full h-full bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <button className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm font-medium">
          New chat
        </button>
      </div>

      {/* Search */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center space-x-2 text-gray-400">
          <FiSearch />
          <span className="text-sm">Search chats</span>
        </div>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-lg font-medium text-gray-300 mb-4 uppercase">Chats</h2>
        <div className="space-y-1">
          {chats.map((chat, index) => (
            <div
              key={index}
              className="px-3 py-2 rounded hover:bg-gray-700 cursor-pointer text-sm truncate"
            >
              {chat}
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-700 p-4">
        <button className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded">
          <span>Upgrade plan</span>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
};
export default TaskList;