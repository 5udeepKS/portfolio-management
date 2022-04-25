import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const loginUserAsync = createAsyncThunk(
  "auth/loginUserAsync",
  async (payload) => {
    try {
      const res = await axios.post(`${BASE_URL}/getToken`, payload);
      return res.data;
    } catch (e) {
      console.log(e);
    }
    return [];
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState: { token: null, isLoggedIn: false },
  reducers: {
    logOut: (state, action) => {
      return { ...state, isLoggedIn: false };
    },
  },
  extraReducers: {
    [loginUserAsync.fulfilled]: (state, action) => {
      return { ...state, isLoggedIn: true, token: action.payload.jwttoken };
    },
  },
});

export const { logOut } = authSlice.actions;

export default authSlice.reducer;
