import React, { useRef, useEffect } from "react";
import {
  Info,
  BellOff,
  X,
  Ban,
  Trash2,
  MessageSquare,
} from "lucide-react";

const UserDetailsCard = ({setIsUserDetailOpen}) => {
  const menuRef = useRef(null);

  const menuItems = [
    { icon: Info, label: "Contact info" },
    { icon: BellOff, label: "Mute notifications" },
    { icon: X, label: "Close chat" },
    { icon: Ban, label: "Block" },
    { icon: MessageSquare, label: "Clear chat" },
    { icon: Trash2, label: "Delete chat", danger: true },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsUserDetailOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative">

      {/* Dropdown */}
      {open && (
        <div
          ref={menuRef}
          className="absolute right-7 top-4 w-64 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50"
        >
          {menuItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <button
                key={i}
                onClick={() => setOpen(false)}
                className={`w-full px-4 py-3 flex items-center gap-3 text-sm transition-colors cursor-pointer
                  ${item.danger
                    ? "text-red-600 hover:bg-red-50"
                    : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                <Icon className="w-5 h-5" />

                <span className="flex-1 text-left">{item.label}</span>

                {item.hasIndicator && (
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserDetailsCard;
