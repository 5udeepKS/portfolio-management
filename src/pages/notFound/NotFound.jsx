import { Box, Typography } from "@mui/material";
import React from "react";

export default function NotFound() {
  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    >
      <Typography variant="h2">404 Page Not Found</Typography>
    </Box>
  );
}
