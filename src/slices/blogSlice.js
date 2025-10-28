import { createSlice } from '@reduxjs/toolkit';
import { blogPosts } from '../resources/blogPosts.js';

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: blogPosts,
    filters: {
      category: 'Усі',
      query: ''
    }
  },
  reducers: {
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setQuery(state, action) {
      state.filters.query = action.payload;
    }
  }
});

export const { setCategory, setQuery } = blogSlice.actions;
export default blogSlice.reducer;
