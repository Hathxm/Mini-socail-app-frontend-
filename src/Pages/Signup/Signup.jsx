import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosinstance/axiosinstance';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation checks
    if (name.length < 4) {
      setError('Username must be at least 4 characters long.');
      return;
    }

    if (password.length < 4) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    setError(''); // Clear any existing errors

    const userData = {
      name: name,
      email: email,
      password: password,
    };

    axiosInstance.post('signup/', userData)
      .then(response => {
        if (response.status === 201) {
          setSuccess("Signup successful! Redirecting to login...");
          setTimeout(() => {
            navigate('/'); // Redirect to login page
          }, 2000);
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
    <div className="flex justify-center items-center h-screen w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      <div className="bg-white p-12 rounded-2xl shadow-xl w-full max-w-[400px]">
        <h2 className="text-3xl font-bold mb-6 text-gray-800 text-center">Sign Up</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-purple-600 text-white font-medium rounded-md shadow-sm hover:bg-purple-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Sign Up
          </button>
          {success && <p className="text-green-600 mt-4">{success}</p>}
          {error && <p className="text-red-600 mt-4">{error}</p>}
        </form>
        <div className="mt-6 text-center text-gray-500">
          Already have an account?
          <a href="/" className="text-purple-600 hover:underline">
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Signup;
