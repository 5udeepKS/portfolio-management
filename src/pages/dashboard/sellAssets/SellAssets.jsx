import React, { useEffect } from "react";
import { Box } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";

import AvailableStocks from "./AvailableStocks";
import AvailableMutualFunds from "./AvailableMutualFunds";
import StocksBeingSold from "./StocksBeingSold";
import { getUserStocksMFAsync } from "../../../redux/assetsSlice";

export default function SellAssets({ handleAlertOpen }) {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.assets.stocks);
  const mutualFunds = useSelector((state) => state.assets.mutualFunds);

  useEffect(() => {
    dispatch(getUserStocksMFAsync())
      .unwrap()
      .catch(() => {
        // handleAlertOpen();
      });
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateAreas: `"stock selected"
                              "mf selected"`,
      }}
    >
      <AvailableStocks
        style={{ gridArea: "stock" }}
        type="Available Stock List"
        rows={stocks ? stocks : []}
      />

      <AvailableMutualFunds
        style={{ gridArea: "mf" }}
        type="Available Mutual Fund"
        rows={mutualFunds ? mutualFunds : []}
      />
      <StocksBeingSold style={{ gridArea: "selected" }} />
    </Box>
  );
}
