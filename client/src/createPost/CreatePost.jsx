import React, { useState } from 'react';
import Avatar from '../components/avatar/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import axiosClient from '../utils/axiosClients';
import { getUserProfile } from '../redux/slice/postSlice';
import { setLoading } from '../redux/slice/appConfigSlice';

function CreatePost() {
  const dispatch = useDispatch();
  const [caption, setCaption] = useState('');
  const [postImg, setPostImg] = useState('');
  const profile = useSelector((state) => state.appconfig.myProfile);

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
    // if (caption && postImg) {
    try {
      const result = await axiosClient.post('/posts/', {
        caption,
        postImg,
      });
      dispatch(
        getUserProfile({
          userId: profile?._id,
        }),
      );
    } catch (error) {
      import('../redux/store/store').then(({ default: store }) => {
        store.dispatch(setLoading(true));
      });
    } finally {
      setCaption('');
      setPostImg('');
    }
  };

  return (
    <div className="flex flex-col md:flex-row border-1 rounded-2xl gap-4 my-2 p-4">
    {/* Profile Image */}
    <div className="flex justify-center items-center mb-4 md:mb-0">
      <Avatar src={profile?.avatar?.url} className="w-16 h-16 rounded-full" />
    </div>
  
    {/* Form Section */}
    <div className="flex-1 space-y-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Input Title Field */}
        <input
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          type="text"
          placeholder="Enter caption"
          required
          
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
  
        {/* Image Upload Box */}
        <div className="flex justify-center">
          {postImg ? (
            <img
              className="w-full max-w-full max-h-96 object-contain rounded-md border-2 border-amber-300"
              src={postImg}
              alt="Post"
            />
          ) : (
            <label
              htmlFor="img1"
              className="w-full h-40 flex items-center justify-center border-2 border-dashed border-gray-400 rounded-md cursor-pointer hover:bg-gray-100"
            >
              <span className="text-gray-500">Upload Image</span>
            </label>
          )}
        </div>
  
        {/* Buttons */}
        <div className="flex justify-between">
          {!postImg && (
            <label
              htmlFor="img1"
              className="w-[100%] h-10 flex items-center justify-center bg-gray-400 rounded-md cursor-pointer text-white hover:bg-gray-300"
            >
              Create Post
            </label>
          )}
  
          {postImg && (
            <button
              type="submit"
              className="w-[100%] bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-400 focus:outline-none active:bg-indigo-700 focus:ring-1 focus:ring-offset-2 focus:ring-indigo-400"
            >
              Upload
            </button>
          )}
        </div>
  
        <input
          type="file"
          accept="image/*"
          id="img1"
          className="hidden"
          onChange={handleInpImg}
        />
      </form>
    </div>
  </div>
  
  );
}

export default CreatePost;
