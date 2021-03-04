import React, { useContext, useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";
import { SnackbarContext } from "../contexts/SnackbarContext/SnackbarContext";

const SnackbarMessage = () => {
  const SnackbarDetails = useContext(SnackbarContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    SnackbarDetails.setsnackbarstate({message:"",open:false})
  };

  const vertical = "bottom",
    horizontal = "right";

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={SnackbarDetails.snackbarstate.open}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="info"
      >
        {SnackbarDetails.snackbarstate.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default SnackbarMessage;
