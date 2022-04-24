import React from "react";
import { Box, Typography } from "@mui/material";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        position: "absolute",
        bottom: 0,
        width: "100%",
        display: "flex",
        height: "10vh",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      <Typography>&copy; {` Copyright ${currentYear} `}</Typography>
    </Box>
  );
}
