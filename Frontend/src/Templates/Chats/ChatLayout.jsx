import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
} from "react";
import { Store } from "../../Store/Store";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import Footer from "./Footer";
import { socket } from "../../Custom/socket";
import ChatLoader from "../../Components/ChatLoader";

// Lazy
const UserDetailsCard = lazy(() => import("./UserDetailCard"));
const FriendDetails = lazy(() => import("./FriendDetails"));
const TypingEffect = lazy(() => import("./TypingEffect"));
const NoChatSelected = lazy(() => import("../Chats/NoChatSelected "));
const ChatSkeleton = lazy(() => import("../../Components/Loaders/ChatSkeleton"));

const ChatLayout = ({ isMobile, setIsChatOpen }) => {
  const { user, currentFriend } = useContext(Store);

  const [allMessages, setAllMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);

  const [isUserDetailOpen, setIsUserDetailOpen] = useState(false);
  const [friendDetailCardOpen, setFriendDetailCardOpen] = useState(false);

  const [sendTyping, setSendTyping] = useState(false);
  const [receivedTyping, setReceivedTyping] = useState(false);

  const bottomRef = useRef(null);


  const chatId =
    user && currentFriend
      ? [user.phoneNumber, currentFriend.phoneNumber].sort().join("_")
      : null;

  const loadMessages = () => {
    if (!chatId) return [];
    return JSON.parse(localStorage.getItem(chatId)) || [];
  };

  const saveMessage = (msg) => {
    if (!chatId) return;
    const stored = loadMessages();
    stored.push(msg);
    localStorage.setItem(chatId, JSON.stringify(stored));
  };


  useEffect(() => {
    if (!user || !currentFriend) return;
    setAllMessages(loadMessages());
  }, [currentFriend, user]);


  useEffect(() => {
    const onReceived = (data) => {
      saveMessage(data);
      setAllMessages((prev) => [...prev, data]);
    };

    socket.on("received-message", onReceived);

    return () => socket.off("received-message", onReceived);
  }, []);


  useEffect(() => {
    if (!user?.phoneNumber) return;

    const handleOnlineUsers = (list) => setOnlineUsers(list);

    socket.on("online-users-list", handleOnlineUsers);
    socket.emit("join", { userPhoneNumber: user.phoneNumber });

    return () => socket.off("online-users-list", handleOnlineUsers);
  }, [user]);


  const SendMessage = (message) => {
    if (!currentFriend) return;

    const payload = {
      senderPhoneNumber: user.phoneNumber,
      recieverPhoneNumber: currentFriend.phoneNumber,
      recieverName: currentFriend.name,
      message,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      direction: "out",
    };

    setAllMessages((prev) => [...prev, payload]);
    saveMessage(payload);

    socket.emit("send-message", payload);
  };


  useEffect(() => {
    if (!currentFriend || !user) return;

    socket.emit("typing", {
      sender: user.phoneNumber,
      receiver: currentFriend.phoneNumber,
      isTyping: sendTyping,
    });
  }, [sendTyping, currentFriend, user]);

  useEffect(() => {
    const handleTyping = ({ sender, isTyping }) => {
      if (sender === currentFriend?.phoneNumber) {
        setReceivedTyping(isTyping);
      }
    };

    socket.on("typing", handleTyping);
    return () => socket.off("typing", handleTyping);
  }, [currentFriend]);


  useEffect(() => {
    if (!bottomRef.current) return;
    bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [allMessages, receivedTyping]);


  if (!currentFriend?.phoneNumber) {
    return (
      <Suspense fallback={<ChatLoader />}>
        <NoChatSelected />
      </Suspense>
    );
  }

  return (
    <div className="w-full h-full flex flex-col bg-white">
      <ChatHeader
        isMobile={isMobile}
        setIsChatOpen={setIsChatOpen}
        setIsUserDetailOpen={setIsUserDetailOpen}
        setFriendDetailCardOpen={setFriendDetailCardOpen}
        onlineUsers={onlineUsers}
      />

      {isUserDetailOpen && (
        <Suspense>
          <UserDetailsCard setIsUserDetailOpen={setIsUserDetailOpen} />
        </Suspense>
      )}

      <div className="flex-1 overflow-y-auto py-2 sm:py-4 space-y-1 sm:space-y-2 bg-gray-50">
        {allMessages.map((msg, idx) => (
          <Suspense fallback={<ChatSkeleton />}>
            <Message key={idx} message={msg} />
          </Suspense>

        ))}

        {receivedTyping && (
          <Suspense>
            <TypingEffect />
          </Suspense>
        )}

        <div ref={bottomRef}></div>
      </div>

      {friendDetailCardOpen && (
        <Suspense>
          <FriendDetails
            setFriendDetailCardOpen={setFriendDetailCardOpen}
            friendDetailCardOpen={friendDetailCardOpen}
            currentFriend={currentFriend}
          />
        </Suspense>
      )}

      <Footer SendMessage={SendMessage} setSendTyping={setSendTyping} />
    </div>
  );
};

export default ChatLayout;
