import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import getDeepSeekResponseStream from "../../../Custom/GPTAPI";

export default function GetPrompt({ setBotMessage }) {
  const [message, setMessage] = useState("");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) return;

    // Add a single combined object (prompt + empty response)
    setBotMessage((prev) => [
      ...prev,
      { type: "pair", prompt: message, response: "" },
    ]);

    try {
      await getDeepSeekResponseStream(message, (token) => {
        console.log("Received token:", message);
        setBotMessage((prev) => {
          const updated = [...prev];
          const lastIndex = updated.length - 1;

          if (lastIndex >= 0) {
            updated[lastIndex] = {
              ...updated[lastIndex],
              response: updated[lastIndex].response + token,
            };
          }

          return updated;
        });
      });
    } catch (err) {
      console.error("Streaming failed:", err);
      
      // Optional: Add error handling to show user-friendly error
      setBotMessage((prev) => {
        const updated = [...prev];
        const lastIndex = updated.length - 1;
        
        if (lastIndex >= 0) {
          updated[lastIndex] = {
            ...updated[lastIndex],
            response: "Sorry, there was an error processing your request.",
          };
        }
        
        return updated;
      });
    }
    
    setMessage("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSendMessage(event);
    }
  };

  return (
    <div className="sticky bottom-0 border-t border-gray-200 p-4">
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-sm">
        <input
          type="text"
          placeholder="Ask anything"
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="flex items-center gap-3 text-gray-500 ml-2">
          <button
            onClick={handleSendMessage}
            className="cursor-pointer hover:text-blue-500 transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!message.trim()}
          >
            <IoIosSend className="w-5 h-5" />
          </button>
          <button className="cursor-pointer hover:text-blue-500 transition-colors p-1">
            <FaMicrophone className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}