import React,{useState} from 'react';
import TaskList from '../GPTComponents/TaskList'; // Assuming you have a ProjectList component
export default function GPTSideBar() {
  return (
    <aside className="w-72 bg-zinc-900 border-r border-zinc-700 flex flex-col justify-between">
      <div>
        {/* Top Section */}
        <div className="p-4 border-b border-zinc-700">
          <div className="text-xl font-bold">ChatGPT</div>
        </div>

        {/* Navigation */}
        <div className="p-4 space-y-2 text-sm text-gray-300">
          <div className="hover:text-white cursor-pointer">New chat</div>
          <div className="hover:text-white cursor-pointer">Search chats</div>
          <div className="hover:text-white cursor-pointer">Library</div>
          <div className="pt-4 text-xs text-gray-500 uppercase">Apps</div>
          <div className="hover:text-white cursor-pointer">Sora</div>
          <div className="hover:text-white cursor-pointer">GPTs</div>
        </div>

        <TaskList />
      </div>

      {/* Upgrade Section */}
      <div className="p-4 border-t border-zinc-700 text-sm">
        <div className="text-blue-500 hover:underline cursor-pointer">Upgrade plan</div>
        <div className="text-gray-400 text-xs mt-1">More access to the best models</div>
      </div>
    </aside>
  );
}
