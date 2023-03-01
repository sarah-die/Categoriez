import Grid2 from "@mui/material/Unstable_Grid2";
import { Snackbar } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useGameContext } from "../../Context";

/** Snackbar to inform the user over errors. The shown message is variable. */
export const SnackbarError = (props: { message: string }) => {
  const ctx = useGameContext();
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    ctx.setSnackbarOpen(false);
  };

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <Grid2>
      <Snackbar
        {...props}
        open={ctx.snackbarStatus}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        onClose={handleClose}
        action={action}
      ></Snackbar>
    </Grid2>
  );
};
