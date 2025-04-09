import React, { useEffect, useState } from 'react';
import dummy from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  DeleteAccount,
  UpdateUserProfile,
} from '../../redux/slice/appConfigSlice';

function UpdateProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.appconfig.myProfile);
  const theme = useSelector((state) => state.appconfig.theme);
  const [userName, setUserName] = useState('');
  const [bio, setBio] = useState('');
  const [userImg, setUserImg] = useState('');

  useEffect(() => {
    setUserName(profile?.name || '');
    setBio(profile?.bio || '');
    setUserImg(profile?.img);
  }, [profile]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(UpdateUserProfile({ userName, bio, userImg }));
  };

  const handleAccountDelte = () => {
    dispatch(DeleteAccount({ body: profile, navigate }));
    navigate('/login');
  };

  const handleInpImg = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader(); // this file reader are basically used to read the file and convert it into base64 bcz need to send it to the server
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setUserImg(fileReader.result);
      }
    };
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-4 sm:px-6 lg:px-8">
      <div
        className={`w-full sm:w-4/5 md:w-3/5 lg:w-2/3 p-6 rounded-lg shadow-lg ${
          theme ? 'bg-black text-white' : 'bg-white text-black'
        }`}
      >
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Profile Section (Responsive) */}
          <div className="flex flex-col lg:flex-col items-center lg:items-start gap-4 lg:gap-6">
            <h3 className="mb-2 font-bold text-xl text-center lg:text-left">
              {profile?.name[0].toUpperCase() + profile?.name.substring(1) ||
                ''}
            </h3>
            <div className="flex flex-col items-center lg:items-start gap-4">
              <label htmlFor="img1" className="cursor-pointer">
                <img
                  className="w-24 h-24 sm:w-30 sm:h-30 rounded-full border-dashed border-2 object-cover"
                  src={userImg || profile?.avatar?.url}
                  alt="Profile"
                />
              </label>
              <input
                type="file"
                accept="image/*"
                id="img1"
                className="hidden"
                onChange={handleInpImg}
              />
            </div>
          </div>

          {/* Right Form Section */}
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
                  value={userName || ''}
                  autoComplete="on"
                  onChange={(e) => setUserName(e.target.value)}
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
                  autoComplete="on"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Bio:-"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="img"
                  className="block text-sm font-medium text-gray-700"
                >
                  Profile Image
                </label>
                <input
                  type="file"
                  id="img"
                  accept="image/*"
                  onChange={handleInpImg}
                  className="cursor-pointer mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                />
              </div>

              {/* Buttons Section */}
              <div className="flex flex-col lg:flex-row gap-4">
                <button
                  type="submit"
                  className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/profile/${profile._id}`)}
                  className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-400 focus:ring-2 focus:ring-pink-500"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Delete Account Button */}
            <div className="mt-4">
              <button
                onClick={handleAccountDelte}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:ring-2 focus:ring-red-600 active:bg-red-400"
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
