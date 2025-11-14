import React, { useContext, useState, useEffect, useRef, lazy, Suspense } from "react";
import { Store } from "../../Store/Store";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import Footer from "./Footer";
import { socket } from "../../Custom/socket";
const UserDetailsCard = lazy(() => import("./UserDetailCard"));
const FriendDetails = lazy(() => import("./FriendDetails"));

const ChatLayout = ({ isMobile, setIsChatOpen }) => {
  const { user, currentFriend } = useContext(Store);
  const [allMessages, setAllMessages] = useState([]);
  const chatEndRef = useRef(null);
  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [friendDetailCardOpen, setFriendDetailCardOpen] = useState(false);

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
      {!currentFriend?.phoneNumber ? (
        <div className="flex-1 flex items-center justify-center bg-gray-50/80">
          ...
        </div>
      ) : (
        <>
          <ChatHeader isMobile={isMobile} setIsChatOpen={setIsChatOpen} setIsUserDetailOpen={setIsUserDetailOpen} setFriendDetailCardOpen={setFriendDetailCardOpen} />

          {isUserDetailOpen && (
           
            <Suspense >
              <UserDetailsCard setIsUserDetailOpen={setIsUserDetailOpen} />
            </Suspense>
          )}

          <div className="flex-1 overflow-y-auto py-2 sm:py-4 space-y-1 sm:space-y-2 bg-gray-50">
            {allMessages.map((message, index) => (
              <Message key={index} message={message} />
            ))}
          </div>
           {friendDetailCardOpen && (
           
            <Suspense >
              <FriendDetails  setFriendDetailCardOpen={setFriendDetailCardOpen} friendDetailCardOpen={friendDetailCardOpen} currentFriend={currentFriend}/>
            </Suspense>
          )}


          <div ref={chatEndRef} />
          <Footer SendMessage={SendMessage} />
        </>
      )}
    </div>
  );

}

export default ChatLayout;
