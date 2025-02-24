import React from 'react';
import Post from '../post/Post';
import Follower from '../follower/Follower';

function Feed() {
  return (
    <div className="w-[70%] m-auto">
      <div className="flex w-[100%] m-auto gap-3 ">
        <div className="flex-2  ">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="flex-1">
          <div className="">
            <h3 className="font-semibold mb-3 border-b-2">You Are Following</h3>
            <div>
              <Follower />
              <Follower />
              <Follower />
              <Follower />
            </div>
          </div>
          <div className="mt-8 ">
            <h3 className="font-semibold mb-3 border-b-2 ">
              Suggested For You
            </h3>
            <div>
              <Follower />
              <Follower />
              <Follower />
              <Follower />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Feed;
