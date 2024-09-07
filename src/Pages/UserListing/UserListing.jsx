// src/components/UserListing.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../axiosinstance/axiosinstance'; // Adjust the import path as needed

import ChatModal from '../../Components/ChatComponent'; // Adjust the import path as needed
import { useSelector } from 'react-redux';

const UserListing = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const user_basic_details = useSelector((state) => state.user_basic_details);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('users/'); // Adjust the endpoint as needed
        setUsers(response.data.data); // Access the nested 'data' field
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch users');
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleConnect = (user) => {
      setSelectedUser(user);
      setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-6 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">User Listing</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="py-3 px-6 border-b text-left">ID</th>
              <th className="py-3 px-6 border-b text-left">Username</th>
              <th className="py-3 px-6 border-b text-left">Email</th>
              <th className="py-3 px-6 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id}>
                  <td className="py-3 px-6 border-b text-left">{user.id}</td>
                  <td className="py-3 px-6 border-b text-left">{user.username}</td>
                  <td className="py-3 px-6 border-b text-left">{user.email}</td>
                  <td className="py-3 px-6 border-b text-left">
                    <button 
                      className="bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
                      onClick={() => handleConnect(user)}
                    >
                     Chat
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-3 px-6 text-center">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selectedUser && (
        <ChatModal
          isOpen={modalOpen}
          onClose={handleCloseModal}
          userId={user_basic_details.id}
          otherUserId={selectedUser.id}
          username={selectedUser.username}
          sendername={user_basic_details.name} // Replace with the actual sender's username
        />
      )}
    </div>
  );
};

export default UserListing;
