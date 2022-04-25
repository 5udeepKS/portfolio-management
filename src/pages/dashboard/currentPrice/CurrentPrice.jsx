import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CurrentPriceTable from "./CurrentPriceTable";
import {
  getDailyAllMutualFundsAsync,
  getDailyAllStocksAsync,
} from "../../../redux/assetsSlice";

export default function CurrentPrice() {
  const stocksPriceList = useSelector((state) => state.assets.dailyStocks);
  const mfPriceList = useSelector((state) => state.assets.dailyMutualFunds);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getDailyAllMutualFundsAsync());
    dispatch(getDailyAllStocksAsync());
  }, []);

  return (
    <Box
      sx={{
        height: "80vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        alignContent: "center",
      }}
    >
      <CurrentPriceTable
        type="Daily Stock Price"
        rows={stocksPriceList ? stocksPriceList : []}
      />
      <CurrentPriceTable
        type="Daily Mutual Price"
        rows={mfPriceList ? mfPriceList : []}
      />
    </Box>
  );
}
