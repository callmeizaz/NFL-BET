import { Avatar, Typography, Grid } from "@material-ui/core";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";
import {
  makeStyles,
  createStyles,
  Theme,
  useTheme,
} from "@material-ui/core/styles";

import { TeamDetails } from "./interface";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    large: {
      width: theme.spacing(8),
      height: theme.spacing(8),
    },
  })
);

const LeagueTeamDetails = ({
  url,
  teamName,
  ownerName,
  teamPoints,
  bonusPoints,
  type,
}: TeamDetails) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  return (
    <Grid
      container
      direction={isSmall || type === "myTeam" ? "row" : "row-reverse"}
      alignItems="flex-start"
      className={clsx("w-full", isSmall ? "h-1/2 pb-4" : "h-3/4 pb-4")}
    >
      <Grid
        xs={12}
        md={6}
        container
        direction="column"
        alignContent="center"
        className={clsx(
          "border-4  rounded-md",
          bonusPoints > 0 ? "border-green-800" : "border-white"
        )}
      >
        <Grid item xs={12} container justify="center">
          <Avatar alt={teamName} src={url} className={classes.large} />
        </Grid>
        <Grid item xs={12} container justify="center">
          <Typography
            variant="caption"
            component="span"
            className={clsx(
              "rounded-full p-2 text-white -mb-4",
              bonusPoints > 0 ? " bg-green-900" : "bg-whiet"
            )}
          >
            {bonusPoints > 0 ? `+${bonusPoints} Bonus Points` : "."}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        xs={12}
        md={6}
        container
        direction="column"
        justify="space-between"
        className="h-full mt-4"
      >
        <Grid item direction="column" container>
          <Typography
            // component="span"
            variant="caption"
            align="center"
            className="font-semibold text-sm w-full ml-2"
          >
            {teamName}
          </Typography>
          <Typography
            // component="span"
            variant="caption"
            align="center"
            className="text-sm text-gray-400 w-full"
          >
            {ownerName || "."}
          </Typography>
        </Grid>
        <Grid item container justify="center" className="h-12">
          <Grid
            item
            container
            justify="center"
            alignContent="center"
            xs={8}
            style={{ borderColor: "#B69056" }}
            className="border-4 rounded-md"
          >
            <Typography
              variant="h5"
              align="center"
              style={{
                color: "rgba(182, 144, 86, 1)",
              }}
            >
              {(Number(teamPoints)).toFixed(1)}&nbsp;
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LeagueTeamDetails;
