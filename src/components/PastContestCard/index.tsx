import clsx from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import moment from "moment";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { ContestsPayload } from "./interfaces";

import { renderCurrency, c2d } from "../../helpers/currency";

import useStyles from "./styles";

const PastContestCard = ({
  contestData,
  userId,
  handleContestShareClick,
  setShareContestModalOpen,
}: ContestsPayload) => {
  const { theirPlayer, myPlayer } = contestData;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  const winClasses = (winLoseDraw: string) => {
    let color = "";
    switch (winLoseDraw) {
      case "W":
        color = "border-green-400";
        break;
      case "L":
        color = "border-red-400";
        break;
      default:
        color = "border-gray-400";
        break;
    }
    return color;
  };

  return (
    // <Grid item xs={12} className="m-auto">
    <Grid item xs={12}>
      <Card
        // className={clsx("rounded-3xl", classes.contestWrapper)}
        className={"rounded-3xl cursor-pointer"}
        elevation={2}
        onClick={() => {
          handleContestShareClick(contestData);
        }}
      >
        {/* Mobile Section Start */}
        <Hidden only={["md", "lg", "xl"]}>
          <Grid item container spacing={0} xs={12} className="relative">
            <div
              className={clsx(
                classes.versusPosition,
                winClasses(contestData.winLoseDraw)
              )}
            >
              <p className={classes.versusText}>VS</p>
            </div>

            <Grid
              item
              container
              xs={6}
              className={clsx(
                "p-6",
                classes.claimPlayerHighlight,
                winClasses(contestData.winLoseDraw)
              )}
            >
              <Grid item xs={12} container justify="center">
                <Avatar
                  alt={myPlayer?.fullName}
                  src={myPlayer?.photoUrlHiRes}
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
                />
                <Typography
                  variant="body1"
                  align="center"
                  className="w-full text-lg font-bold"
                >
                  {myPlayer?.fullName}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-sm"
                >
                  {`${myPlayer?.position} | ${myPlayer?.teamName}`}
                </Typography>
              </Grid>

              <Grid item xs={12} container justify="center" className="pt-2">
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="left"
                      className="w-full text-gray-400"
                    >
                      Matchup
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {myPlayer?.homeOrAway === "AWAY" && "@"}
                      {myPlayer?.opponentName}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="left"
                      className="w-full text-gray-400"
                    >
                      Bonus
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {Number(contestData?.myPlayerSpread) > 0
                        ? contestData?.myPlayerSpread
                        : 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} container justify="center" className="pb-0.5">
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="left"
                      className="w-full text-gray-400"
                    >
                      Net
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {renderCurrency(
                        c2d(Number(contestData.myPlayerWinAmount))
                      )}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="left"
                      className="w-full text-gray-400"
                    >
                      Status
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {contestData.status}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>

            <Grid item container xs={6} className="p-6">
              <Grid item xs={12} container justify="center" className="pt-0.5">
                <Avatar
                  variant="square"
                  alt={theirPlayer?.fullName}
                  src={theirPlayer?.photoUrlHiRes}
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
                />
                <Typography
                  variant="body1"
                  align="center"
                  className="w-full text-lg font-bold"
                >
                  {theirPlayer?.fullName}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-sm"
                >
                  {`${theirPlayer?.position} | ${theirPlayer?.teamName}`}
                </Typography>
              </Grid>

              <Grid item xs={12} container justify="center">
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="left"
                      className="w-full text-gray-400"
                    >
                      Date
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {moment(contestData?.endedAt).format("MM/DD/YYYY")}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="right"
                      className="w-full text-gray-400"
                    >
                      W/L/D
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="right"
                      className="w-full"
                    >
                      {contestData.winLoseDraw}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} container justify="center" className="pb-0.5">
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      className="w-full text-gray-400"
                    >
                      Entry
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      className="w-full"
                    >
                      {renderCurrency(c2d(Number(contestData.entryAmount)))}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item xs={6} container justify="center">
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="right"
                      className="w-full text-gray-400"
                    >
                      Win
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="right"
                      className="w-full"
                    >
                      {renderCurrency(c2d(Number(contestData.myPlayerMaxWin)))}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Card>
    </Grid>
  );
};

export default PastContestCard;
