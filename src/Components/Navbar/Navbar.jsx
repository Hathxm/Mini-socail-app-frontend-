import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Navbar = ({children}) => {
  const token = localStorage.getItem('access_token');
  const username = useSelector((state) => state.user_basic_details.name);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear()
    // Add any other items you store in local storage that you want to clear
    navigate('/'); // Redirect to login or home page after logout
  }

  return (
    <>
     <nav className="bg-gray-900 text-white w-full flex justify-between items-center px-5 py-4">
        <div className="flex items-center">
          <a className="text-3xl font-bold" href="#">
            <img className="h-9 inline-block mr-2" src="logo.png" alt="logo" />
          </a>
        </div>

        <div className="flex items-center space-x-5">
          {/* Icons */}
          <a className="hover:text-gray-200" href="#">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zM15 10a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </a>

          {token && username && (
            <span className="text-lg font-semibold mr-2">{username}</span>
          )}

          {token && (
            <button 
              onClick={handleLogout} 
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
            >
              Logout
            </button>
          )}
        </div>
      </nav>
      {children}
    </>
  )
}

export default Navbar;
