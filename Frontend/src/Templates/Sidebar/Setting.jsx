import React, { useContext } from 'react';
import { 
  Shield, 
  Lock, 
  MessageCircle, 
  Bell, 
  HelpCircle, 
  LogOut,
} from 'lucide-react';
import { Store } from '../../Store/Store';

const Settings = () => {
  const {user} = useContext(Store);
  const {name, aboutStatus, profileImage} = user;

  const settingsItems = [
    {
      icon: Shield,
      title: 'Account',
      subtitle: 'Security notifications, account info',
      color: 'text-blue-400',
      bgColor: 'bg-blue-500/10'
    },
    {
      icon: Lock,
      title: 'Privacy',
      subtitle: 'Blocked contacts, disappearing messages',
      color: 'text-green-400',
      bgColor: 'bg-green-500/10'
    },
    {
      icon: MessageCircle,
      title: 'Chats',
      subtitle: 'Theme, wallpaper, chat settings',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10'
    },
    {
      icon: Bell,
      title: 'Notifications',
      subtitle: 'Message notifications',
      color: 'text-orange-400',
      bgColor: 'bg-orange-500/10'
    },
    {
      icon: HelpCircle,
      title: 'Help',
      subtitle: 'Help center, contact us, privacy policy',
      color: 'text-purple-400',
      bgColor: 'bg-purple-500/10'
    }
  ];

  return (
    <div className="h-screen bg-slate-900 text-white flex flex-col overflow-hidden">
      {/* Header - Fixed */}
      <div className="flex-shrink-0 px-4 sm:px-5 lg:px-6 pt-3 sm:pt-4 lg:pt-5 pb-2.5 sm:pb-3 lg:pb-3.5 bg-slate-900 border-b border-slate-800">
        <h1 className="text-lg sm:text-lg lg:text-xl font-bold text-white">Settings</h1>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {/* User Profile Section */}
        <div className="px-4 sm:px-5 lg:px-6 pt-2.5 sm:pt-3 lg:pt-4 pb-1.5 sm:pb-2 lg:pb-3">
          <div className="flex items-center space-x-2.5 sm:space-x-2.5 lg:space-x-3 p-2 sm:p-2 lg:p-2.5 hover:bg-slate-800/30 rounded-lg transition-all duration-200 cursor-pointer">
            <div className="w-12 h-12 sm:w-12 sm:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
              <img src={profileImage} alt={user.name} className='rounded-full w-full h-full object-cover' /> 
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm sm:text-sm lg:text-base font-semibold text-white truncate">{name}</h3>
              <p className="text-xs sm:text-xs lg:text-sm text-slate-400 truncate">{aboutStatus}</p>
            </div>
          </div>
        </div>

        {/* Settings List */}
        <div className="px-4 sm:px-5 lg:px-6 pb-1.5 sm:pb-2 lg:pb-3">
          <div className="space-y-0.5 sm:space-y-0.5 lg:space-y-1">
            {settingsItems.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div 
                  key={index}
                  className="p-2 sm:p-2 lg:p-2.5 cursor-pointer rounded-lg hover:bg-slate-800/30 transition-all duration-200 group"
                >
                  <div className="flex items-center space-x-2.5 sm:space-x-2.5 lg:space-x-3">
                    <div className={`w-10 h-10 sm:w-10 sm:h-10 lg:w-11 lg:h-11 ${item.bgColor} rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200`}>
                      <IconComponent className={`w-5 h-5 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5 ${item.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm sm:text-sm lg:text-base font-semibold text-white truncate">{item.title}</h4>
                      <p className="text-xs sm:text-xs lg:text-sm text-slate-400 leading-tight line-clamp-1">{item.subtitle}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Log Out Section */}
        <div className="px-4 sm:px-5 lg:px-6 border-t border-slate-800 pt-1.5 sm:pt-2 lg:pt-3 pb-3 sm:pb-4 lg:pb-5">
          <div className="p-2 sm:p-2 lg:p-2.5 cursor-pointer rounded-lg hover:bg-red-500/5 transition-all duration-200 group">
            <div className="flex items-center space-x-2.5 sm:space-x-2.5 lg:space-x-3">
              <div className="w-10 h-10 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-red-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                <LogOut className="w-5 h-5 sm:w-5 sm:h-5 lg:w-5.5 lg:h-5.5 text-red-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm sm:text-sm lg:text-base font-semibold text-red-400 truncate">Log out</h4>
                <p className="text-xs sm:text-xs lg:text-sm text-slate-400">Sign out of your account</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgb(15 23 42);
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgb(51 65 85);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgb(71 85 105);
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Settings;