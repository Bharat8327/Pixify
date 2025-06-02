import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClients from '../../utils/axiosClients';
import { KEY_ACCESS_TOKEN, setItem } from '../../utils/localStorageManager';
import { useSelector } from 'react-redux';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const theme = useSelector((state) => state.appconfig.theme);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await axiosClients.post('/auth/login', {
        email,
        password,
      });
      setItem(KEY_ACCESS_TOKEN, response.result.accessToken);
      navigate('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#0B1120] text-white">
      <div className="w-full max-w-md p-8 rounded-lg shadow-xl bg-[#1E293B]">
        {/* Top Icon */}
        <div className="flex justify-center mb-4">
          <div className="bg-[#3B82F6] p-3 rounded-full">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0-.94.39-1.8 1.02-2.42a3.375 3.375 0 10-4.44 5.13c.63.61 1.49 1.01 2.42 1.01z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center mb-2">
          Sign in to your account
        </h2>
        <p className="text-center text-sm text-gray-400 mb-6">
          Or{' '}
          <Link
            to="/signup"
            className="text-[#4F9EF9] hover:underline font-medium"
          >
            create a new account
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold mb-1 text-white"
            >
              Email Address
            </label>
            <div className="flex items-center bg-[#0F172A] rounded-md border border-[#334155] focus-within:ring-2 ring-[#4F9EF9]">
              <span className="px-3 text-gray-400">@</span>
              <input
                id="email"
                type="email"
                className="w-full bg-transparent text-white px-2 py-2 outline-none placeholder-gray-500 text-sm"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold mb-1 text-white"
            >
              Password
            </label>
            <div className="flex items-center bg-[#0F172A] rounded-md border border-[#334155] focus-within:ring-2 ring-[#4F9EF9]">
              <span className="px-3 text-gray-400">🔒</span>
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                className="w-full bg-transparent text-white px-2 py-2 outline-none placeholder-gray-500 text-sm"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="px-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Options */}
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center cursor-pointer ">
              <input type="checkbox" className="mr-2 accent-blue-600" />
              Remember me
            </label>
            {/* <Link
              to="/forgot-password"
              className="text-[#4F9EF9] hover:underline"
            >
              Forgot password?
            </Link> */}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-2 rounded-md font-semibold bg-[#4F46E5] hover:bg-[#4338CA] text-white shadow transition duration-200 cursor-pointer"
          >
            Sign in
          </button>
        </form>
        {/* Footer */}
        <footer className="mt-6 text-center text-xs text-gray-500">
          © 2025 Pixify, Inc. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

export default Login;
