import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import AvailableStocks from "./AvailableStocks";
import AvailableMutualFunds from "./AvailableMutualFunds";
import StocksBeingSold from "./StocksBeingSold";
import { getUserStocksMFAsync } from "../../../redux/assetsSlice";

export default function SellAssets({ handleAlertOpen }) {
  const dispatch = useDispatch();

  const [assetsBeingSold, setAssetsBeingSold] = useState([]);

  const stocks = useSelector((state) => state.assets.stocks);
  const mutualFunds = useSelector((state) => state.assets.mutualFunds);

  const currentStocksPrice = useSelector((state) => state.assets.dailyStocks);
  const currentMFPrice = useSelector((state) => state.assets.dailyMutualFunds);

  const stocksWithPrice = [];

  const mfWithPrice = [];

  if (stocks.length > 0 && currentStocksPrice.length > 0) {
    for (let stock of stocks) {
      for (let currentPriceStock of currentStocksPrice) {
        if (stock.stockName === currentPriceStock.stockName) {
          const item = { ...stock, stockValue: currentPriceStock.stockValue };
          stocksWithPrice.push(item);
          break;
        }
      }
    }
  }

  if (mutualFunds.length > 0 && currentMFPrice.length > 0) {
    for (let mf of mutualFunds) {
      for (let currentPriceMF of currentMFPrice) {
        if (mf.stockName === currentPriceMF.stockName) {
          const item = { ...mf, mfValue: currentPriceMF.mutualFundValue };
          mfWithPrice.push(item);
          break;
        }
      }
    }
  }

  useEffect(() => {
    dispatch(getUserStocksMFAsync())
      .unwrap()
      .catch(() => {
        // handleAlertOpen();
      });
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: `"stock selected"
                              "mf selected"`,
      }}
    >
      {/* <AvailableStocks
        style={{ gridArea: "stock" }}
        type="Available Stock List"
        rows={stocksWithPrice ? stocksWithPrice : []}
      /> */}

      <AvailableMutualFunds
        style={{ gridArea: "mf" }}
        type="Available Mutual Fund"
        rows={mfWithPrice ? mfWithPrice : []}
        setAssetsBeingSold={setAssetsBeingSold}
        assetsBeingSold={assetsBeingSold}
      />
      {/* <StocksBeingSold style={{ gridArea: "selected" }} /> */}
    </Box>
  );
}
