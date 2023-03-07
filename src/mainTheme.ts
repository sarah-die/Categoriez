import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    background: {
      paper: "#151b2d",
    },
    primary: {
      light: "#5b6f9a",
      main: "#4d5e84",
      dark: "#3f4d6e",
    },
    secondary: {
      light: "#347154",
      main: "#24574C",
      dark: "#143D45",
    },
  },
  typography: {
    fontFamily: "IBM Plex Sans",
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
      color: "black",
      fontWeight: "bold",
    },
    outlined: {
      color: "black",
    },
  },
});

export const mainTheme = responsiveFontSizes(theme);
