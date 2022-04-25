import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Auth from "./auth/Auth";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Snackbar from "./components/snackbar/Snackbar";
import { DashboardOutlet } from "./pages/dashboard/Dashboard";
import Dashboard from "./pages/dashboard/Dashboard";
import ViewAssets from "./pages/dashboard/viewAssets/ViewAssets";
import CurrentPrice from "./pages/dashboard/currentPrice/CurrentPrice";
import AlertDialog from "./components/alertDialog/AlertDialog";
import { logOut } from "./redux/authSlice";

export default function Router() {
  const [snackbarProps, setSnackbarProps] = useState({
    open: false,
    msg: "",
    severity: "error",
  });

  const [alertOpen, setAlertOpen] = useState(false);

  const dispatch = useDispatch();

  const handleAlertOpen = () => {
    setAlertOpen(true);
  };

  const handleAlertClose = () => {
    setAlertOpen(false);
    dispatch(logOut());
  };

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
          <Route
            path="/dashboard/view-assets"
            element={<ViewAssets handleAlertOpen={handleAlertOpen} />}
          />
          <Route
            path="/dashboard/current-price"
            element={<CurrentPrice handleAlertOpen={handleAlertOpen} />}
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Snackbar
        snackbarOpen={snackbarProps.open}
        msg={snackbarProps.msg}
        severity={snackbarProps.severity}
        handleClose={handleSnackbarClose}
      />
      <AlertDialog open={alertOpen} handleClose={handleAlertClose} />
    </>
  );
}
