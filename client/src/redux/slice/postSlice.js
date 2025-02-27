import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../utils/axiosClients';
import { setLoading } from './appConfigSlice';

export const getUserProfile = createAsyncThunk(
  '/getUserProfile',
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.post('/user/getUserProfile', body);
      console.log('userprofile response', response);
      return response;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(true));
    }
  },
);

export const likeAndUnlike = createAsyncThunk(
  'posts/like',
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.post('posts/like', body);
      console.log('userprofile bharat', response);
      return response.result.post;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(true));
    }
  },
);

const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    userProfile: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.userProfile = action.payload.result;
      })
      .addCase(likeAndUnlike.fulfilled, (state, action) => {
        const post = action?.payload;
        if (state.userProfile && state.userProfile.posts) {
          const index = state?.userProfile?.posts?.findIndex(
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
