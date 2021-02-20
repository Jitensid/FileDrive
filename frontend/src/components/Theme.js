import deepOrange from "@material-ui/core/colors/deepOrange";
import deepPurple from "@material-ui/core/colors/deepPurple";
import lightBlue from "@material-ui/core/colors/lightBlue";
import orange from "@material-ui/core/colors/orange";
import { createMuiTheme } from "@material-ui/core/styles";

const colorPropValue = "secondary";

// Dark Theme for the Application
const darkTheme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: orange[500],
    },
    secondary: {
      main: deepOrange[900],
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: colorPropValue,
    },
    MuiTextField: {
      variant: "contained",
      color: colorPropValue,
    },
    MuiLink: {
      color: colorPropValue,
    },
    MuiIcon: {
      color: colorPropValue,
    },
    MuiAppBar: {
      color: colorPropValue,
    },
  },
});

// Light Theme for the Application
const lightTheme = createMuiTheme({
  palette: {
    type: "light",
    primary: {
      main: lightBlue[500],
    },
    secondary: {
      main: deepPurple[900],
    },
  },
  props: {
    MuiButton: {
      variant: "contained",
      color: colorPropValue,
    },
    MuiTextField: {
      variant: "contained",
      color: colorPropValue,
    },
    MuiLink: {
      color: colorPropValue,
    },
    MuiIcon: {
      color: colorPropValue,
    },
    MuiAppBar: {
      color: colorPropValue,
    },
  },
});

export { darkTheme };
export { lightTheme };
