import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { CssBaseline, ThemeProvider } from "@material-ui/core";
import { BrowserRouter } from "react-router-dom";
import { theme } from "./consts/theme";

ReactDOM.render(
  <React.StrictMode>
    {/* <SnackbarProvider maxSnack={2}> */}
    <BrowserRouter>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
    {/* </SnackbarProvider> */}
  </React.StrictMode>,
  document.getElementById("root")
);
