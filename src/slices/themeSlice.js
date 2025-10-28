import { createSlice } from '@reduxjs/toolkit';

const initialMode = (() => {
  if (typeof window === 'undefined') {
    return 'light';
  }
  const stored = window.localStorage.getItem('hy-theme');
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  if (window.matchMedia?.('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
})();

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    mode: initialMode
  },
  reducers: {
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light';
      window.localStorage.setItem('hy-theme', state.mode);
    },
    setTheme(state, action) {
      state.mode = action.payload;
      window.localStorage.setItem('hy-theme', state.mode);
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
