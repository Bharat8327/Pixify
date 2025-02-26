import React from 'react';
import '../../../src/index.css';
import Avatar from '../avatar/Avatar';
import { BiLogOutCircle } from 'react-icons/bi';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Navbar() {
  const navigate = useNavigate();
  const profile = useSelector((state) => state.appconfigReducer.myProfile);

  return (
    <div className="border-b-2 var(--border-color)  h-[50px] fixed top-0 w-full bg-white  ">
      <div className="flex max-w-[960px] h-[100%]  justify-between items-center mx-auto  ">
        <h1
          className="text-2xl font-semibold cursor-pointer"
          onClick={() => navigate('/')}
        >
          <span className=" text-cyan-500 hover:text-red-400 active:hover:text-black">
            <span className="text-pink-400">p</span>
            <sup>atel</sup>
            <sub className="text-blue-400">
              Brother'<sup className="text-yellow-400">s</sup>
            </sub>
          </span>
        </h1>
        <div className="flex gap-5 items-center">
          <div
            className="font-semibold cursor-pointer"
            onClick={() => navigate(`/profile/${profile._id}`)}
          >
            <Avatar src={profile?.avatar?.url} />
          </div>
          <div className="text-4xl cursor-pointer hover:text-red-500 active:text-black">
            <BiLogOutCircle onClick={() => navigate('/login')} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
