import React from "react";
import { FaThumbsUp, FaThumbsDown, FaRegCopy, FaRedo } from "react-icons/fa";
import { MdDelete } from "react-icons/md";


export default function ChatMessage({ message, type }) {
  const isPrompt = type === "prompt";

  return (
    <div className={`w-full px-4 mb-4 flex ${isPrompt ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[80%] md:max-w-80%]">
        <div
          className={`rounded-2xl px-4 py-2 text-sm break-words ${
            isPrompt ? "bg-slate-700 text-white" : "bg-gray-100 text-gray-900"
          }`}
          dangerouslySetInnerHTML={{
            __html: isPrompt ? message.prompt : message.response,
          }}
        />

        <div className="flex items-center gap-3 text-xs text-gray-500 mt-1 pl-2">
          {isPrompt ? (
            <>
              <FaRegCopy className="cursor-pointer hover:text-black" />
              <MdDelete className="cursor-pointer hover:text-black" />
            </>
          ) : (
            <>
              <FaThumbsUp className="cursor-pointer hover:text-black" />
              <FaThumbsDown className="cursor-pointer hover:text-black" />
              <FaRegCopy className="cursor-pointer hover:text-black" />
              <FaRedo className="cursor-pointer hover:text-black" />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
