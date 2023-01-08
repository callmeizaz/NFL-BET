import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { PlayerCardsHeaderProps } from "./interfaces";
import useStyles from "./styles";
import Hidden from "@material-ui/core/Hidden";
import clsx from "clsx";

const MyContestListHeader = ({}: PlayerCardsHeaderProps) => {
  const classes = useStyles();
  return (
    <div className="-mb-4">
      <Hidden only={["sm", "xs"]}>
        <Grid container direction="row" className="p-3">
          <Grid
            item
            xs={4}
            md={1}
            lg={1}
            container
            justify="center"
            alignContent="center"
          >
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
          <Grid item xs={4} md={1} lg={1} container justify="center">
            <Typography
              className="text-gray-400"
              align="center"
              variant="subtitle1"
            >
              Win Bonus
            </Typography>
          </Grid>

          <Grid item xs={4} md={1} lg={1} container justify="center" />
          <Grid item xs={12} md={2} lg={2}>
            <Typography className="text-gray-400" variant="subtitle1">
              Opponent
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            md={1}
            lg={1}
            container
            justify="center"
            alignContent="center"
          >
            <Typography
              className={clsx("text-gray-400", "pr-2")}
              align="center"
              variant="subtitle1"
            >
              Type
            </Typography>
          </Grid>
          <Grid
            item
            xs={4}
            md={1}
            lg={1}
            container
            justify="center"
            alignContent="center"
          >
            <Typography
              className={clsx("text-gray-400", "pr-2")}
              variant="subtitle1"
            >
              Status
            </Typography>
          </Grid>
        </Grid>
      </Hidden>
    </div>
  );
};

export default MyContestListHeader;
