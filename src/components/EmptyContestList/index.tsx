import React from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { EmptyContestListProps } from "./interfaces";

const EmptyContestList = (props: EmptyContestListProps) => {
  const { line1, line2, buttonText, buttonDisabled, callback } = props;
  return (
    <Grid
      item
      container
      direction="row"
      justify="center"
      alignItems="stretch"
      className="pt-16"
    >
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className="pb-4">
          <img
            alt="sparkling trophy"
            src={process.env.PUBLIC_URL + "/golf-ball.svg"}
            width="70pt"
          ></img>
        </Grid>
        <Grid item className="pb-8">
          <Typography variant="h6" align="center">
            {line1}
          </Typography>
          <Typography variant="h6" align="center">
            {line2}
          </Typography>
        </Grid>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            size="large"
            className="text-white"
            disabled={buttonDisabled || false}
            // onClick={() => checkBrowser()}
            onClick={() => callback()}
          >
            {buttonText}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default EmptyContestList;
