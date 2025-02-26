import { configureStore } from '@reduxjs/toolkit';
import appconfigReducer from '../slice/appConfigSlice';
import postsReducer from '../slice/postSlice';
export default configureStore({
  reducer: {
    appconfigReducer,
    postsReducer,
  },
});
