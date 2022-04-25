import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function TotalAsset({ total }) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly",
        height: "100%",
      }}
    >
      <Typography> Your Total Networth : {total}</Typography>
      <Button
        variant="outlined"
        onClick={() => {
          navigate("/dashboard/sell-assets");
        }}
      >
        Sell Assets
      </Button>
    </Box>
  );
}
