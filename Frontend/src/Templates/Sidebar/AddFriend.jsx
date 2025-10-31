import React, { useState, useContext } from "react";
import { Store } from "../../Store/Store";
import { X, Search, UserPlus, CheckCircle } from "lucide-react";

export default function AddFriendCard() {
  const {  setIsCardOpen, isMobile } = useContext(Store);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState(null);
  const [isAdded, setIsAdded] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;


    setIsLoading(true);
    setSearchResult(null);
    setIsAdded(false);

    // Simulate API call
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/search-new-friend`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: searchQuery,
            }),
            credentials: "include",
          }
        );

        const responseData = await response.json();

        if (!responseData) {
          throw new Error("No data found (possibly user not in DB)");
        }

        setSearchResult(responseData);

      } catch (error) {
        console.error("Error searching user:", error);
      }

      setIsLoading(false);
    }, 500);
  };

  const handleAddFriend = () => {
    setIsLoading(true);
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_BASE_URL}/api/add-new-friend`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              phoneNumber: searchQuery,

            }),
            credentials: "include",
          }
        );

        const responseData = await response.json();
        if (responseData.message==='Friend added successfully') {
          setIsLoading(false);
          setIsCardOpen(false);
        }

        if (!responseData) {
          throw new Error("No data found (possibly user not in DB)");
        }

      } catch (error) {
        console.error("Error searching user:", error);
      }

      setIsLoading(false);
    }, 500);


  };


  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSearch();
  };
  return (
    <div
      className={`w-full min-h-screen ${isMobile ? "absolute top-1/2 left-1/2" : "absolute top-1/2 left-2/3"
        } transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 `}
    >
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden relative">
        {/* Close button */}
        <button
          onClick={() => setIsCardOpen(false)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          aria-label="Close"
        >
          <X className="w-5 h-5 text-gray-600 cursor-pointer" />
        </button>

        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-6 pb-8">
          <h2 className="text-2xl font-bold text-white text-center">
            Add Friend
          </h2>
          <p className="text-indigo-100 text-center text-sm mt-2">
            Search by Phone Number
          </p>
        </div>

        {/* Search Section */}
        <div className="p-6 -mt-4">
          <div className="bg-white rounded-xl shadow-lg p-4">
            <div className="flex gap-2">
              <input
                type="tel"
                inputMode="numeric"
                pattern="[0-9]*"
                maxLength={15}
                value={searchQuery}
                onChange={(e) => {
                  // Keep only digits before updating state
                  const numericValue = e.target.value.replace(/\D/g, "");
                  setSearchQuery(numericValue);
                }}
                onKeyPress={handleKeyPress}
                placeholder="Enter phone number..."
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              />
              <button
                onClick={handleSearch}
                disabled={isLoading || !searchQuery.trim() || searchQuery.length < 10}
                className="px-6 py-3 cursor-pointer bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 flex items-center gap-2 font-medium"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Loading Animation */}
          {isLoading && (
            <div className="mt-6 flex flex-col items-center justify-center py-8">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 border-4 border-indigo-200 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-indigo-600 rounded-full border-t-transparent animate-spin"></div>
              </div>
              <p className="mt-4 text-gray-600 font-medium">Searching...</p>
            </div>
          )}

          {/* User Found */}
          {!isLoading && searchResult && (
            <div className="mt-6 bg-gradient-to-br from-white to-indigo-50 rounded-xl p-5 shadow-md border border-indigo-100 animate-fadeIn">
              {searchResult.error === "You cannot add yourself as a friend" ? (
                <p className="text-red-600 font-semibold flex items-center gap-1">
                  ⚠️ You cannot add yourself.
                </p>
              ) : searchResult.error ===
                "User with this phone number not found" ? (
                <p className="text-red-600 font-semibold flex items-center gap-1">
                  ❌ User does not exist.
                </p>
              ) :

                searchResult.error ===
                  "User with this phone number not found" ? (
                  <p className="text-red-600 font-semibold flex items-center gap-1">
                    ❌ User does not exist.
                  </p>
                ) :
                  (
                    <div className="flex items-center gap-4">
                      <img
                        src={searchResult.friendProfileImage}
                        alt={searchResult.userName}
                        className="w-16 h-16 rounded-full border-4 border-indigo-200 shadow-md"
                      />
                      <div className="flex-1">
                        <p className="text-sm text-gray-600">
                          {searchResult.userName}
                        </p>
                      </div>


                      {searchResult.isFriend ? (

                        <button
                          className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2  bg-indigo-600 text-white hover:shadow-lg`}
                        >

                          <>
                            <CheckCircle className="w-5 h-5" />
                            Added
                          </>
                        </button>

                      ) : (
                        <button
                          onClick={handleAddFriend}
                          disabled={isAdded}
                          className={`cursor-pointer px-4 py-2 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${isAdded
                            ? "bg-green-500 text-white"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg"
                            }`}
                        >
                          <>
                            <UserPlus className="w-5 h-5" />
                            Add
                          </>
                        </button>
                      )}
                    </div>
                  )}
            </div>
          )}

          {/* User Not Found */}
          {!isLoading && searchResult === false && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-xl p-6 text-center animate-fadeIn">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <X className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="font-bold text-red-800 text-lg">User Not Found</h3>
              <p className="text-red-600 text-sm mt-2">{searchResult?.msg}</p>
            </div>
          )}
        </div>

        {/* Helper text */}
        {!isLoading && !searchResult && (
          <div className="px-6 pb-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Tip:</span> Try searching for a
                friend using their phone number!
              </p>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
