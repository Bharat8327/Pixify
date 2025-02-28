import axiosClient from '../../utils/axiosClients';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const getUserProfile = createAsyncThunk(
  '/getUserProfile',
  async (body, _) => {
    try {
      const response = await axiosClient.post('/user/getUserProfile', body);
      return response;
    } catch (e) {
      return Promise.reject(e);
    } finally {
    }
  },
);

export const likeAndUnlike = createAsyncThunk(
  'posts/like',
  async (body, thunkApi) => {
    try {
      const response = await axiosClient.post('posts/like', body);
      if (response?.result?.post) {
        return response.result.post;
      }
    } catch (e) {
      return Promise.reject(e);
    } finally {
    }
  },
);

const postSlice = createSlice({
  name: 'posts',
  initialState: {
    userProfile: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action?.payload?.result;
      })
      .addCase(likeAndUnlike.fulfilled, (state, action) => {
        const post = action?.payload;
        if (state.userProfile?.posts) {
          const index = state.userProfile.posts.findIndex(
            (item) => item._id === post._id,
          );
          if (index !== -1) {
            state.userProfile.posts[index] = post;
          }
        }
      });
  },
});

export default postSlice.reducer;
