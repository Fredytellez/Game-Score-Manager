import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    firstName: "",
    LastName: "",
    email: "",
    password: "",
}

export const userRegisterSlice = createSlice({
  name: 'userRegister',
  initialState: initialState,
  reducers: {
    getFirstName: (state, action) => {
      state.firstName = action.payload.firstName
    },
    getLastName: (state, action) => {
        state.LastName = action.payload.LastName
    },
    getEmail: (state, action) => {
      state.email = action.payload.email;
    },
    getPassword: (state, action) => {
      state.password = action.payload.password;
    },
  },
});

export const { getFirstName, getLastName, getEmail, getPassword } = userRegisterSlice.actions;
