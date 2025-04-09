import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '../../utils/axiosClients';
import { KEY_ACCESS_TOKEN, removeItem } from '../../utils/localStorageManager';
import { useNavigate } from 'react-router-dom';

export const UserInfo = createAsyncThunk(
  '/getUserInfo',
  async (body, thunkApi) => {
    try {
      const response = await axiosClient.get('/user/info');
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
    }
  },
);

export const UpdateUserProfile = createAsyncThunk(
  '/user',
  async (body, thunkApi) => {
    try {
      const response = await axiosClient.put('/user/update', body);
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    } finally {
    }
  },
);

export const DeleteAccount = createAsyncThunk(
  '/delete',
  async ({ body, navigate }, thunkApi) => {
    try {
      const response = await axiosClient.delete('/user/', body);
      removeItem(KEY_ACCESS_TOKEN);
      navigate('/login');
      return response.result;
    } catch (e) {
      return Promise.reject(e);
    }
  },
);

const appconfigSlice = createSlice({
  name: 'appconfig',
  initialState: {
    isLoading: false,
    toastData: {},
    myProfile: null,
    delete: false,
    theme: true,
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    showToast: (state, action) => {
      state.toastData = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
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
export const { setLoading, showToast, setTheme } = appconfigSlice.actions;
