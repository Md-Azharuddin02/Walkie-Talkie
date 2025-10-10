import React, { useContext, useState, useEffect, useRef } from "react";
import { Store } from "../../Store/Store";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import Footer from "./Footer";
import { socket } from "../../Custom/socket";

const ChatLayout = ({ isMobile, setIsChatOpen }) => {
  const { user, currentFriend } = useContext(Store);
  const [allMessages, setAllMessages] = useState([]);
  const chatEndRef = useRef(null);

  console.log("Current Friend:", user);

  function saveMessage(chatId, message) {
    let messages = JSON.parse(localStorage.getItem(chatId)) || [];
    messages.push(message);
    localStorage.setItem(chatId, JSON.stringify(messages));
  }

  function getMessagesWithFriend(senderPhoneNumber, recieverPhoneNumber) {
    if (!senderPhoneNumber || !recieverPhoneNumber) return [];
    const chatId = [senderPhoneNumber, recieverPhoneNumber].sort().join("_");
    return JSON.parse(localStorage.getItem(chatId)) || [];
  }

  useEffect(() => {
    if (user && currentFriend) {
      const messages = getMessagesWithFriend(user.phoneNumber, currentFriend.phoneNumber);
      setAllMessages(messages);
    }
  }, [currentFriend, user]);

  useEffect(() => {
    const onReceived = (data) => {
      console.log("Received message data:", data.recieverName);
      const chatId = [data.senderPhoneNumber, data.recieverPhoneNumber].sort().join("_");
      saveMessage(chatId, data);
      setAllMessages((prev) => [
        ...prev,
        {
          senderPhoneNumber: data.senderPhoneNumber,
          recieverPhoneNumber: data.recieverPhoneNumber,
          message: data.message,
          time: data.timestamp,
          recieverName: data.recieverName,
          direction: data.direction,
        },
      ]);
    };

    const onDisconnect = () => {
      console.log("Disconnected from the server!");
    };

    socket.on("received-message", onReceived);
    socket.on("disconnect", onDisconnect);

    return () => {
      socket.off("received-message", onReceived);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const SendMessage = (message) => {
    const payload = {
      senderPhoneNumber: user.phoneNumber,
      recieverPhoneNumber: currentFriend.phoneNumber,
      recieverName: currentFriend.name,
      message,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),

      direction: "out",
    };

    // Optimistic append
    setAllMessages((prev) => [
      ...prev,
      {
        userId: user.phoneNumber,
        message,
        timestamp: payload.timestamp,
        phoneNumber: user.phoneNumber,
        direction: "out",
      },
    ]);

    const chatId = [payload.senderPhoneNumber, payload.recieverPhoneNumber].sort().join("_");
    saveMessage(chatId, payload);

    socket.emit("send-message", payload);
  };

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessages]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {currentFriend.length === 0 ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50/80">
          <div className="text-center p-6 max-w-sm">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-cyan-100 to-blue-100 border border-blue-200/50 mb-4">
              <svg className="w-10 h-10 text-cyan-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              </svg>
            </div>
            <h3 className="text-gray-800 font-medium text-xl mb-2">Your messages</h3>
            <p className="text-gray-500 leading-relaxed">
              Send private messages to start a conversation with your friends
            </p>
          </div>
        </div>
      ) : (
        <>
          <ChatHeader isMobile={isMobile} setIsChatOpen={setIsChatOpen} />

          <div className="flex-1 overflow-y-auto py-2 sm:py-4 space-y-1 sm:space-y-2 bg-gray-50">
            {allMessages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>
          <div ref={chatEndRef} />
          <Footer SendMessage={SendMessage} />
        </>
      )}
    </div>
  );
}

export default ChatLayout;
