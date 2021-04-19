import React from "react";
import BroCharts from "../BroCharts";
import Diffusion from "../Pages/Diffusion";
import { makeStyles, Typography, Card } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  plot: {
    marginLeft: 32,
    marginRight: 32,
  },

  paper: {
    margin: 24,
    padding: 12,
  },
}));

function HeatProp() {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.paper} elevation={5}>
        <Typography align="center" variant="h4">
          Heat Diffusion Simulation
        </Typography>
      </Card>
      <Diffusion />
      <div className={classes.plot}>
        <BroCharts />
      </div>
      <Card className={classes.paper} elevation={5}>
        <Typography variant="h4" align="center">
          Developed By{" "}
          <a
            href="https://github.com/HemangNakarani"
            target="_blank"
            rel="noreferrer"
          >
            Hemang Nakarani
          </a>{" "}
          and{" "}
          <a
            href="https://github.com/meet59patel"
            target="_blank"
            rel="noreferrer"
          >
            Meet Patel
          </a>
        </Typography>
      </Card>
    </>
  );
}

export default HeatProp;
