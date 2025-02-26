import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../utils/axiosClients';

export const UserInfo = createAsyncThunk(
  '/getUserInfo',
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.get('/user/info');
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

export const UpdateUserProfile = createAsyncThunk(
  '/user',
  async (body, thunkApi) => {
    try {
      thunkApi.dispatch(setLoading(true));
      const response = await axiosClient.put('/user/update', body);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
      thunkApi.dispatch(setLoading(false));
    }
  },
);

const appconfigSlice = createSlice({
  name: 'appconfig',
  initialState: {
    isLoading: false,
    myProfile: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(UserInfo.fulfilled, (state, action) => {
        if (action.payload && action.payload.user) {
          state.myProfile = action.payload.user;
        }
      })
      .addCase(UpdateUserProfile.fulfilled, (state, action) => {
        if (action.payload && action.payload.user) {
          state.myProfile = action.payload.user;
        }
      });
  },
});

export default appconfigSlice.reducer;
export const { setLoading } = appconfigSlice.actions;
