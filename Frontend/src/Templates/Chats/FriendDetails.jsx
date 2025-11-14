import React, { useState, useRef, useEffect, useCallback } from "react";
import { X, Star, Bell } from "lucide-react";

const FriendDetails = ({ setFriendDetailCardOpen, friendDetailCardOpen, currentFriend }) => {
  const [isMuted, setIsMuted] = useState(false);
  const menuRef = useRef(null);

  const onClose = useCallback(() => setFriendDetailCardOpen(false), []);

  // --- Outside Click Handler ---
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [onClose]);

  if (!friendDetailCardOpen) return null;

  const { profileImage, name, phoneNumber, aboutStatus } = currentFriend || {};

  return (
    <div
      ref={menuRef}
      className="
        w-full max-w-md bg-white text-gray-900 rounded-2xl shadow-xl 
        absolute right-7 top-4 z-50 overflow-hidden
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-lg font-semibold">Contact info</h2>
        </div>
      </div>

      {/* Profile */}
      <div className="flex flex-col items-center py-8 px-6 border-b border-gray-200">
        <div className="w-32 h-32 rounded-full overflow-hidden shadow-inner mb-4 bg-gray-200">
          <img
            src={profileImage}
            alt={name || "Profile"}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="text-xl font-medium">{name}</h3>
        <p className="text-gray-500 text-md mt-1">{phoneNumber}</p>
      </div>

      {/* About */}
      <div className="px-5 py-5 border-b border-gray-200">
        <p className="text-gray-800 text-base">{aboutStatus}</p>
      </div>

      {/* Settings */}
      <div className="px-3 py-2">
        <button className="w-full flex items-center gap-4 p-4 hover:bg-gray-100 rounded-xl transition">
          <Star className="w-5 h-5 text-gray-500" />
          <span className="flex-1 text-left text-gray-900">Starred messages</span>
        </button>

        <div className="flex items-center gap-4 p-4">
          <Bell className="w-5 h-5 text-gray-500" />
          <span className="flex-1 text-gray-900">Mute notifications</span>

          <button
            onClick={() => setIsMuted((p) => !p)}
            className={`relative w-12 h-6 rounded-full transition-all ${
              isMuted ? "bg-teal-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`
                absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow 
                transition-transform ${isMuted ? "translate-x-6" : ""}
              `}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendDetails;
