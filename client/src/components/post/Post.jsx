import React from 'react';
import dummy from '../../assets/dummy.jpg';
import { CiHeart } from 'react-icons/ci';
import { FaRegComment } from 'react-icons/fa6';
import Avatar from '../avatar/Avatar';

function Post({ post }) {
  return (
    <div className="border-1 border-green-300 mb-[10px] rounded-2xl">
      <div className="flex items-center gap-3 p-2 ">
        <Avatar />
        <h4 className="font-bold">Bharat</h4>
      </div>
      <div>
        <img
          className="w-[100%] h-[100%] rounded-2xl px-2 pb-2"
          src={dummy}
          alt=""
        />
      </div>

      <div className="p-3  ">
        <div className="flex items-center gap-1 ">
          <CiHeart className="text-3xl" />
          <h4 className="font-semibold mr-2">4 likes</h4>
          <FaRegComment className="text-2xl" />
        </div>
        <div className="  px-2">
          <p className="mt-1">
            THis is a flower i love it Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Quas, dolorum!{' '}
          </p>
          <h6 className="text-[#aaa] mt-1">4h ago</h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
