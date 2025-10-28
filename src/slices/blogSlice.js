import { createSlice } from '@reduxjs/toolkit';
import { Resources, blogPosts } from '../resources/Resources.ts';

const defaultCategory = Resources.blog.allCategoryLabel;

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    posts: blogPosts,
    filters: {
      category: defaultCategory,
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
