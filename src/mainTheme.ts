import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    background: {
      paper: "#151b2d",
    },
    primary: {
      light: "#869bc7",
      main: "#6f81a9",
      dark: "#3f4d6e",
      contrastText: "#ced2dc",
    },
  },
  typography: {
    fontFamily: "IBM Plex Sans",
    allVariants: {
      color: "red",
    },
    // ToDo add primary/ secondary colors
  },
});

theme = createTheme(theme, {
  typography: {
    h1: {
      color: "#ced2dc",
      fontWeight: "bold",
    },
    h4: {
      color: "#ced2dc",
      fontWeight: "bold",
    },
    h5: {
      color: "#ced2dc",
      fontWeight: "bold",
    },
    h6: {
      color: "#ced2dc",
      fontWeight: "bold",
    },
    body1: {
      color: "#ced2dc",
      fontSize: 22,
    },
    body2: {
      color: "#ced2dc",
      fontSize: 28,
      fontWeight: "bold",
    },
  },
  button: {
    contained: {
      fontWeight: "bold",
    },
  },
});

export const mainTheme = responsiveFontSizes(theme);
