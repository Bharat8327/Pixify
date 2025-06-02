import React, { useEffect } from 'react';
import Follower from '../follower/Follower';
import { useDispatch, useSelector } from 'react-redux';
import { getFeedData } from '../../redux/slice/feedSlice';

function AllUser() {
  const feed = useSelector((state) => state.feedData.feedData);
  const dispatch = useDispatch();

  const feedstatus = useSelector((state) => state.feedData.feedStatus);

  useEffect(() => {
    dispatch(getFeedData());
  }, [feedstatus]);
  return (
    <div className="">
      {feed?.following.length > 0 && (
        <div className="">
          <h3 className="font-semibold mb-3 border-b-2">You Are Following</h3>
          <div>
            {feed?.following?.map((item, idx) => (
              <Follower key={idx} data={item} />
            ))}
          </div>
        </div>
      )}
      {feed?.suggestions.length > 0 && (
        <div className="mt-8">
          <h3 className="font-semibold mb-3 border-b-2">Suggested For You</h3>
          <div>
            {feed?.suggestions?.map((item) => (
              <Follower key={item.updatedAt} data={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AllUser;
