import { createMuiTheme } from "@material-ui/core";
import { Shadows } from "@material-ui/core/styles/shadows";

export const theme = createMuiTheme({
  typography: {
    fontFamily: "Montserrat",
  },
  shadows: Array(25).fill("none") as Shadows,
  palette: {
    background:{
      paper: "#FFF"
    },
    primary: { main: "#E8463D" },
  },
  overrides: {},
});
