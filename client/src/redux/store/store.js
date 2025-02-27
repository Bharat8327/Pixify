import { configureStore } from '@reduxjs/toolkit';
import appconfigReducer from '../slice/appConfigSlice';
import feedDataReducer from '../slice/feedSlice';
import postsReducer from '../slice/postSlice';
export default configureStore({
  reducer: {
    postsReducer,
    appconfigReducer,
    feedDataReducer,
  },
});
