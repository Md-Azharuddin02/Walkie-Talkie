import React, { useState } from 'react';
import GPTHeader from '../GPTComponents/GPTHeader';
import GetResponse from '../GPTComponents/GetResponse';
import GetPrompt from '../GPTComponents/GetPrompt';

const GPTLayout = () => {
  const [botMessage, setBotMessage] = useState([]);

  return (
    <div className="w-full h-full flex flex-col bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <GPTHeader botMessage={botMessage} />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <GetResponse botMessage={botMessage} />
      </div>

      {/* Input */}
      <GetPrompt botMessage={botMessage} setBotMessage={setBotMessage} />
    </div>
  );
};

export default GPTLayout;