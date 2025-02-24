import React from 'react';
import Post from '../post/Post';
import dummy from '../../assets/avatar.png';
import { useNavigate } from 'react-router-dom';
import { IoPersonAddSharp } from 'react-icons/io5';

function Profile() {
  const navigate = useNavigate();
  return (
    <div className="w-[80%] m-auto ">
      <div className="flex w-[90%] m-auto gap-3  ">
        <div className="flex-2  ">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="flex-1 w-[30%]  text-center  ">
          <div className="flex items-start font-bold text-2xl ">
            <h3>Bharat Patel</h3>
          </div>
          <div className="flex items-center">
            <img className="w-30 h-30" src={dummy} alt="" />
            <div className="font-bold flex-col gap-5 justify-between">
              <div className="flex gap-5 mt-5 pl-9">
                <h2>30 Posts</h2>
                <h2>40 Followers</h2>
                <h2>12 Following</h2>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full justify-items-end gap-5 pl-4 ">
            <button className="bg-blue-400 w-40 text-white font-bold px-6 py-2 border-none rounded-md hover:bg-blue-500 active:bg-blue-300 cursor-pointer">
              follow
            </button>
            <button
              className="border-2 px-2 w-40 border-blue-400 text-blue-500 font-bold rounded-md cursor-pointer hover:bg-teal-100 active:bg-white"
              onClick={() => navigate('/update')}
            >
              Update Profile
            </button>
            <button
              className="border-2 px-2  border-blue-400 text-blue-500 font-bold rounded-md cursor-pointer hover:bg-teal-100 active:bg-white"
              onClick={() => navigate('/update')}
            >
              <IoPersonAddSharp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
