import React, { useEffect, useState } from 'react';
import Post from '../post/Post';
import dummy from '../../assets/avatar.png';
import { useNavigate, useParams } from 'react-router-dom';
import { IoPersonAddSharp } from 'react-icons/io5';
import CreatePost from '../../createPost/CreatePost';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '../../redux/slice/postSlice';

function Profile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userProfile = useSelector((items) => items.postsReducer.userProfile);
  const myProfile = useSelector((items) => items.appconfigReducer.myProfile);
  const [user, setUser] = useState(false);
  const params = useParams();

  useEffect(() => {
    dispatch(
      getUserProfile({
        userId: params.userId,
      }),
    );
    setUser(myProfile?._id === params.userId);
  }, [myProfile]);

  return (
    <div className="w-[80%] m-auto ">
      <div className="flex w-[90%] m-auto gap-3  ">
        <div className="flex-2  ">
          <CreatePost />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="flex-1 w-[30%]  text-center  ">
          <div className="flex items-center font-bold text-2xl mb-7 ">
            <h3>
              <span className="text-3xl text-blue-400">p</span>
              <sup className="text-xl">rofile</sup> :-{' '}
              <span className="animate-pulse text-blue-400">
                {userProfile?.name}
              </span>
            </h3>
          </div>
          <div className="flex items-center ">
            <img
              className="w-30 h-30 rounded-sm"
              src={userProfile?.avatar?.url || dummy}
              alt=""
            />
            <div className="font-bold flex-col gap-5 justify-between">
              <div className="flex gap-5 pl-9">
                <h2>{userProfile?.posts?.length || 0} Posts</h2>
                <h2>{userProfile?.followers?.length || 0} Followers</h2>
                <h2>{userProfile?.followers?.length || 0} Following</h2>
              </div>
            </div>
          </div>
          <div className="mt-5 flex w-full justify-items-end gap-5 pl-4 ">
            {!user && (
              <button className="bg-blue-400 w-40 text-white font-bold px-6 py-2 border-none rounded-md hover:bg-blue-500 active:bg-blue-300 cursor-pointer">
                follow
              </button>
            )}
            {user && (
              <button
                className="border-2 px-2 w-40 border-blue-400 text-blue-500 font-bold rounded-md cursor-pointer hover:bg-teal-100 active:bg-white"
                onClick={() => navigate('/update')}
              >
                Update Profile
              </button>
            )}
            <button
              className="border-2 px-2  border-blue-400 text-blue-500 font-bold rounded-md cursor-pointer hover:bg-teal-100 active:bg-white"
              onClick={() => navigate('/update')}
            >
              <IoPersonAddSharp />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
