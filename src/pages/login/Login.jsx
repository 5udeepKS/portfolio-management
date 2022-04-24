import React, { useState } from "react";
import { Box, Paper, TextField, Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { loginUserAsync } from "../../redux/authSlice";

export default function Login(props) {
  const { setSnackbarProps } = props;
  const dispatch = useDispatch();

  const initialFormValues = {
    username: "",
    password: "",
  };

  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleReset = () => {
    setFormValues(initialFormValues);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(formValues);
    await dispatch(loginUserAsync(formValues))
      .unwrap()
      .then(() => {
        setSnackbarProps({
          open: true,
          msg: "Logged In Successfully",
          severity: "success",
        });
      })
      .catch(() => {
        setSnackbarProps({
          open: true,
          msg: "Invalid Credentials",
          severity: "error",
        });
      });
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
            <Button
              onClick={handleReset}
              sx={{ mx: 2 }}
              variant="outlined"
              color="secondary"
            >
              Reset
            </Button>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}
