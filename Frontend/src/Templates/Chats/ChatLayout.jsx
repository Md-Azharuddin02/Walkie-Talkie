import React, { useContext, useState } from "react";
import { Store } from "../../Store/Store";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import Footer from "./Footer";

const ChatLayout = ({isMobile, setIsChatOpen}) => {
  // Sample messages for demonstration
  const { currentFriend } = useContext(Store);
    const sampleMessages = [
  { userId: "user1", message: "Hey, how's it going?", time: "10:00 AM" },
  { userId: "current_user_id", message: "Pretty good! Just working on a project.", time: "10:01 AM" },
  { userId: "user1", message: "Nice! What kind of project?", time: "10:02 AM" },
  { userId: "current_user_id", message: "A chat application using React.", time: "10:03 AM" },
  { userId: "user1", message: "Sounds fun!", time: "10:04 AM" },
  { userId: "current_user_id", message: "Yeah, learning a lot while doing it.", time: "10:05 AM" },
  { userId: "user1", message: "Are you using any backend?", time: "10:06 AM" },
  { userId: "current_user_id", message: "Yep! Express and MongoDB.", time: "10:07 AM" },
  { userId: "user1", message: "Full stack, impressive!", time: "10:08 AM" },
  { userId: "current_user_id", message: "Thanks! What's new with you?", time: "10:09 AM" },
  { userId: "user1", message: "Not much, just started learning Node.js.", time: "10:10 AM" },
  { userId: "current_user_id", message: "Awesome, it's really powerful.", time: "10:11 AM" },
  { userId: "user1", message: "What do you like most about it?", time: "10:12 AM" },
  { userId: "current_user_id", message: "The simplicity and async nature.", time: "10:13 AM" },
  { userId: "user1", message: "Yeah, async can be tricky though.", time: "10:14 AM" },
  { userId: "current_user_id", message: "True! Promises and async/await help a lot.", time: "10:15 AM" },
  { userId: "user1", message: "Are you deploying your app?", time: "10:16 AM" },
  { userId: "current_user_id", message: "Planning to use Vercel for frontend.", time: "10:17 AM" },
  { userId: "user1", message: "What about backend?", time: "10:18 AM" },
  { userId: "current_user_id", message: "Maybe Render or Railway.", time: "10:19 AM" },
  { userId: "user1", message: "Cool, let me know how it goes.", time: "10:20 AM" },
  { userId: "current_user_id", message: "Sure! Will keep you posted.", time: "10:21 AM" },
  { userId: "user1", message: "Alright, time for lunch. Talk later!", time: "10:22 AM" },
  { userId: "current_user_id", message: "Enjoy! Catch up soon.", time: "10:23 AM" },
  { userId: "user1", message: "Back from lunch. Ready to code!", time: "11:00 AM" },
  { userId: "current_user_id", message: "Let's gooo! 🚀", time: "11:01 AM" },
  { userId: "user1", message: "Have you added authentication?", time: "11:02 AM" },
  { userId: "current_user_id", message: "Yes, using JWT tokens.", time: "11:03 AM" },
  { userId: "user1", message: "Nice, that's secure.", time: "11:04 AM" },
  { userId: "current_user_id", message: "Trying to implement refresh tokens next.", time: "11:05 AM" }
];

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header - Using responsive ChatHeader component */}
      <ChatHeader isMobile={isMobile} setIsChatOpen={setIsChatOpen}/>

      {/* Messages - Using responsive Message component */}
      <div className="flex-1 overflow-y-auto py-2 sm:py-4 space-y-1 sm:space-y-2 bg-gray-50">
        {sampleMessages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      {/* Footer - Using responsive Footer component */}
      <Footer />
    </div>
  );
};

export default ChatLayout;