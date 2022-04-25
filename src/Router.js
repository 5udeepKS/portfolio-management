import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Auth from "./auth/Auth";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Snackbar from "./components/snackbar/Snackbar";
import { DashboardOutlet } from "./pages/dashboard/Dashboard";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewAssets from "./pages/dashboard/viewAssets/ViewAssets";

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
        <Route
          path="/dashboard"
          element={
            <Auth>
              <DashboardOutlet />
            </Auth>
          }
        >
          <Route path="/dashboard/" element={<Dashboard />} />
          <Route path="/dashboard/view-assets" element={<ViewAssets />} />
          <Route path="/dashboard/sell-assets" element={<ViewAssets />} />
        </Route>
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
