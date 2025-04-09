import React, { useEffect, useState } from 'react';
import dummy from '../../assets/dummy.jpg';
import { FaRegComment } from 'react-icons/fa6';
import { FaEllipsisH, FaHeart } from 'react-icons/fa';
import Avatar from '../avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { likeAndUnlike } from '../../redux/slice/postSlice';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../redux/slice/appConfigSlice';
import { TOAST_SUCCESS } from '../../App';
import { BiLogoTelegram } from 'react-icons/bi';
import { HiOutlineSave } from 'react-icons/hi';

function Post({ post }) {
  const [isExpanded, setIsExpanded] = useState(false);
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
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className="mb-4 ">
      {/* Header */}
      <div className="flex justify-between items-center gap-4 px-4 py-2">
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => navigate(`/profile/${post.owner._id}`)}
        >
          <Avatar
            src={post?.owner?.avatar?.url}
            className="w-10 h-10 sm:w-12 sm:h-12"
          />
          <h4 className="font-bold text-sm sm:text-base md:text-lg">
            {post?.owner?.name}
          </h4>
        </div>
        <div>
          <FaEllipsisH className="text-xl sm:text-2xl cursor-pointer" />
        </div>
      </div>

      {/* Post Image */}
      <div>
        <img
          className="w-full h-auto   object-cover cursor-pointer select-none 
                   md:h-120 lg:h-160"
          src={post?.image?.url}
          alt="Post"
          onDoubleClick={handleLiked}
        />
      </div>

      {/* Post Actions */}
      <div className="px-4 py-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            {post?.isLiked ? (
              <FaHeart
                className="text-2xl text-red-400 cursor-pointer"
                onClick={handleLiked}
              />
            ) : (
              <FaHeart
                className="text-2xl cursor-pointer"
                onClick={handleLiked}
              />
            )}
            <FaRegComment className="text-2xl cursor-pointer" />
            <BiLogoTelegram className="text-2xl cursor-pointer" />
          </div>
          <HiOutlineSave className="text-2xl cursor-pointer" />
        </div>

        {/* Likes & Caption */}
        <div className="mt-2">
          <h4 className="font-semibold text-sm md:text-base">
            {post?.likesCount === 0 ? '' : `${post?.likesCount} likes`}
          </h4>

          <div className="gap-1 mt-1 text-sm md:text-base">
            {isExpanded || post?.caption.length < 100 ? (
              <p>{post?.caption}</p>
            ) : (
              <p>
                {post?.caption.slice(0, 100)}...
                <span
                  onClick={toggleExpand}
                  className="text-blue-500 cursor-pointer"
                >
                  more
                </span>
              </p>
            )}
            {isExpanded && (
              <span
                onClick={toggleExpand}
                className="text-blue-700 cursor-pointer"
              >
                less
              </span>
            )}
          </div>

          <h6 className="text-gray-500 mt-1 font-semibold text-xs md:text-sm">
            {post?.timeago}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default Post;
