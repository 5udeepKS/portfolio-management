import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STOCKS_URL = process.env.REACT_APP_STOCKS_URL;
const MF_URL = process.env.REACT_APP_MF_URL;
const NET_URL = process.env.REACT_APP_NET_URL;

export const getAllStocksAsync = createAsyncThunk(
  "assets/getAllStocksAsync",
  async (payload, { getState }) => {
    const state = getState();
    const token = `Bearer ${state.auth.token}`;
    try {
      const res = await axios.post(`${STOCKS_URL}/DailySharePrice/allstock`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getAllMutualFundsAsync = createAsyncThunk(
  "assets/getAllMutualFundsAsync",
  async (payload, { getState }) => {
    const state = getState();
    const token = `Bearer ${state.auth.token}`;
    try {
      const res = await axios.post(`${MF_URL}/DailyMutualFundNAV/allmf`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getTotalNetworthAsync = createAsyncThunk(
  "assets/getTotalNetworthAsync",
  async (payload, { getState }) => {
    const state = getState();
    const token = `Bearer ${state.auth.token}`;
    try {
      const res = await axios.post(`${NET_URL}/calculateNetworth`, {
        headers: {
          Authorization: token,
        },
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const assetsSlice = createSlice({
  name: "assets",
  initialState: { stocks: [], mutualFunds: [], total: 0 },
  reducers: {
    logOut: (state, action) => {
      return { ...state, isLoggedIn: false };
    },
  },
  extraReducers: {
    [getAllStocksAsync.fulfilled]: (state, action) => {
      return { ...state, stocks: action.payload };
    },
    [getAllMutualFundsAsync.fulfilled]: (state, action) => {
      return { ...state, mutualFunds: action.payload };
    },
    [getTotalNetworthAsync.fulfilled]: (state, action) => {
      return { ...state, total: action.payload };
    },
  },
});

export const { logOut } = assetsSlice.actions;

export default assetsSlice.reducer;
