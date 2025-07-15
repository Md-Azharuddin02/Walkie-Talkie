import React, { useState } from "react";
import GetResponse from "../GPTComponents/GetResponse";
import GPTHeader from "../GPTComponents/GPTHeader";
import GetPrompt from "../GPTComponents/GetPrompt";

export default function GPTLayout() {
  const [botMessage, setBotMessage] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full flex flex-col h-screen text-black font-sans">
      <main className="flex flex-col justify-between flex-1 w-full max-w-3xl mx-auto">
        <GPTHeader />
        <GetResponse botMessage={botMessage} isLoading={isLoading} />
        <GetPrompt setBotMessage={setBotMessage} setIsLoading={setIsLoading} />
      </main>
    </div>
  );
}
