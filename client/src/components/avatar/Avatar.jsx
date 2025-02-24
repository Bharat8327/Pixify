import React from 'react';
import userImg from '../../assets/avatar.png';
function Avatar({ src }) {
  return (
    <div className="w-50px h-1px border-2 rounded-full">
      <img
        className="w-9 h-9 bg-orange-300 rounded-full active:bg-white"
        src={src ? src : userImg}
        alt="avatar"
      />
    </div>
  );
}

export default Avatar;
