import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

import { IProps } from "./interfaces";

const Loader = (props: IProps) => {
  const { text } = props;

  return (
    <Grid
      container
      justify="center"
      alignContent="center"
      className="h-64 w-full"
    >
      <Grid item xs={12} container justify="center">
        <CircularProgress size={64} thickness={4} />
      </Grid>

      {text ? (
        <Grid item xs={12} className="mt-12">
          <Typography variant="h5" color="primary" align="center">{text}</Typography>
        </Grid>
      ) : (
        ""
      )}
    </Grid>
  );
};
export default Loader;
