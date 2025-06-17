import React from 'react'

function User({user}) {
  return (
        <div className="flex items-center p-4">
          <img
            src={'user.avatar'}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover mr-3"
          />
          <div className="flex-1 flex justify-between items-center cursor-pointer" >
            <h2 className="text-sm font-semibold">{user.name}</h2>
            <span className="text-xs text-gray-500">{user.time}</span>
          </div>
        </div>
      );
}

export default User