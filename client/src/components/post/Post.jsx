import React, { useEffect } from 'react';
import dummy from '../../assets/dummy.jpg';
import { IoIosHeartHalf } from 'react-icons/io';
import { FaRegComment } from 'react-icons/fa6';
import { FaHeart } from 'react-icons/fa';
import Avatar from '../avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { likeAndUnlike } from '../../redux/slice/postSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/slice/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';

function Post({ post }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function handleLiked() {
    dispatch(
      showToast({
        type: TOAST_SUCCESS,
        message: 'liked or unliked',
      }),
    );
    dispatch(
      likeAndUnlike({
        postId: post._id,
      }),
    );
  }
  return (
    <div className="border-1 border-green-300 mb-[10px] rounded-2xl">
      <div
        className="flex items-center gap-3 p-2 "
        onClick={() => {
          navigate(`/profile/${post.owner._id}`);
        }}
      >
        <Avatar src={post?.owner?.avatar?.url} />
        <h4 className="font-bold cursor-pointer">{post?.owner?.name}</h4>
      </div>
      <div>
        <img
          className="w-[100%] h-[100%] rounded-2xl object-cover px-2 pb-2"
          src={post?.image?.url}
          alt=""
        />
      </div>

      <div className="p-3  ">
        <div className="flex items-center gap-1 ">
          {post?.isLiked ? (
            <FaHeart
              className="text-4xl cursor-pointer text-red-400"
              onClick={handleLiked}
            />
          ) : (
            <IoIosHeartHalf
              className="text-4xl cursor-pointer"
              onClick={handleLiked}
            />
          )}
          <h4 className="font-semibold mr-2">{`${
            post?.likesCount === 0 ? '' : post?.likesCount + ' likes'
          }`}</h4>
          <FaRegComment className="text-2xl cursor-pointer" />
        </div>
        <div className="  px-2">
          <p className="mt-1">{post?.caption}</p>
          <h6 className="text-[#aaa] mt-1">{post?.timeago}</h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
