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
    <div className="w-full lg:px-5">
      <div className="flex flex-wrap md:flex-nowrap w-full">
        {/* Left Part (Scrollable, scrollbar hidden) */}
        <div className="flex-1 md:w-2/3 lg:overflow-y-auto h-screen lg:mr-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {feed?.posts?.length === 0 ? (
            <h1 className="text-2xl text-red-500 text-center">
              Posts are Not Available
            </h1>
          ) : (
            feed?.posts?.map((item, idx) => <Post key={idx} post={item} />)
          )}
        </div>

        {/* Right Part (Fixed, Not Scrollable) */}
        <div className="flex-1 md:w-1/3 hidden lg:block">
          <div>
            <h3 className="font-semibold mb-3 border-b-2">You Are Following</h3>
            <div
              className={`${
                feed?.following?.length > 4
                  ? 'max-h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                  : ''
              }`}
            >
              {feed?.following?.map((item, idx) => (
                <Follower key={idx} data={item} />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <h3 className="font-semibold mb-3 border-b-2">Suggested For You</h3>
            <div
              className={`${
                feed?.suggestions?.length > 4
                  ? 'max-h-80 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                  : ''
              }`}
            >
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
