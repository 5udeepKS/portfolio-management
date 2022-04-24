import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@mui/material";

export default function Login() {
  const [formValues, setFormValues] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formValues);
  };

  return (
    <Box
      sx={{
        height: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper sx={{ width: "18em", height: "18em" }} elevation={5}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-evenly",
            height: "100%",
            px: 2,
            py: 3,
          }}
        >
          <TextField
            label="Username"
            variant="outlined"
            placeholder="Enter Username"
            size="small"
            onChange={handleInputChange}
            name="username"
            value={formValues.username}
            required
            fullWidth
          />
          <TextField
            label="Password"
            variant="outlined"
            placeholder="Enter Password"
            size="small"
            onChange={handleInputChange}
            name="password"
            type="password"
            value={formValues.password}
            required
            fullWidth
          />
          <Box sx={{ display: "flex", width: "100%" }}>
            <Button variant="outlined" type="submit">
              Login
            </Button>
            <Button sx={{ mx: 2 }} variant="outlined" color="secondary">
              Reset
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
