import React from "react";
import { Box, Typography } from "@mui/material";

import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
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
      <Footer />
    </>
  );
}
