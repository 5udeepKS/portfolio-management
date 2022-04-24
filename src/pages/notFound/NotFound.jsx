import React from "react";
import { Box, Typography } from "@mui/material";

export default function NotFound() {
  return (
    <>
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
    </>
  );
}
