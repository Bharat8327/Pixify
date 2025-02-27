import React, { useEffect, useState } from 'react';
import dummy from '../../assets/avatar.png';
import Avatar from '../avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import { followAndUnfollow } from '../../redux/slice/feedSlice';
import { useNavigate } from 'react-router-dom';

function Follower({ data }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feedDataReducer.feedData);
  const [follow, setFollow] = useState();

  useEffect(() => {
    setFollow(feed?.following?.find((item) => item._id === data._id));
  }, [feed]);

  const handleUserFollow = () => {
    dispatch(
      followAndUnfollow({
        userIdToFollow: data._id,
      }),
    );
  };

  return (
    <div className=" flex justify-between items-center mt-2 ">
      <div
        className="flex items-center py-1 px-1 gap-2 cursor-pointer "
        onClick={() => navigate(`/profile/${data._id}`)}
      >
        <Avatar src={data?.avatar?.url} />
        <h4 className="text-xl ">{data?.name}</h4>
      </div>
      <div>
        <button
          onClick={handleUserFollow}
          className="bg-blue-400  text-white font-bold px-6 py-2 border-none rounded-md hover:bg-blue-500 active:bg-blue-300 cursor-pointer"
        >
          {follow ? <span>Unfollow</span> : <span>Following</span>}
        </button>
      </div>
    </div>
  );
}

export default Follower;
