import React from 'react';
import dummy from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';

function UpdateProfile() {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="flex justify-center items-center bg-pink-100"
      style={{ height: 'calc(100vh - 60px)' }}
    >
      <div className="w-full sm:w-4/5 md:w-2/5 lg:w-3/5 bg-pink-200 p-6 rounded-lg shadow-lg">
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-3">
          <div className="flex-1 text-center sm:text-left lg:text-center lg:flex lg:items-center lg:justify-center">
            <img
              className="w-24 h-24 sm:w-30 sm:h-30 rounded-full mx-auto sm:mx-0"
              src={dummy}
              alt="Profile"
            />
            <h3 className="mt-2 sm:mt-4">bharat_patell9</h3>
          </div>
          <div className="flex-1">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="userName"
                  className="block text-sm font-medium text-gray-700"
                >
                  UserName
                </label>
                <input
                  type="text"
                  id="userName"
                  placeholder="UserName:-"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="bio"
                  className="block text-sm font-medium text-gray-700"
                >
                  Bio
                </label>
                <input
                  type="text"
                  id="bio"
                  placeholder="Bio:-"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <label
                  htmlFor="img"
                  className=" block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="img"
                  className="cursor-pointer mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  className="cursor-pointer mt-4 w-full sm:w-[60%] bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Update
                </button>
                <button
                  onClick={() => navigate('/profile/ram43')}
                  className="cursor-pointer mt-4 w-full sm:w-[40%] bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                >
                  Cancel
                </button>
              </div>
            </form>
            <div>
              <button
                onClick={() => navigate('/login')}
                className="cursor-pointer mt-4 w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600 active:bg-red-400"
              >
                Delete Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpdateProfile;
