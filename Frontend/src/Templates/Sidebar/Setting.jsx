import React from 'react';
import { 
  Search, 
  User, 
  Shield, 
  Lock, 
  MessageCircle, 
  Bell, 
  Keyboard, 
  HelpCircle, 
  LogOut 
} from 'lucide-react';

const Settings = () => {
  const settingsItems = [
    {
      icon: Shield,
      title: 'Account',
      subtitle: 'Security notifications, account info',
      color: 'text-blue-500'
    },
    {
      icon: Lock,
      title: 'Privacy',
      subtitle: 'Blocked contacts, disappearing messages',
      color: 'text-green-500'
    },
    {
      icon: MessageCircle,
      title: 'Chats',
      subtitle: 'Theme, wallpaper, chat settings',
      color: 'text-green-500'
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Message notifications',
      color: 'text-orange-500'
    },
    {
      icon: Keyboard,
      title: 'Keyboard shortcuts',
      subtitle: 'Quick actions',
      color: 'text-purple-500'
    },
    {
      icon: HelpCircle,
      title: 'Help',
      subtitle: 'Help center, contact us, privacy policy',
      color: 'text-blue-500'
    }
  ];

  return (
    <div className="h-full flex flex-col bg-gray-900 text-white">
      {/* Header */}
      <div className="px-4 py-4 sm:py-6 border-b border-gray-700">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-medium text-white">Settings</h1>
          {/* Close button for mobile/tablet */}
          <div className="sm:hidden">
            <button className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm">×</span>
            </button>
          </div>
        </div>
        
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search settings"
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-gray-200 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto pb-20 sm:pb-4">
        {/* User Profile Section */}
        <div className="px-4 py-6 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-gray-700 rounded-full flex items-center justify-center">
              <User className="w-6 h-6 sm:w-8 sm:h-8 text-gray-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-medium text-white">clay</h3>
              <p className="text-sm text-gray-400">Hey there! I am using WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="py-2">
          {settingsItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index}
                className="px-4 py-4 hover:bg-gray-800 active:bg-gray-700 cursor-pointer transition-colors duration-200"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <IconComponent className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-base font-medium text-white">{item.title}</h4>
                    <p className="text-sm text-gray-400 mt-0.5">{item.subtitle}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Log Out Section */}
        <div className="px-4 py-4 border-t border-gray-800 mt-4">
          <div className="flex items-center space-x-4 hover:bg-gray-800 active:bg-gray-700 cursor-pointer transition-colors duration-200 px-0 py-2 rounded-lg">
            <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <div className="flex-1">
              <h4 className="text-base font-medium text-red-500">Log out</h4>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar for Mobile/Tablet */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 px-4 py-2">
        <div className="flex items-center justify-around">
          <button className="p-3 rounded-full hover:bg-gray-700 transition-colors">
            <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">✉</span>
            </div>
          </button>
          <button className="p-3 rounded-full hover:bg-gray-700 transition-colors relative">
            <Bell className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">1</span>
            </div>
          </button>
          <button className="p-3 rounded-full hover:bg-gray-700 transition-colors relative">
            <MessageCircle className="w-6 h-6 text-white" />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs">●</span>
            </div>
          </button>
          <button className="p-3 rounded-full hover:bg-gray-700 transition-colors">
            <div className="w-6 h-6 bg-gray-600 rounded flex items-center justify-center">
              <span className="text-white text-xs">👥</span>
            </div>
          </button>
          <button className="p-3 rounded-full bg-blue-600 hover:bg-blue-700 transition-colors">
            <div className="w-6 h-6 flex items-center justify-center">
              <span className="text-white text-xs">⚙</span>
            </div>
          </button>
          <button className="p-3 rounded-full hover:bg-gray-700 transition-colors">
            <User className="w-6 h-6 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;