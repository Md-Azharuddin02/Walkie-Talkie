import React from 'react';
import { 
  User, 
  Shield, 
  Lock, 
  MessageCircle, 
  Bell, 
  Keyboard, 
  HelpCircle, 
  LogOut,
} from 'lucide-react';

const Settings = () => {
  const settingsItems = [
    {
      icon: Shield,
      title: 'Account',
      subtitle: 'Security notifications, account info',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Lock,
      title: 'Privacy',
      subtitle: 'Blocked contacts, disappearing messages',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: MessageCircle,
      title: 'Chats',
      subtitle: 'Theme, wallpaper, chat settings',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Message notifications',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: Keyboard,
      title: 'Keyboard shortcuts',
      subtitle: 'Quick actions',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10'
    },
    {
      icon: HelpCircle,
      title: 'Help',
      subtitle: 'Help center, contact us, privacy policy',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10'
    }
  ];

  return (
    <div className="h-full bg-gray-900 text-white flex flex-col">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-6 pt-12 pb-6 bg-gray-900">
        <h1 className="text-2xl md:text-3xl font-semibold text-white">Settings</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        {/* User Profile Section */}
        <div className="px-6 pb-4">
          <div className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg">
            <div className="w-16 h-16 md:w-18 md:h-18 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-8 h-8 md:w-9 md:h-9 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg md:text-xl font-medium text-white">Prince</h3>
              <p className="text-gray-400 text-sm md:text-base mt-1 truncate">Hey there! I am using WhatsApp.</p>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="px-6 pb-4">
          <div className="space-y-2">
            {settingsItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="p-3 md:p-4 cursor-pointer rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`w-12 h-12 md:w-14 md:h-14 ${item.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <IconComponent className={`w-6 h-6 md:w-7 md:h-7 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-lg md:text-xl font-medium text-white">{item.title}</h4>
                      <p className="text-sm md:text-base text-gray-400 mt-0.5 leading-tight">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Log Out Section */}
        <div className=" border-t border-gray-800 pt-4">
          <div className="p-3 md:p-4 cursor-pointer rounded-lg hover:bg-gray-800 transition-colors">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <LogOut className="w-6 h-6 md:w-7 md:h-7 text-red-500" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-lg md:text-xl font-medium text-red-500">Log out</h4>
                <p className="text-sm md:text-base text-gray-400 mt-0.5">Sign out of your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;