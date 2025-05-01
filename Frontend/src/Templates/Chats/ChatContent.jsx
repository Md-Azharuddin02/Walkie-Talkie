import React, { useEffect, useState } from "react";
import Message from "./Message";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const ChatContent = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5803/api/messages")
      .then((response) => response.json())
      .then((data) => setMessages(data))
      .catch((error) => console.error("Error fetching messages:", error));

    const handleReceiveMessage = (message, userId) => {
      setMessages((prev) => [...prev, message]);
      console.log('The user id'+ userId)
    };

    socket.on("receiveMessage", handleReceiveMessage);

    return () => {
      socket.off("receiveMessage", handleReceiveMessage);
    };
  }, []);

  return (
    <div className="flex-1 overflow-y-auto p-4 bg-gray-200">
      {messages.map(
        (message) => (
          (<Message key={message._id} message={message} />)
        )
      )}
    </div>
  );
};

export default ChatContent;
