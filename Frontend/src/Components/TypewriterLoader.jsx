import React, { useState, useEffect } from "react";

const TypewriterLoader = ({
  messages = ["Thinking...", "Processing...", "Almost there..."],
  className = "",
  typingSpeed = 100,
  pauseDuration = 1000,
}) => {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const message = messages[messageIndex];
    let timeoutId;

    if (isTyping) {
      if (displayedText.length < message.length) {
        timeoutId = setTimeout(() => {
          setDisplayedText(message.slice(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        timeoutId = setTimeout(() => setIsTyping(false), pauseDuration);
      }
    } else {
      timeoutId = setTimeout(() => {
        setDisplayedText("");
        setMessageIndex((prev) => (prev + 1) % messages.length);
        setIsTyping(true);
      }, 500);
    }

    return () => clearTimeout(timeoutId);
  }, [displayedText, isTyping, messageIndex, messages, typingSpeed, pauseDuration]);

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
      <span className="text-sm text-gray-600 min-w-[120px] font-mono">
        {displayedText}
        <span className="animate-pulse">|</span>
      </span>
    </div>
  );
};

export default TypewriterLoader;
