import React from "react";
import GPTSideBar from "../GPTComponents/GPTSideBar";
import GPTHeader from "../GPTComponents/GPTHeader";
import GetPrompt from "../GPTComponents/GetPrompt";
import GetResponse from "../GPTComponents/GetResponse";
import ErrorBoundary from "../../../Components/ErrorBoundary"

export default function GPTLayout() {
  return (
    <div className="flex h-screen bg-black text-white font-sans">
      <main className="flex-1 flex flex-col items-center justify-center text-center">
          <GPTHeader />
          <GetResponse />
          <GetPrompt />
      </main>
    </div>
  );
}
