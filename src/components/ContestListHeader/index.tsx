import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { PlayerCardsHeaderProps } from "./interfaces";
import Hidden from "@material-ui/core/Hidden";

const ContestListHeader = ({}: PlayerCardsHeaderProps) => {
  return (
    <div className="-mb-4">
      <Hidden only={["sm", "xs"]}>
        <Grid container spacing={2} direction="row" className="px-3">
          <Grid item xs={4} md={1} lg={1}>
            <Typography className="text-gray-400" variant="subtitle1">
              Date
            </Typography>
          </Grid>
          <Grid item xs={12} md={2} lg={2}>
            <Typography className="text-gray-400" variant="subtitle1">
              Player
            </Typography>
          </Grid>
          <Grid item xs={4} md={1} lg={1} container justify="center">
            <Typography
              className="text-gray-400"
              align="center"
              variant="subtitle1"
            >
              Matchup
            </Typography>
          </Grid>
          <Grid item xs={4} md={1} lg={1} container justify="center">
            <Typography
              className="text-gray-400"
              align="center"
              variant="subtitle1"
            >
              Spread
            </Typography>
          </Grid>
          <Grid item xs={4} md={1} lg={1} container justify="center">
            <Typography
              className="text-gray-400"
              align="center"
              variant="subtitle1"
            >
              Entry
            </Typography>
          </Grid>
          <Grid item xs={4} md={1} lg={1} container justify="center">
            <Typography
              className="text-gray-400"
              align="center"
              variant="subtitle1"
            >
              Win
            </Typography>
          </Grid>

          <Grid item xs={4} md={1} lg={1} container justify="center" />
          <Grid item xs={12} md={1} lg={2}>
            <Typography className="text-gray-400" variant="subtitle1">
              Opponent
            </Typography>
          </Grid>
          <Grid item xs={4} md={1} lg={1} container justify="center">
            <Typography
              className="text-gray-400"
              align="center"
              variant="subtitle1"
            >
              Matchup
            </Typography>
          </Grid>
          <Grid item xs={3} md={1} lg={1}></Grid>
        </Grid>
      </Hidden>
    </div>
  );
};

export default ContestListHeader;
