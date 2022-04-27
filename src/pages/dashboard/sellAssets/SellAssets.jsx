import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";

import AvailableStocks from "./AvailableStocks";
import AvailableMutualFunds from "./AvailableMutualFunds";
import AssetsBeingSold from "./AssetsBeingSold";
import {
  getUserStocksMFAsync,
  getDailyAllMutualFundsAsync,
  getDailyAllStocksAsync,
} from "../../../redux/assetsSlice";

export default function SellAssets(props) {
  const dispatch = useDispatch();

  const initialLoad = useRef(true);

  const { handleAlertOpen, setSnackbarProps } = props;

  const [assetsBeingSold, setAssetsBeingSold] = useState([]);
  const [stocksBeingSold, setStocksBeingSold] = useState([]);
  const [mfBeingSold, setMFBeingSold] = useState([]);

  useEffect(() => {
    let mutualFunds, stocks, currentMFPrice, currentStocksPrice;

    const mfWithPrice = [];
    const stocksWithPrice = [];

    const mfFetch = async () => {
      const mfData = await dispatch(getUserStocksMFAsync()).unwrap();
      return mfData;
    };

    const currentMFPriceFetch = async () => {
      const currentMFPriceData = await dispatch(
        getDailyAllMutualFundsAsync()
      ).unwrap();
      return currentMFPriceData;
    };

    const currentStockPriceFetch = async () => {
      const currentStockPriceData = await dispatch(
        getDailyAllStocksAsync()
      ).unwrap();
      return currentStockPriceData;
    };

    Promise.all([mfFetch(), currentMFPriceFetch(), currentStockPriceFetch()])
      .then((values) => {
        mutualFunds = values[0].mutualFundList;
        stocks = values[0].stockDetailList;
        currentMFPrice = values[1];
        currentStocksPrice = values[2];
      })
      .then(() => {
        if (mutualFunds.length > 0 && currentMFPrice.length > 0) {
          for (let mutualFund of mutualFunds) {
            for (let currentPriceStock of currentMFPrice) {
              if (
                mutualFund.mutualFundName === currentPriceStock.mutualFundName
              ) {
                const item = {
                  ...mutualFund,
                  mfValue: currentPriceStock.mutualFundValue,
                  checked: false,
                  sellCount: 0,
                };
                mfWithPrice.push(item);
                break;
              }
            }
          }
        }

        if (stocks.length > 0 && currentStocksPrice.length > 0) {
          for (let stock of stocks) {
            for (let currentPriceStock of currentStocksPrice) {
              if (stock.stockName === currentPriceStock.stockName) {
                const item = {
                  ...stock,
                  stockValue: currentPriceStock.stockValue,
                  checked: false,
                  sellCount: 0,
                };
                stocksWithPrice.push(item);
                break;
              }
            }
          }
        }
      })
      .then(() => {
        setMFBeingSold(mfWithPrice);
        setStocksBeingSold(stocksWithPrice);
      })
      .catch((e) => {
        console.log(e);
        // handleAlertOpen();
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let selectedStocks = [];
    let selectedMfs = [];
    if (stocksBeingSold.length > 0) {
      selectedStocks = stocksBeingSold.filter((stock) => stock.checked);
    }
    if (mfBeingSold.length > 0) {
      selectedMfs = mfBeingSold.filter((mf) => mf.checked);
    }
    setAssetsBeingSold([...selectedStocks, ...selectedMfs]);
  }, [stocksBeingSold, mfBeingSold]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: `"stock selected"
                              "mf selected"`,
        alignItems: "center",
        justifyItems: "center",
      }}
    >
      <AvailableStocks
        style={{ gridArea: "stock" }}
        type="Available Stock List"
        stocksBeingSold={stocksBeingSold ? stocksBeingSold : []}
        setStocksBeingSold={setStocksBeingSold}
        setSnackbarProps={setSnackbarProps}
      />

      <AvailableMutualFunds
        style={{ gridArea: "mf" }}
        type="Available Mutual Fund"
        mfBeingSold={mfBeingSold ? mfBeingSold : []}
        setMFBeingSold={setMFBeingSold}
        setSnackbarProps={setSnackbarProps}
      />
      <AssetsBeingSold
        style={{ gridArea: "selected" }}
        type="Selected Units"
        assetsBeingSold={assetsBeingSold}
        setAssetsBeingSold={setAssetsBeingSold}
        setSnackbarProps={setSnackbarProps}
      />
    </Box>
  );
}
