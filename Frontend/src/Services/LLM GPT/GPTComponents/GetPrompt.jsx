import React, { useState, useCallback, useRef, useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import  getDeepSeekResponseStream  from "../../../Custom/GPTAPI";

export default function GetPrompt({ setBotMessage }) {
  const [message, setMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const abortControllerRef = useRef(null);

  const updateLastMessage = useCallback((modifierFn) => {
    setBotMessage((prev) => {
      const updated = [...prev];
      const lastIndex = updated.length - 1;

      if (lastIndex >= 0 && updated[lastIndex]?.type === "pair") {
        updated[lastIndex] = modifierFn(updated[lastIndex]);
      }

      return updated;
    });
  }, [setBotMessage]);

  const handleStreamingError = useCallback((errorMsg = "Sorry, there was an error processing your request.") => {
    updateLastMessage((last) => ({ ...last, response: errorMsg }));
  }, [updateLastMessage]);

  const cleanupAbort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  const handleSendMessage = useCallback(async (e) => {
    e?.preventDefault();

    const trimmed = message.trim();
    if (!trimmed || isStreaming) return;

    setIsStreaming(true);
    abortControllerRef.current = new AbortController();

    setBotMessage((prev) => [
      ...prev,
      {
        type: "pair",
        prompt: trimmed,
        response: "",
        isStreaming: true,
        timestamp: Date.now(),
      },
    ]);
    setMessage("");

    try {
      await getDeepSeekResponseStream(
        trimmed,
        (token) => {
          if (!abortControllerRef.current?.signal.aborted) {
            updateLastMessage((last) => ({
              ...last,
              response: last.response + token,
            }));
          }
        },
        (fullMessage) => {
          console.log("✅ Streaming completed:", fullMessage);
          updateLastMessage((last) => ({ ...last, isStreaming: false }));
          setIsStreaming(false);
        },
        abortControllerRef.current.signal
      );
    } catch (err) {
      console.error("❌ Streaming failed:", err);

      let errorMsg = "Sorry, there was an error processing your request.";
      if (err.name === "AbortError") errorMsg = "Request was cancelled.";
      else if (err.message?.includes("network")) errorMsg = "Network error. Please check your connection.";
      else if (err.message?.includes("rate limit")) errorMsg = "Too many requests. Please wait.";

      handleStreamingError(errorMsg);
      setIsStreaming(false);
    }
  }, [message, isStreaming, setBotMessage, updateLastMessage, handleStreamingError, cleanupAbort]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === "Enter" && !e.shiftKey && !isStreaming) {
      e.preventDefault();
      handleSendMessage();
    }
  }, [handleSendMessage, isStreaming]);

  const handleVoiceInput = useCallback(() => {
    console.log("🎤 Voice input clicked - implement speech recognition here");
  }, []);

  const cancelStreaming = useCallback(() => {
    cleanupAbort();
    updateLastMessage((last) => ({ ...last, isStreaming: false }));
    setIsStreaming(false);
  }, [cleanupAbort, updateLastMessage]);

  useEffect(() => {
    return () => cleanupAbort();
  }, [cleanupAbort]);

  const isInputDisabled = isStreaming;
  const isSendDisabled = !message.trim() || isStreaming;

  return (
    <div className="sticky bottom-0 border-t border-gray-200 p-4 bg-white">
      <div className="flex items-center border border-gray-300 rounded-full px-4 py-3 bg-white shadow-sm hover:shadow-md transition-shadow">
        <input
          type="text"
          placeholder={isStreaming ? "Generating response..." : "Ask anything"}
          className="flex-1 bg-transparent outline-none text-black placeholder-gray-500 text-sm disabled:opacity-50"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
          disabled={isInputDisabled}
          autoComplete="off"
          maxLength={2000}
        />

        <div className="flex items-center gap-3 text-gray-500 ml-2">
          <button
            onClick={isStreaming ? cancelStreaming : handleSendMessage}
            className={`cursor-pointer transition-colors p-1 disabled:opacity-50 disabled:cursor-not-allowed ${isStreaming ? "hover:text-red-500 text-red-400" : "hover:text-blue-500"}`}
            disabled={isSendDisabled && !isStreaming}
            title={isStreaming ? "Cancel request" : "Send message"}
            aria-label={isStreaming ? "Cancel request" : "Send message"}
          >
            {isStreaming ? (
              <div className="w-5 h-5 flex items-center justify-center">
                <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              </div>
            ) : (
              <IoIosSend className="w-5 h-5" />
            )}
          </button>

          <button
            onClick={handleVoiceInput}
            className="cursor-pointer hover:text-blue-500 transition-colors p-1 disabled:opacity-50"
            disabled={isStreaming}
            title="Voice input"
            aria-label="Voice input"
          >
            <FaMicrophone className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isStreaming && (
        <div className="text-xs text-gray-500 mt-2 flex items-center justify-center gap-2">
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
          <span>AI is thinking...</span>
        </div>
      )}
    </div>
  );
}
