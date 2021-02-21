import React from "react";
import { usePromiseTracker } from "react-promise-tracker";
import Grid from "@material-ui/core/Grid";
import CircularProgress from "@material-ui/core/CircularProgress";

const ProgressSpinner = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return promiseInProgress === true ? (
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
    </Grid>
  ) : null;
};

export default ProgressSpinner;
