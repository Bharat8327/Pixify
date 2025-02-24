import React, { useState } from 'react';
import dummy from '../../assets/avatar.png';
import Avatar from '../avatar/Avatar';
function Follower() {
  const [follow, setFollow] = useState('follow');

  const handleFollow = () => {
    if (follow === 'follow') {
      setFollow('unfollow');
    } else {
      setFollow('follow');
    }
  };

  return (
    <div className=" flex justify-between items-center mt-2 ">
      <div className="flex items-center py-1 px-1 gap-2  ">
        <Avatar />
        <h4 className="text-xl ">Raju</h4>
      </div>
      <div>
        <button
          onClick={handleFollow}
          className="bg-blue-400  text-white font-bold px-6 py-2 border-none rounded-md hover:bg-blue-500 active:bg-blue-300 cursor-pointer"
        >
          {follow}
        </button>
      </div>
    </div>
  );
}

export default Follower;
