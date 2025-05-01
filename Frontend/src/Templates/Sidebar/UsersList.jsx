import React, { useContext } from "react";
import { FaPlus, FaEllipsisV } from "react-icons/fa";
import Search from "../../Components/Search.jsx";
import useFetchData from "../../Custom/fetchData";
import User from "../../Components/User.jsx";
import Loader from '../../Components/Loader.jsx';


// Add this style block (you might want to move it to a separate CSS file)
const styles = `
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px; /* Thinner scrollbar */
  }
  .custom-scrollbar::-webkit-scrollbar-track {
    background: #f1f1f1; /* Light gray track */
  }
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: #888; /* Scrollbar thumb color */
    border-radius: 3px;
  }
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: #555; /* Darker on hover */
  }
`;

// Reusable Icon Button Component
const IconButton = ({ Icon, onClick }) => (
  <Icon className="text-gray-600 cursor-pointer" onClick={onClick} />
);

// Reusable Filter Button Component
const FilterButton = ({ label, isActive = false, onClick }) => {
  const baseStyles = "px-4 py-1 rounded-full text-sm font-medium";
  const activeStyles = isActive
    ? "bg-green-100 text-green-600"
    : "text-gray-600 hover:bg-gray-100";
  return (
    <button className={`${baseStyles} ${activeStyles}`} onClick={onClick}>
      {label}
    </button>
  );
};

// Chat Item Component

// Main ChatList Component
const UsersList = () => {
  const filterOptions = ["ALL", "Unread", "Favourite", "Groups"];
  const [loader, error, users] = useFetchData("api/users");
  console.log('loader is loading:', loader)

  return (
    <>
      <style>{styles}</style>
      <div className="w-full h-full flex flex-col bg-white px-4">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <h1 className="text-3xl font-bold">Chats</h1>

          <div className="flex space-x-3">
            <IconButton
              Icon={FaPlus}
              onClick={() => setIsCardOpen(!isCardOpen)}
            />
            <IconButton Icon={FaEllipsisV} />
          </div>
        </div>

        {/* Search Bar */}
        <Search />

        {/* Filter Tabs */}
        <div className="flex space-x-2 px-4">
          {filterOptions.map((option) => (
            <FilterButton
              key={option}
              label={option}
              isActive={option === "ALL"}
            />
          ))}
        </div>

        {/* Chat List with Custom Scrollbar */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {
            loader ? (<Loader/>): (
              users.map((user) => (
                <User key={user._id} user={user} />
              ))
            )
          }

        </div>
      </div>
    </>
  );
};

export default UsersList;
