import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../utils/axiosClients';
import { setLoading } from './appConfigSlice';
import { likeAndUnlike } from './postSlice';

export const getFeedData = createAsyncThunk(
  '/user/getFeedData',
  async (_, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.get('/user/getFeedData');
      console.log('userprofile response', response.result);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(true));
    }
  },
);

export const followAndUnfollow = createAsyncThunk(
  '/user/followAndUnfollow',
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.post('/user/follow', body);
      console.log('follow data', response.result);
      return response.result.user;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(true));
    }
  },
);

const feedDataSlice = createSlice({
  name: 'feedDataSlice',
  initialState: {
    feedData: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeedData.fulfilled, (state, action) => {
        state.feedData = action.payload;
      })
      .addCase(likeAndUnlike.fulfilled, (state, action) => {
        const post = action.payload;
        console.log('by feed b', post);

        const index = state?.feedData?.posts?.findIndex(
          (item) => item._id === post._id,
        );
        if (index != undefined && index != -1) {
          state.feedData.posts[index] = post;
        }
      })
      .addCase(followAndUnfollow.fulfilled, (state, action) => {
        const user = action.payload;
        const idx = state?.feedData?.following?.findIndex(
          (item) => item._id === user._id,
        );
        if (idx !== -1) {
          state?.feedData?.following?.splice(idx, 1);
        } else {
          state?.feedData?.following?.push(user);
        }
      });
  },
});

export default feedDataSlice.reducer;
