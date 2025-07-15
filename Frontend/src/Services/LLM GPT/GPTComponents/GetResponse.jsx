import React from "react";
import ChatMessage from "./ChatMessage";

export default function GetResponse({ botMessage, isLoading }) {
  return (
    <div className="flex-1 overflow-y-auto px-4 pb-24">
      {botMessage.map((msg, idx) => (
        <>
          <ChatMessage
            key={`${idx}-p`}
            type="prompt"
            message={{ prompt: msg.prompt }}
          />
          <ChatMessage
            key={`${idx}-r`}
            type="response"
            message={{ response: msg.response }}
          />
        </>
      ))}
    </div>
  );
}
