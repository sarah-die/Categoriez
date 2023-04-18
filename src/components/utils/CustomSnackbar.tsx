import Grid2 from "@mui/material/Unstable_Grid2";
import { Slide, Snackbar } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useGameContext } from "../../Context";

/** Customized Snackbar to inform the user about errors. The displayed message is variable. */
export const CustomSnackbar = (props: {
  message: string;
  customColor?: string;
}) => {
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
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  return (
    <Grid2>
      <Snackbar
        {...props}
        open={ctx.snackbarStatus}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2000}
        TransitionComponent={Slide}
        transitionDuration={{ enter: 300, exit: 1000 }}
        TransitionProps={{ enter: true, exit: true }}
        onClose={handleClose}
        action={action}
        // use SnackbarContent API to access style components
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: props.customColor || "#cca000",
            px: 2,
            py: 1,
          },
          "& .MuiSnackbarContent-message": {
            fontSize: 18,
            color: "black",
            fontWeight: "normal",
          },
          "& .MuiSnackbarContent-action": { color: "black" },
        }}
      ></Snackbar>
    </Grid2>
  );
};
