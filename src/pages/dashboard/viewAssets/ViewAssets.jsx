import React, { useEffect } from "react";
import { Box, Container } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import AvailableTable from "./AvailableTable";
import TotalAsset from "./TotalAsset";
import {
  getAllStocksAsync,
  getAllMutualFundsAsync,
  getTotalNetworthAsync,
} from "../../../redux/assetsSlice";

export default function ViewAssets() {
  const dispatch = useDispatch();
  const stocks = useSelector((state) => state.assets.stocks);
  const mutualFunds = useSelector((state) => state.assets.mutualFunds);
  const totalNetworth = useSelector((state) => state.assets.total);

  useEffect(() => {
    dispatch(getAllStocksAsync());
    dispatch(getAllMutualFundsAsync());
    dispatch(getTotalNetworthAsync());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container
      sx={{ height: "80vh", display: "flex", flexDirection: "column", py: 2 }}
    >
      <Box sx={{ flex: 1, display: "flex" }}>
        <AvailableTable type="Stock" rows={stocks ? stocks : []} />
        <AvailableTable
          type="Mutual Fund"
          rows={mutualFunds ? mutualFunds : []}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <TotalAsset total={totalNetworth} />
      </Box>
    </Container>
  );
}
