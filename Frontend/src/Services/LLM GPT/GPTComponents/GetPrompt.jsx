import React, { useState } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";

import getDeepSeekResponseStream from "../../../Custom/GPTAPI";

export default function GetPrompt({ setBotMessage, setIsLoading }) {
  const [message, setMessage] = useState("");
const handleSendMessage = async (e) => {
  e.preventDefault();
  if (!message.trim()) return;

  setIsLoading(true);

  // Add a single combined object (prompt + empty response)
  setBotMessage((prev) => [
    ...prev,
    { type: "pair", prompt: message, response: "" },
  ]);

  try {
    await getDeepSeekResponseStream(message, (token) => {
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
  }

  setIsLoading(false);
  setMessage("");
};


  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSendMessage(event);
    }
  };

  return (
    <div className="px-4 py-3 border-t border-gray-200 w-full position-fix bottom-0">
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white max-w-3xl mx-auto">
        <input
          type="text"
          placeholder="Ask anything"
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-sm"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <div className="flex items-center gap-3 text-gray-500">
          <button onClick={handleSendMessage} className="cursor-pointer">
            <IoIosSend />
          </button>
          <button className="cursor-pointer">
            <FaMicrophone />
          </button>
        </div>
      </div>
    </div>
  );
}
