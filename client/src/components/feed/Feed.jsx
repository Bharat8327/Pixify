import React, { useEffect } from 'react';
import Post from '../post/Post';
import Follower from '../follower/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/slice/feedSlice';

function Feed() {
  const dispatch = useDispatch();
  const feed = useSelector((state) => state.feedData.feedData);
  const feedstatus = useSelector((state) => state.feedData.feedStatus);

  useEffect(() => {
    dispatch(getFeedData());
  }, [dispatch, feedstatus]);
  return (
    <div className="w-[70%] m-auto">
      <div className="flex w-[100%] m-auto gap-3 ">
        <div className="flex-2 ">
          {feed?.posts?.length === 0 ? (
            <h1 className="text-2xl text-red-500 text-center ">
              Post are Not Avilable
            </h1>
          ) : (
            feed?.posts?.map((item, idx) => <Post key={idx + 1} post={item} />)
          )}
        </div>
        <div className="flex-1">
          <div className="">
            <h3 className="font-semibold mb-3 border-b-2">You Are Following</h3>
            <div>
              {feed?.following?.map((item, idx) => (
                <Follower key={idx} data={item} />
              ))}
            </div>
          </div>
          <div className="mt-8 ">
            <h3 className="font-semibold mb-3 border-b-2 ">
              Suggested For You
            </h3>
            <div>
              {feed?.suggestions?.map((item) => (
                <Follower key={item.updatedAt} data={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
