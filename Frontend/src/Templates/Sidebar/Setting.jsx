import React, { useState } from "react";
import {
  FiSearch,
  FiUser,
  FiLock,
  FiMessageSquare,
  FiBell,
  // FiKeyboard,
  FiHelpCircle,
  FiLogOut,
  FiPlay,
} from "react-icons/fi";

const SettingsLayout = () => {
  const [activeSection, setActiveSection] = useState("account");

  const menuItems = [
    {
      id: "search",
      title: "Search settings",
      icon: <FiSearch size={18} />,
      action: <FiPlay size={18} className="text-blue-500" />,
    },
    {
      id: "account",
      title: "Account",
      icon: <FiUser size={18} />,
      subItems: [
        { title: "Privacy", icon: <FiLock size={16} /> },
        { title: "Chats", icon: <FiMessageSquare size={16} /> },
        { title: "Notifications", icon: <FiBell size={16} /> },
        // { title: "Keyboard shortcuts", icon: <FiKeyboard size={16} /> },
        { title: "Help", icon: <FiHelpCircle size={16} /> },
        {
          title: "Log out",
          icon: <FiLogOut size={16} className="text-red-500" />,
        },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 p-4">
        <h1 className="text-xl font-bold mb-6">Settings</h1>
        <nav>
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg ${
                    activeSection === item.id
                      ? "bg-blue-50 text-blue-600"
                      : "hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500">{item.icon}</span>
                    <span>{item.title}</span>
                  </div>
                  {item.action && item.action}
                </button>

                {item.subItems && activeSection === item.id && (
                  <ul className="ml-10 mt-2 space-y-1">
                    {item.subItems.map((subItem, index) => (
                      <li key={index}>
                        <button
                          className={`w-full flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 ${
                            subItem.title === "Log out" ? "text-red-500" : ""
                          }`}
                        >
                          <span className="text-gray-400">{subItem.icon}</span>
                          <span>{subItem.title}</span>
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        <div className="bg-white rounded-lg shadow-sm p-6 max-w-3xl">
          <h2 className="text-xl font-semibold mb-6">
            {menuItems.find((item) => item.id === activeSection)?.title}
          </h2>
          <div className="space-y-6">
            {/* Content would go here based on selected section */}
            <p className="text-gray-600">
              {activeSection === "search"
                ? "Search settings content would appear here"
                : "Account settings content would appear here"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsLayout;
