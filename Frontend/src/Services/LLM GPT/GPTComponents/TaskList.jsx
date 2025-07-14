import React from "react";
import { FiSearch, FiChevronRight } from "react-icons/fi";
import { TbWindowMinimize } from "react-icons/tb";

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

export default function TaskList() {
  return (
    <div className="h-screen text-grey flex flex-col justify-between py-4 px-2 font-sans text-sm">
      {/* Top */}
      <div>
        <div className="flex items-center justify-between px-3 mb-4">
          <button className="text-white bg-blue-600 hover:bg-blue-700 font-medium py-2 px-4 rounded cursor-pointer">
            New chat
          </button>
          <TbWindowMinimize className="text-lg cursor-pointer " />
        </div>

        <div className="flex items-center gap-2 px-3 text-gray mb-4">
          <FiSearch />
          <span>Search chats</span>
        </div>

        {/* Chat List */}
        <div className="mt-4">
          <h2 className="text-lg font-medium text-gray px-3 mb-2 uppercase">
            Chats
          </h2>
          <ul className="space-y-1 px-2 overflow-y-auto  pr-1">
            {chats.map((chat, index) => (
              <li
                key={index}
                className={`truncate px-3 py-1.5 rounded hover:bg-gray-700 hover:text-white cursor-pointer`}
              >
                {chat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 pt-3 mt-4 px-3">
        <button className="w-full flex items-center justify-between px-3 py-2 text-xs text-gray hover:text-white hover:bg-gray-800 rounded">
          <span>Upgrade plan</span>
          <FiChevronRight />
        </button>
      </div>
    </div>
  );
}
