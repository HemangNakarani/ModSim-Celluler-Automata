import React, { useState, useCallback, useRef } from "react";
import {
  Grid,
  makeStyles,
  Card,
  Typography,
  Fab,
  Box,
  TextField,
} from "@material-ui/core";
import {
  PlayCircleOutline,
  PauseCircleOutline,
  RotateLeft,
} from "@material-ui/icons";
import produce from "immer";
import numToHex from "../Utils/numToHex ";
import { useForestContext } from "../Context/ForestState";
import { initForest } from "../Utils/initForest";
import { updateSite } from "../Utils/updateForest";
import IOSSlider from "../Components/IOSSlider";
import IOSSwitch from "../Components/IOSSwitch";
import ForestChart from "../Components/ForestChart";

const useStyles = makeStyles(() => ({
  container: {
    margin: 24,
  },
  slider: {
    margin: 16,
    width: "95%",
  },
  card: {
    margin: 8,
    padding: 8,
  },

  fab: {
    margin: 8,
  },
}));

var gdata = [];

function ForestFire(props) {
  const {
    numCols,
    numRows,
    probTree,
    probBurning,
    probImmune,
    probLightning,
    timestep,
    twostepstoburn,
    neighbours,
    setProbTree,
    setProbBurning,
    setProbImmune,
    setProbLightning,
    setTimeStep,
    toggleTwoStepsToBurn,
    toggleNeighbours,
  } = useForestContext();

  const classes = useStyles();

  const [running, setRunning] = useState(false);
  const [count, setCount] = useState(0);
  const [graphdata, setGraphData] = useState([]);

  const [grid, setGrid] = useState(() => {
    return initForest(numRows, numCols, probTree, probBurning);
  });

  const handleSetProbTree = (event, newValue) => {
    setGrid(initForest(numRows, numCols, newValue, probBurning));
    setProbTree(newValue);
  };

  const handleSetProbBurning = (event, newValue) => {
    setGrid(initForest(numRows, numCols, probTree, newValue));
    setProbBurning(newValue);
  };

  const handleSetProbImmune = (event, newValue) => {
    setProbImmune(newValue);
  };

  const handleSetProbLightning = (event, newValue) => {
    setProbLightning(newValue);
  };

  const handleRunning = () => {
    setRunning(!running);

    if (!running) {
      runningRef.current = true;
      countRef.current = 0;
      setCount(0);
      setGraphData([]);
      gdata = [];
      runSimulation();
    }
  };

  const handleReset = () => {
    setGrid(initForest(numRows, numCols, probTree, probBurning));
    setRunning(false);
    setGraphData([]);
    gdata = [];
    setCount(0);
  };

  const runningRef = useRef(running);
  runningRef.current = running;

  const countRef = useRef(count);
  countRef.current = count;

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      setGraphData(gdata);
      return;
    }

    if (countRef.current === timestep) {
      console.log("TIMEOUT");
      setRunning((r) => !r);
    }

    var cntgreen = 0;

    setGrid((g) => {
      return produce(g, (gridCopy) => {
        for (let i = 1; i < numCols - 1; i++) {
          gridCopy[0][i] = g[numRows - 2][i];
          gridCopy[numRows - 1][i] = g[1][i];
        }
        for (let i = 0; i < numRows; i++) {
          gridCopy[i][0] = g[i][numCols - 2];
          gridCopy[i][numCols - 1] = g[i][1];
        }

        for (let x = 1; x < numRows - 1; x++) {
          for (let y = 1; y < numCols - 1; y++) {
            const N = g[x][y - 1];
            const S = g[x][y + 1];
            const W = g[x - 1][y];
            const E = g[x + 1][y];
            const value = g[x][y];

            gridCopy[x][y] = updateSite(
              value,
              N,
              S,
              E,
              W,
              probImmune,
              probLightning,
              twostepstoburn,
              neighbours
            );

            if (gridCopy[x][y] === 1) {
              cntgreen++;
            }
          }
        }
      });
    });

    gdata.push({
      timestep: countRef.current,
      density: cntgreen / 2500,
    });

    setCount((c) => {
      return c + 1;
    });

    setTimeout(runSimulation, 80);
  }, [
    numCols,
    numRows,
    probLightning,
    probImmune,
    timestep,
    twostepstoburn,
    neighbours,
  ]);

  return (
    <>
      <Card className={classes.card} elevation={5}>
        <Typography variant="h4" align="center">
          Forest Fire Simulation
        </Typography>
      </Card>
      <Grid container justify="center">
        <Grid item md={4} xs={12}>
          <Card
            className={classes.card}
            elevation={5}
            style={{ height: "93%" }}
          >
            <div style={{ width: "100%" }}>
              <Box display="flex" justifyContent="center">
                <Box>
                  <Fab
                    className={classes.fab}
                    color="primary"
                    aria-label="add"
                    onClick={handleRunning}
                  >
                    {running ? <PauseCircleOutline /> : <PlayCircleOutline />}
                  </Fab>
                </Box>
                <Box>
                  <Fab
                    className={classes.fab}
                    color="primary"
                    aria-label="reset"
                    onClick={handleReset}
                  >
                    <RotateLeft />
                  </Fab>
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
                <Box m={2}>
                  <TextField
                    id="outlined-number"
                    label="Time Steps"
                    type="number"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={timestep}
                    variant="outlined"
                    onChange={(e) => {
                      setTimeStep(e.target.value);
                    }}
                  />
                </Box>
              </Box>
              <Box display="flex" justifyContent="center">
                <Box m={2}>
                  <Typography variant="subtitle2">
                    Toggle Two Steps to Burn
                  </Typography>
                  <IOSSwitch
                    checked={twostepstoburn}
                    onClick={() => toggleTwoStepsToBurn()}
                    name="checkedB"
                  />
                </Box>
                <Box m={2}>
                  <Typography variant="subtitle2">
                    Toggle Neighbours Proportional Fire
                  </Typography>
                  <IOSSwitch
                    checked={neighbours}
                    onClick={() => toggleNeighbours()}
                    name="checkedB"
                  />
                </Box>
              </Box>
            </div>
          </Card>
        </Grid>
        <Grid item md={6} xs={12}>
          <Card className={classes.card} elevation={5}>
            <Typography id="discrete-slider" gutterBottom>
              Probability of Tree
            </Typography>
            <IOSSlider
              className={classes.slider}
              aria-label="ios slider"
              defaultValue={0.8}
              valueLabelDisplay="on"
              step={0.0001}
              onChangeCommitted={handleSetProbTree}
              min={0}
              max={1}
            />
            <Typography id="discrete-slider" gutterBottom>
              Probability of Burning
            </Typography>
            <IOSSlider
              className={classes.slider}
              aria-label="ios slider"
              defaultValue={0.0005}
              valueLabelDisplay="on"
              step={0.0000001}
              onChangeCommitted={handleSetProbBurning}
              min={0}
              max={0.2}
            />
          </Card>
          <Card className={classes.card} elevation={5}>
            <Typography id="discrete-slider" gutterBottom>
              Probability of Tree is Immune
            </Typography>
            <IOSSlider
              className={classes.slider}
              aria-label="ios slider"
              defaultValue={0.4}
              valueLabelDisplay="on"
              step={0.0001}
              onChangeCommitted={handleSetProbImmune}
              min={0}
              max={1}
            />
            <Typography id="discrete-slider" gutterBottom>
              Probability of Lightning
            </Typography>
            <IOSSlider
              className={classes.slider}
              aria-label="ios slider"
              defaultValue={0.00001}
              valueLabelDisplay="on"
              step={0.00000001}
              onChangeCommitted={handleSetProbLightning}
              min={0}
              max={0.1}
            />
          </Card>
        </Grid>
      </Grid>
      <Grid container justify="center" className={classes.container}>
        <Grid item>
          <Card elevation={10} className={classes.card}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: `repeat(${numCols}, 10px)`,
              }}
            >
              {grid.map((rows, i) =>
                rows.map((col, k) => (
                  <div
                    key={`${i}-${k}`}
                    onClick={() => {}}
                    style={{
                      width: 10,
                      height: 10,
                      background: numToHex(grid[i][k]),
                      border: "1px solid black",
                    }}
                  />
                ))
              )}
            </div>
          </Card>
        </Grid>
        {graphdata.length ? (
          <Grid item md={8}>
            <ForestChart data={graphdata} />
          </Grid>
        ) : null}
      </Grid>
      <Card className={classes.card} elevation={5}>
        <Typography variant="h4" align="center">
          Developed By{" "}
          <a
            href="https://github.com/HemangNakarani"
            target="_blank"
            rel="noreferrer"
          >
            Hemang Nakarani
          </a>
        </Typography>
      </Card>
    </>
  );
}

export default ForestFire;
