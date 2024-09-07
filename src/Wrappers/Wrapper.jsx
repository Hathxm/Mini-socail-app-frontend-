import React from 'react';
import { Routes, Route,useLocation } from 'react-router-dom';
import Login from '../Pages/Login/Login';
import Signup from '../Pages/Signup/Signup';
import HomePage from '../Pages/Homepage/HomePage';
import UserListing from '../Pages/UserListing/UserListing';
import { useDispatch, useSelector } from 'react-redux';
import { set_user_basic_details } from '../Redux/UserDetails/UserDetailsSlice';
import axiosInstance from '../axiosinstance/axiosinstance';
import Navbar from '../Components/Navbar/Navbar';
import { useEffect } from 'react';
import JoinRoom from '../Components/VideoChat/JoinRoom';
import CreateRoom from '../Components/VideoChat/CreateRoom';
import PrivateRoute from '../Components/PrivateRoute/PrivateRoute';





const Wrapper = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const token = localStorage.getItem('access_token');

  const fetchUserData = async () => {
    try {
      const res = await axiosInstance.get('user-details/', {
        headers: {
          'authorization': `Bearer ${token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      });
      const userData = res.data.data;
      console.log("response is",userData)
      dispatch(
        set_user_basic_details({
          id:userData.id,
          name: userData.username,
          profile_pic: userData.profile_pic,
          email:userData.email,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  // localStorage.clear()
     fetchUserData();
    
    
  },[location.pathname]);
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="signup" element={<Signup/>} />
      <Route path="home" element={<PrivateRoute><Navbar><HomePage/></Navbar></PrivateRoute>} />
      <Route path="chat-users" element={<PrivateRoute><Navbar><UserListing/></Navbar></PrivateRoute>} />
      {/* <Route path="video-chat-users" element={<PrivateRoute></PrivateRoute><Navbar><UserListing/></Navbar>}/> */}
      <Route path="join-room" element={<PrivateRoute><Navbar><JoinRoom/></Navbar></PrivateRoute>} />
      <Route path="create-room" element={<PrivateRoute><Navbar><CreateRoom/></Navbar></PrivateRoute>} />

     



    </Routes>
  );
};

export default Wrapper;

