import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    position: "relative",
    justifyContent: "center",
    "& > * + *": {
      marginLeft: theme.spacing(2),
    },
  },
}));

const ProgressSpinner = (props) => {
  const { promiseInProgress } = usePromiseTracker();
  const classes = useStyles();

  return (

    (promiseInProgress === true) ? 
        <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Grid item xs={3}>
            <CircularProgress></CircularProgress>
        </Grid>
      </Grid> : null
  );
};

export default ProgressSpinner;
