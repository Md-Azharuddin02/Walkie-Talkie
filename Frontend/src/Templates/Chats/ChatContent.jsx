import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";


const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);


  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
      {messages.map((message, index) => (
        <Message key={index} message={message} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default ChatContent;
