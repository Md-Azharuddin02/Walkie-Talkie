import React, {useContext} from "react";
import {
  FaEnvelope,
  FaBell,
  FaComment,
  FaUsers,
  FaCircle,
  FaCog,
} from "react-icons/fa";
import img from "../../assets/images/img.jpg";
import { Store } from "../../Store/Store";


// Color mapping for Tailwind classes
const colorMap = {
  gray: {
    text: "text-gray-600",
    bg: "bg-gray-500"
  },
  blue: {
    text: "text-blue-600",
    bg: "bg-blue-500"
  },
  green: {
    text: "text-green-600",
    bg: "bg-green-500"
  }
};

const Sidebar = () => {
  const {setActiveTab} = useContext(Store);

  const Icon = ({ icon: Icon, badge, color = "gray", onClick }) => (
    <div className="relative my-3" onClick={onClick}>
      {typeof Icon === "string" ? (
        <img
          src={Icon}
          alt="Profile"
          className="w-8 h-8 rounded-full cursor-pointer"
        />
      ) : (
        <Icon className={`${colorMap[color].text} text-2xl cursor-pointer`} />
      )}
      {badge && (
        <span
          className={`absolute top-0 right-0 w-4 h-4 ${colorMap[badge.color].bg} text-white text-xs 
                       flex items-center justify-center rounded-full border-2 border-gray-100 cursor-pointer`}
        >
          {badge.content}
        </span>
      )}
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-24 h-screen bg-gray-100 flex flex-col justify-between py-6">
      <div className="flex flex-col items-center space-y-1">
        <Icon icon={FaEnvelope} badge={{ content: "1", color: "blue" }}  onClick={() => setActiveTab('contacts')}/>
        <Icon icon={FaBell} badge={{ color: "green" }} />
        <Icon icon={FaComment} badge={{ color: "green" }} />
        <Icon icon={FaUsers} />
        <Icon icon={FaCircle} color="blue" />
      </div>
      <div className="flex flex-col items-center space-y-1 mt-4">
        <Icon icon={FaCog} onClick={() => setActiveTab('settings')}  />
        <Icon 
          icon={img} 
          onClick={() => setActiveTab('profile')} 
        />
      </div>
    </div>
  );
};

export default Sidebar;