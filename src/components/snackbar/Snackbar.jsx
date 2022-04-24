import React from "react";
import MUISnackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function Snackbar({ snackbarOpen, msg, severity, handleClose }) {
  return (
    <div>
      <MUISnackbar
        open={snackbarOpen}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {msg}
        </Alert>
      </MUISnackbar>
    </div>
  );
}
