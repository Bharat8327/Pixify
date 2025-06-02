import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axiosClients from '../../utils/axiosClients';
import { Toaster, toast } from 'react-hot-toast';

function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  function validateForm() {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';
    if (!confirmPassword) newErrors.confirmPassword = 'Confirm your password';
    if (password && confirmPassword && password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await axiosClients.post('/auth/signup', {
        name,
        email,
        password,
      });
      toast.success('Registered successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Signup failed. Please try again.',
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#0B1120] text-white flex items-center justify-center px-4">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-md bg-[#1E293B] p-8 rounded-xl shadow-md">
        <div className="flex justify-center mb-4">
          <div className="bg-[#4F46E5] p-3 rounded-full">
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
                d="M18 9a3 3 0 11-6 0 3 3 0 016 0zm-6 6a6 6 0 00-6 6h12a6 6 0 00-6-6z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center">Create your account</h2>
        <p className="text-sm text-center text-gray-400 mt-1 mb-6">
          Already have an account?{' '}
          <Link to="/login" className="text-[#4F9EF9] hover:underline">
            Sign in
          </Link>
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-[#0F172A] border border-[#334155] rounded-md placeholder-gray-400 text-white focus:ring-2 focus:ring-[#4F9EF9] focus:outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <div className="flex items-center bg-[#0F172A] rounded-md border border-[#334155] focus-within:ring-2 ring-[#4F9EF9]">
              <span className="px-3 text-gray-400">@</span>
              <input
                type="email"
                placeholder="youremail@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-transparent text-white px-2 py-2 outline-none placeholder-gray-500 text-sm"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Password</label>
            <div className="flex items-center bg-[#0F172A] rounded-md border border-[#334155] focus-within:ring-2 ring-[#4F9EF9]">
              <span className="px-3 text-gray-400">🔒</span>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-transparent text-white px-2 py-2 outline-none placeholder-gray-500 text-sm"
              />
              <button
                type="button"
                className="px-3 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>

          <div>
            <label className="block text-sm mb-1">Confirm Password</label>
            <div className="flex items-center bg-[#0F172A] rounded-md border border-[#334155] focus-within:ring-2 ring-[#4F9EF9]">
              <span className="px-3 text-gray-400">🔒</span>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-transparent text-white px-2 py-2 outline-none placeholder-gray-500 text-sm"
              />
              <button
                type="button"
                className="px-3 text-gray-400 cursor-pointer"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? '🙈' : '👁️'}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-[#4F46E5] hover:bg-[#4338CA] font-semibold rounded-md transition duration-200"
          >
            Create Account
          </button>
        </form>

        <p className="text-xs text-center text-gray-500 mt-6">
          © {new Date().getFullYear()} Pixify, Inc. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Signup;
