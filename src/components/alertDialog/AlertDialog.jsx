import React from "react";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";

export default function AlertDialog(props) {
  const { open, handleClose } = props;

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Session Expired! Login Again."}
        </DialogTitle>

        <DialogActions sx={{ display: "flex", justifyContent: "center" }}>
          <Button variant="outlined" onClick={handleClose} autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
