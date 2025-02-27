import React, { useState } from 'react';
import Avatar from '../components/avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClients';
import { setLoading } from '../redux/slice/appConfigSlice';
import { getUserProfile } from '../redux/slice/postSlice';

function CreatePost() {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState('');
  const [postImg, setPostImg] = useState('');
  const profile = useSelector((state) => state.appconfigReducer.myProfile);

  const handleInpImg = (e) => {
    const file = e.target.files[0];
    const fileReader = new FileReader(); // this file reader are basically used to read the file and convert it into base64 bcz need to send it to the server
    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
      if (fileReader.readyState === fileReader.DONE) {
        setPostImg(fileReader.result);
      }
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (caption && postImg) {
      try {
        dispatch(setLoading(true));
        const result = await axiosClient.post('/posts/', {
          caption,
          postImg,
        });
        console.log('post created successfully ');
        dispatch(
          getUserProfile({
            userId: profile?._id,
          }),
        );
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
        setCaption('');
        setPostImg('');
      }
    } else {
      alert('Please add a caption and an image.');
    }
  };

  return (
    <div className="flex border-1 rounded-2xl gap-10 my-2 p-4">
      <div>
        <Avatar src={profile?.avatar?.url} />
      </div>
      <div className="flex-1">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            className="mt-1 block w-full px-2 py-4 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            type="text"
            placeholder="Enter caption"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          />
          <div className="flex justify-center ">
            {postImg && (
              <img
                className="w-[90%] h-120 rounded-md object-cover aspect-16/8 border-2 border-amber-300"
                src={postImg}
                alt="Post"
              />
            )}
          </div>
          <div>
            <div className="flex justify-between">
              <label
                htmlFor="img1"
                className="w-[45%] h-10 flex cursor-pointer items-center justify-center bg-gray-400 rounded-md active:bg-gray-400 text-gray-600 hover:bg-gray-300 "
              >
                Create Post
              </label>
              <button
                type="submit"
                className="cursor-pointer  w-[45%] bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-400  focus:outline-none active:bg-indigo-700 focus:ring-1 focus:ring-offset-2 focus:ring-indigo-400"
              >
                Upload
              </button>
            </div>
            <input
              type="file"
              accept="image/*"
              id="img1"
              className="hidden"
              onChange={handleInpImg}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
