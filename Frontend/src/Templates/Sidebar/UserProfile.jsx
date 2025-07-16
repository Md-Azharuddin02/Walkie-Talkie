import React, { useContext,useState } from "react";
import { Store } from "../../Store/Store";
import { FaUser } from "react-icons/fa";


const UserProfile = () => {
  const { user } = useContext(Store);
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <div className="w-full h-full bg-white overflow-y-auto">
      <div className="p-6">
        <h2 className="text-xl lg:text-2xl font-semibold mb-6">Profile</h2>
        
        {/* Profile Image */}
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <FaUser className="text-gray-600 text-2xl" />
          </div>
          <button className="text-blue-600 text-sm">Change Photo</button>
        </div>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input 
              type="text" 
              defaultValue={user.name}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">About</label>
            <textarea 
              rows="3"
              placeholder="Tell us about yourself..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>
          
          <button 
            className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Updating..." : "Update Profile"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserProfile;