import React from 'react';
import Header from './Header';
import Footer from './Footer';
import ChatItem from './ChatItem';
import ChatContent from './ChatContent';
import { chats } from '../../Store/Data';
const ChatLayout = () => {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <ChatItem chat={chats}/>
      <ChatContent />
      <Footer />
    </div>
  );
};

export default ChatLayout;
