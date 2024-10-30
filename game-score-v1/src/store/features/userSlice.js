import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: { email: '', password: '' },
  reducers: {
    getEmail: (state, action) => {
      state.email = action.payload.email;
    },
    getPassword: (state, action) => {
      state.password = action.payload.password;
    },
  },
});

export const { getEmail, getPassword } = userSlice.actions;
