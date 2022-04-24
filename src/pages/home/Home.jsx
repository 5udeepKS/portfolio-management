import React from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const cardContent = [
    {
      title: "Authorization",
      description: "Authorization will be done with the help of encrypt",
    },
    {
      title: "Daily Share",
      description: "Sell your mutual funds and stocks",
    },
    {
      title: "Daily Mutual Fund",
      description: "Portfolio collected with the help of the system",
    },
    {
      title: "Calculate Networth",
      description: "Asset will be connected",
    },
  ];
  return (
    <Container
      sx={{
        height: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0000000f",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Typography
          variant="overline"
          sx={{ fontSize: "1rem", width: "70%", textAlign: "center" }}
        >
          "World class consumer & trends research capabilities. We design for
          tommorrow customers in tommorrow market"
        </Typography>
        <Button
          onClick={() => {
            navigate("/login");
          }}
          variant="contained"
        >
          Get Started
        </Button>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        {cardContent.map((content, idx) => (
          <Paper
            key={idx}
            elevation={5}
            sx={{
              width: "20%",
              height: "90%",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                mx: 2,
                height: "50%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" sx={{ color: "primary.dark" }}>
                {content.title}
              </Typography>
              <Typography sx={{ my: 1, textAlign: "center" }}>
                {content.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Container>
  );
}
