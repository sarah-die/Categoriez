import { createTheme, responsiveFontSizes } from "@mui/material";

let theme = createTheme({
  palette: {
    background: {
      paper: "#1c2c60",
    },
    primary: {
      light: "#89c4e1",
      main: "#66a9de",
      dark: "#3365b2",
    },
    secondary: {
      light: "#c77ecf",
      main: "#9c5bbf",
      dark: "#31114d",
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
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
    h4: {
      color: "black",
      fontWeight: "bold",
    },
    h5: {
      color: theme.palette.secondary.main,
      fontWeight: "bold",
    },
    h6: {
      color: theme.palette.secondary.light,
      fontWeight: "bold",
    },
    body1: {
      color: theme.palette.primary.light,
      fontSize: 22,
    },
    body2: {
      color: theme.palette.primary.light,
      fontSize: 28,
      fontWeight: "bold",
    }
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
