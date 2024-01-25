import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
  loggedIn: false,
  newUser: true,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, { payload }) => {
      state.user = payload;
    },
    clearUser: (state) => {
      state.user = {};
    },
    changeUser: (state) => {
      state.newUser = false;
    },
    unChangeUser: (state) => {
      state.newUser = true;
    },
    logUserIn: (state) => {
      state.loggedIn = true;
    },
    logOutUser: (state) => {
      state.loggedIn = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addUser, clearUser, logUserIn, logOutUser, changeUser, unChangeUser } =
  userSlice.actions;

export default userSlice.reducer;
