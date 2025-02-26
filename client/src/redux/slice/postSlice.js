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
const postSlice = createSlice({
  name: 'postSlice',
  initialState: {
    userProfile: null,
  },
  extraReducers: (builder) => {
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userProfile = action.payload.result;
    });
  },
});

export default postSlice.reducer;
