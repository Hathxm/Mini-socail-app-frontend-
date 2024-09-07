import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebookMessenger, FaVideo, FaPlusCircle, FaSignInAlt } from 'react-icons/fa';

const HomePage = () => {
  const navigate = useNavigate();

  const handleChatClick = () => {
    navigate('/chat-users');
  };

  const handleCreateRoomClick = () => {
    navigate('/create-room');
  };

  const handleJoinRoomClick = () => {
    navigate('/join-room');
  };

  return (
    <>
      {/* Navbar */}
     
      {/* Content */}
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
          {/* Card 1: Chat With Users */}
          <div
            className="bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={handleChatClick}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="text-blue-500 text-6xl mb-4">
                <FaFacebookMessenger />
              </div>
              <h2 className="text-xl font-semibold mb-2">Chat With Users</h2>
              <p className="text-gray-600">Start chatting with users and manage your conversations.</p>
            </div>
          </div>

        
          {/* Card 3: Create Room */}
          <div
            className="col-span-1 md:col-span-2 lg:col-span-1 bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={handleCreateRoomClick}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="text-green-500 text-6xl mb-4">
                <FaPlusCircle />
              </div>
              <h2 className="text-xl font-semibold mb-2">Create Room</h2>
              <p className="text-gray-600">Create a new room for video or audio conferencing.</p>
            </div>
          </div>

          {/* Card 4: Join Room */}
          <div
            className="col-span-1 md:col-span-2 lg:col-span-1 bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl cursor-pointer"
            onClick={handleJoinRoomClick}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="text-yellow-500 text-6xl mb-4">
                <FaSignInAlt />
              </div>
              <h2 className="text-xl font-semibold mb-2">Join Room</h2>
              <p className="text-gray-600">Join an existing room for video or audio conferencing.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;


