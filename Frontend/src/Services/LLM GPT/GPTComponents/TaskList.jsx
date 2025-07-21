import React, { useContext } from "react";
import { TbWindowMinimize } from 'react-icons/tb';
import { FiSearch } from "react-icons/fi";
import { FiChevronRight } from "react-icons/fi";
import { Store } from "../../../Store/Store";



const TaskList = () => {
  const {setCurrentTask}= useContext(Store)
  const chats = [
  "Fix mobile chat layout",
  "Add loader for streaming response",
  "Implement auto-scroll in chat",
  "Store chat history in localStorage",
  "Improve responsiveness of sidebar",
  "Create login UI",
  "Add JWT authentication",
  "Fix duplicate key warning",
  "Add timestamp to each chat message",
  "Design chat UI for dark mode",
  "Set up Express server",
  "Connect MongoDB to backend",
  "Send message to API",
  "Implement refresh tokens",
  "Show online/offline status",
  "Add search to friend list",
  "Create reusable button component",
  "Fix scroll overflow bug",
  "Deploy frontend to Vercel",
  "Deploy backend to Railway"
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
              onClick={() => setCurrentTask(index)}
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