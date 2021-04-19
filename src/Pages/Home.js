import React from "react";
import {
  makeStyles,
  Typography,
  Card,
  Grid,
  CardActionArea,
  CardMedia,
  CardContent
} from "@material-ui/core";
import { Link } from "@reach/router";
import HeatImage from '../Assets/heat.jpg';
import ForestFireImage from '../Assets/forestfire.jpg';

const useStyles = makeStyles(() => ({
  card: {
    minHeight: 400,
    margin: 48,
  },
  media: {
    height:350,
  },
  typography:{
      textDecoration:"None"
  }
}));

export default function Home() {
  const classes = useStyles();

  return (
    <>
      <Grid container justify="center">
        <Grid item xs={12} md={6}>
          <Link to="/heat-diffusion" className={classes.typography}>
            <Card className={classes.card} elevation={5}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={HeatImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                <Typography className={classes.typography} align="center" variant="h4" >Heat Diffusion Simulation</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
        <Grid item xs={12} md={6}>
          <Link to="/forest-fire" className={classes.typography}>
          <Card className={classes.card} elevation={5}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={ForestFireImage}
                  title="Contemplative Reptile"
                />
                <CardContent>
                  <Typography align="center" variant="h4" >Forest Fire Simulation</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
