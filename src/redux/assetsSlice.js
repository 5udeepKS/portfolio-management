import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const STOCKS_URL = process.env.REACT_APP_STOCKS_URL;
const MF_URL = process.env.REACT_APP_MF_URL;
const NET_URL = process.env.REACT_APP_NET_URL;

export const getUserStocksMFAsync = createAsyncThunk(
  "assets/getAllStocksAsync",
  async (payload, { getState }) => {
    const state = getState();
    const token = `Bearer ${state.auth.token}`;
    try {
      const res = await axios.get(`${NET_URL}/calculateNetworth/viewAsset`, {
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

export const getDailyAllStocksAsync = createAsyncThunk(
  "assets/getDailyAllStocksAsync",
  async (payload, { getState }) => {
    const state = getState();
    const token = `Bearer ${state.auth.token}`;
    try {
      const res = await axios.get(`${STOCKS_URL}/DailySharePrice/allstock`, {
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

export const getDailyAllMutualFundsAsync = createAsyncThunk(
  "assets/getDailyAllMutualFundsAsync",
  async (payload, { getState }) => {
    const state = getState();
    const token = `Bearer ${state.auth.token}`;
    try {
      const res = await axios.get(`${MF_URL}/DailyMutualFundNAV/allmf`, {
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
      const res = await axios.get(`${NET_URL}/calculateNetworth/`, {
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

export const sellAssetsAsync = createAsyncThunk(
  "assets/sellAssetsAsync",
  async (payload, { getState }) => {
    const state = getState();
    const token = `Bearer ${state.auth.token}`;
    try {
      const res = await axios.post(
        `${NET_URL}/calculateNetworth/sellAssets`,
        payload,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return res.data.networth;
    } catch (e) {
      console.log(e);
    }
  }
);

export const assetsSlice = createSlice({
  name: "assets",
  initialState: {
    stocks: [],
    mutualFunds: [],
    dailyStocks: [],
    dailyMutualFunds: [],
    total: 0,
  },
  extraReducers: {
    [getUserStocksMFAsync.fulfilled]: (state, action) => {
      return {
        ...state,
        stocks: action.payload.stockDetailList,
        mutualFunds: action.payload.mutualFundList,
      };
    },
    [getTotalNetworthAsync.fulfilled]: (state, action) => {
      return { ...state, total: action.payload };
    },
    [getDailyAllStocksAsync.fulfilled]: (state, action) => {
      return { ...state, dailyStocks: action.payload };
    },
    [getDailyAllMutualFundsAsync.fulfilled]: (state, action) => {
      return { ...state, dailyMutualFunds: action.payload };
    },
    [sellAssetsAsync.fulfilled]: (state, action) => {
      return { ...state, total: action.payload };
    },
  },
});

export const { logOut } = assetsSlice.actions;

export default assetsSlice.reducer;
