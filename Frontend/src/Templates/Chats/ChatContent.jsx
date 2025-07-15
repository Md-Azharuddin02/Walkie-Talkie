import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import io from "socket.io-client";

const socket = io("http://localhost:5803");

const ChatContent = () => {
  const [messages, setMessages] = useState([]);
  const bottomRef = useRef(null);

  useEffect(() => {
    const handleReceiveMessage = ({ message }) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

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
