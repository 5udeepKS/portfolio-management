import React from "react";
import { Box, Paper, Divider, Typography, Button } from "@mui/material";
import { useNavigate, Outlet } from "react-router-dom";

import dashboardLinks from "../../assets/links/dashboardLinks";
import analyticsImage from "../../assets/images/analytics.png";

export function DashboardOutlet() {
  return <Outlet />;
}

export default function Dashboard() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "90%", display: "flex", p: 3, height: "20em" }}>
        <Box
          sx={{
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ width: "50%", height: "50%" }}>
            <Box sx={{ width: "70%" }} component="img" src={analyticsImage} />
          </Box>
        </Box>
        <Divider orientation="vertical" />
        <Box
          sx={{
            flex: 1,
            p: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {dashboardLinks.map((link, index) => {
            const last = dashboardLinks.length - 1;
            return (
              <Box
                key={index}
                sx={{
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-evenly",
                  alignItems: "center",
                  py: 1,
                }}
              >
                <Typography>{link.text}</Typography>
                <Button
                  onClick={() => {
                    navigate(link.path);
                  }}
                >
                  {link.btnText}
                </Button>
                {index !== last && <Divider sx={{ width: "100%" }} />}
              </Box>
            );
          })}
        </Box>
      </Paper>
    </Box>
  );
}
