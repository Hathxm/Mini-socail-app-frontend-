import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinstance/axiosinstance';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate(); // Hook to programmatically navigate

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    
    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password length
    if (password.length < 4) {
      setError('Password must be at least 4 characters long.');
      return;
    }

    // Create an object to hold the form data
    const loginData = {
      email: email,
      password: password,
    };

    // Send a POST request using Axios
    axiosInstance.post('login/', loginData)
      .then(response => {
        if (response.status === 200) {
          setSuccess("Login successful! Redirecting...");
          console.log("access, refresh =", response.data);
          const { access, refresh } = response.data;
          localStorage.setItem("refresh_token", refresh);
          localStorage.setItem("access_token", access);

          setTimeout(() => {
            navigate('/home'); // Redirect to the dashboard or another page
          }, 2000); // Wait for 2 seconds before redirecting
        }
      })
      .catch(error => {
        if (error.response && error.response.data) {
          setError(error.response.data.error || "An error occurred. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen w-full">
      {/* Left side: Welcome message */}
      <div className="bg-indigo-500 flex flex-col justify-center items-center">
        <h1 className="text-4xl font-bold text-primary-foreground mb-4">Welcome to our App</h1>
        <p className="text-lg text-primary-foreground mb-8">Sign up or log in to get started.</p>
        <a
          href="signup"
          className="bg-black text-white px-6 py-3 rounded-md font-medium transition-colors duration-300 ease-in-out hover:bg-white hover:text-black"
        >
          Sign Up
        </a>
      </div>

      {/* Right side: Login form */}
      <div className="flex flex-col justify-center items-center">
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Log In</h2>
            <p className="text-sm text-gray-500">Enter your credentials to access your account.</p>
          </div>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
            {/* Centering the login button */}
            <div className="flex justify-center mt-6">
              <button
                type="submit"
                className="px-6 py-2 bg-black text-white rounded-md hover:bg-primary/90 transition-colors"
              >
                Log In
              </button>
            </div>
            {success && <p className="text-green-600 mt-4">{success}</p>}
            {error && <p className="text-red-600 mt-4">{error}</p>}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
