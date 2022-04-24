import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Dashboard from "./pages/dashboard/Dashboard";

import Snackbar from "./components/snackbar/Snackbar";

export default function Router() {
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    msg: "",
    severity: "error",
  });

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarProps({ ...snackbarProps, open: false });
  };
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={<Login setSnackbarProps={setSnackbarProps} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Snackbar
        snackbarOpen={snackbarProps.open}
        msg={snackbarProps.msg}
        severity={snackbarProps.severity}
        handleClose={handleSnackbarClose}
      />
    </>
  );
}
