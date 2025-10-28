import { createSlice } from '@reduxjs/toolkit';

const STORAGE_KEY = 'hy-telegram-user';

const readStoredUser = () => {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }

    return JSON.parse(raw);
  } catch (error) {
    console.warn('Unable to read stored Telegram user', error);
    return null;
  }
};

const persistUser = (user) => {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    if (user) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch (error) {
    console.warn('Unable to persist Telegram user', error);
  }
};

const initialState = {
  user: readStoredUser()
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      persistUser(action.payload);
    },
    clearUser: (state) => {
      state.user = null;
      persistUser(null);
    }
  }
});

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
