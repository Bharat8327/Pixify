import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import dummy from '../../assets/avatar.png';
import { useNavigate, useParams } from 'react-router-dom';
import { IoPersonAddSharp } from 'react-icons/io5';
import CreatePost from '../../createPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slice/postSlice';
import { followAndUnfollow } from '../../redux/slice/feedSlice';
import Follower from '../follower/Follower';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const myProfile = useSelector((items) => items.appconfig.myProfile);
  const feed = useSelector((state) => state.feedData.feedData);
  const feedstatus = useSelector((state) => state.feedData.feedStatus);
  const userProfile = useSelector((items) => items.posts.userProfile);
  const [user, setUser] = useState(false);
  const [follow, setFollow] = useState(false);
  const [suggestion, setSuggestion] = useState(false);
  const params = useParams();

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      }),
    );
    setFollow(feed?.following?.find((item) => item._id === params.userId));
    setUser(myProfile?._id === params.userId);
  }, [myProfile, params.userId, feed, feedstatus]);

  const handleUserFollow = () => {
    dispatch(
      followAndUnfollow({
        userIdToFollow: params.userId,
      }),
    );
  };
  const handleSuggestion = () => {
    setSuggestion(!suggestion);
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto  sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Sidebar */}
        <div className="flex-1 text-center px-2 lg:text-left">
          <div className="flex items-center font-bold text-2xl mb-4">
            <h3>
              <span className=" text-blue-400">{userProfile?.name}</span>
            </h3>
          </div>

          <div className="flex sm:flex-col items-center lg:items-start mb-2 justify-between ">
            <div>
              <img
                className="sm:w-40 sm:h-40 w-12 h-[30%] rounded-full mb-1 sm:mb-3"
                src={userProfile?.avatar?.url || dummy}
                alt="Profile Avatar"
              />
            </div>
            <div className=" font-bold flex sm:gap-15 lg:gap-4 gap-3 flex-wrap justify-center lg:justify-start">
              <h2>{userProfile?.posts?.length || 0} Posts</h2>
              <h2>{userProfile?.followers?.length || 0} Followers</h2>
              <h2>{userProfile?.following?.length || 0} Following</h2>
            </div>
          </div>

          <div className="text-sm  my-2  text-left">
            <p>Bio: {userProfile?.bio}</p>
          </div>

          <div className="mt-5 flex flex-row gap-4 justify-center md: lg:justify-start">
            {!user ? (
              <button
                onClick={handleUserFollow}
                className="bg-blue-400 text-white font-bold px-6 py-2 rounded-md hover:bg-blue-500 active:bg-blue-300 cursor-pointer w-full lg:w-auto"
              >
                {follow ? 'Unfollow' : 'Follow'}
              </button>
            ) : (
              <button
                onClick={() => navigate('/update')}
                className="border-2 px-4 py-2 border-blue-400 text-blue-500 font-bold rounded-md hover:bg-teal-100 active:bg-white cursor-pointer w-full lg:w-auto"
              >
                Update Profile
              </button>
            )}

            <button
              onClick={handleSuggestion}
              className="border-2 lg:px-4 lg:py-2 px-2 border-blue-400 text-blue-500 font-bold rounded-md hover:bg-teal-100 active:bg-white cursor-pointer t  w-10 sm:w-auto"
            >
              <IoPersonAddSharp />
            </button>
          </div>

          {suggestion && (
            <div className="mt-7">
              <h3 className="font-semibold mb-3 border-b-2">
                Suggested For You
              </h3>
              <div
                className={
                  feed?.suggestions?.length > 4
                    ? 'overflow-y-auto h-60 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]'
                    : ''
                }
              >
                {feed?.suggestions?.map((item) => (
                  <div key={item.updatedAt} className="rounded-lg mb-2 p-3">
                    <Follower data={item} />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Content */}
        <div className="flex-2 w-full lg:w-2/3 overflow-y-auto h-screen [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {user && <CreatePost />}
          {userProfile?.posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
