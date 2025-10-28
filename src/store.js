import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice.js';
import blogReducer from './slices/blogSlice.js';
import earnReducer from './slices/earnSlice.js';
import launchpoolReducer from './slices/launchpoolSlice.js';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    blog: blogReducer,
    earn: earnReducer,
    launchpool: launchpoolReducer
  }
});
