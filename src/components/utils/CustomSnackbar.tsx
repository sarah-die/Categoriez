import Grid2 from "@mui/material/Unstable_Grid2";
import { Slide, Snackbar } from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useGameContext } from "../../Context";
import { mainTheme } from "../../mainTheme";

/** Customized Snackbar to inform the user over errors. The shown message is variable. */
export const CustomSnackbar = (props: {
  message: string;
  customColor?: string
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
        autoHideDuration={6000}
        TransitionComponent={Slide}
        transitionDuration={{ enter: 1000, exit: 2000 }}
        TransitionProps={{ enter: true, exit: false }}
        onClose={handleClose}
        action={action}
        // ToDo wenn eine customColor übergeben wird, verweden diese, sonst verwende den Standard (s.u.)
        // use SnackbarContent API to access style components
        sx={{
          "& .MuiSnackbarContent-root": {
            backgroundColor: props.customColor || mainTheme.palette.secondary.main,
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
