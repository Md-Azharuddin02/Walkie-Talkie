import React, { useState } from "react";
export default function GetPrompt() {
  const [prompt, setPrompt] = useState("");

  const handleSubmit = () => {
    console.log("Prompt sent:", prompt);
    // TODO: Send prompt to backend
    setPrompt("");
  };

  return (
    <div className="w-full max-w-xl px-4 mt-4">
      <div className="flex items-center bg-zinc-800 rounded-full px-4 py-2 border border-zinc-700">
        <input
          type="text"
          placeholder="Ask anything"
          className="bg-transparent flex-1 outline-none text-white placeholder-gray-400"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
        <div className="flex items-center space-x-3 text-gray-400">
          <button onClick={handleSubmit}>🎛</button>
          <button>🎤</button>
        </div>
      </div>
    </div>
  );
}
