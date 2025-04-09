import React from 'react';
import userImg from '../../assets/avatar.png';
import { useSelector } from 'react-redux';

function Avatar({src}) {
  const profile = useSelector((state) => state.appconfig.myProfile);

  return (
    <div className="w-50px h-10  rounded-full cursor-pointer">
      <img
        className="w-9 h-9  rounded-full active:bg-white object-cover"
        src={src?src:userImg}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar;
