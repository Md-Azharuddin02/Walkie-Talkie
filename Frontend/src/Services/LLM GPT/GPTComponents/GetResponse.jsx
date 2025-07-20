import React, { useEffect } from "react";
import ChatMessage from "./ChatMessage";
import TypewriterLoader from "../../../Components/TypewriterLoader";
import useLocalStorage from "../../../Custom/useLocalStorage"; // You should define this

export default function GetResponse({ botMessage }) {
  const [messages, setMessages] = useLocalStorage("chatMessages", []);
 const lastmessage = botMessage.length;
  useEffect(() => {
    if (botMessage && botMessage.length > 0) {
      setMessages(prev => [...prev, ...botMessage ]); 
    }
  }, [botMessage]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 mb-4 scrollbar-hide">
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="space-y-4">
        {botMessage && botMessage.length > 0 ? (
          botMessage.map((msg, idx) => (
            <div key={`message-pair-${idx}`} className="space-y-4">
              {/* User Prompt */}
              {msg.prompt && (
                <ChatMessage type="prompt" message={{ prompt: msg.prompt }} />
              )}

              {/* Bot Response or Loader */}
              {msg.response ? (
                <ChatMessage
                  type="response"
                  message={{ response: msg.response }}
                />
              ) : (
                <div className="pl-10">
                  <TypewriterLoader />
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center h-full text-gray-500">
            <p>Start a conversation by typing a message below</p>
          </div>
        )}
      </div>
    </div>
  );
}
