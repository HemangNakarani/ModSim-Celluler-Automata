import React, { Fragment } from "react";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";

import { Router } from "@reach/router";
import HeatProp from "./Pages/HeatProp";
import ForestFire from "./Pages/ForestFire";
import Home from "./Pages/Home";

import { RootContextProvider } from "./Context/RootState";
import { ForestContextProvider } from "./Context/ForestState";

const theme = createMuiTheme({
  palette: {
    type: "light",
  },
});

const HeatBase = () => {
  return (
    <RootContextProvider>
      <HeatProp />
    </RootContextProvider>
  );
};

const ForestBase = () => {
  return (
    <ForestContextProvider>
      <ForestFire />
    </ForestContextProvider>
  );
};

const App = () => {
  return (
    <Fragment>
      <ThemeProvider theme={theme}>
        <Router>
          <Home path="/" />
          <HeatBase path="heat-diffusion" />
          <ForestBase path="forest-fire" />
        </Router>
      </ThemeProvider>
    </Fragment>
  );
};

export default App;
