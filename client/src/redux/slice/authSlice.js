import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem("token");

const initialState = {
  isAuthenticated: !!token,   //set true if token exists
  token: token || null,
  status: "idle",
  error: null,
};



const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
  

    login: (state, ) => {
      state.status = 'loading';
      console.log("from login slice....")
    },

    loginSuccess: (state, action) => {
      state.status = 'succeeded';
      state.isAuthenticated = true;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },

    loginFailure: (state, action) => {
      state.status = 'failed';
      state.error = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.status = "";
      state.token = null;
      localStorage.removeItem("token");
      console.log("logout state from dialogcompoent", state);

    },
  },

});

export const { login, loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
