import clsx from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { ContestsPayload } from "./interfaces";

import { renderCurrency, dateRender, c2d } from "../../helpers/currency";

import useStyles from "./styles";

const ContestCard = ({
  contestData,
  handleContestClaimClick,
}: ContestsPayload) => {
  const { creatorPlayer, claimerPlayer } = contestData;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  return (
    // <Grid item xs={12} className="m-auto">
    <Grid item xs={12}>
      <Card
        // className={clsx("rounded-3xl", classes.contestWrapper)}
        className={"rounded-3xl"}
        elevation={2}
      >
        {/* Mobile Section Start */}
        <Hidden only={["md", "lg", "xl"]}>
          <Grid item container spacing={0} xs={12} className="relative">
            <div className={classes.versusPosition}>
              <p className={classes.versusText}>VS</p>
            </div>

            <Grid
              item
              container
              xs={6}
              className={clsx("p-6", classes.claimPlayerHighlight)}
            >
              <Grid item xs={12} container justify="center">
                <Avatar
                  alt={claimerPlayer?.fullName}
                  src={claimerPlayer?.photoUrlHiRes}
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
                />
                <Typography
                  variant="body1"
                  align="center"
                  className="w-full text-lg font-bold"
                >
                  {claimerPlayer?.fullName}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-sm"
                >
                  {`${claimerPlayer?.position} | ${claimerPlayer?.teamName}`}
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
                      {claimerPlayer?.homeOrAway === "AWAY" && "@"}
                      {claimerPlayer?.opponentName}
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
                      {Number(contestData.claimerPlayerSpread) > 0
                        ? contestData.claimerPlayerSpread
                        : 0}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} container justify="center" className="pt-4">
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                  className="border-2 font-bold"
                  onClick={() => {
                    handleContestClaimClick(contestData);
                  }}
                >
                  CLAIM
                </Button>
              </Grid>
            </Grid>

            <Grid item container xs={6} className="p-6">
              <Grid item xs={12} container justify="center" className="pt-0.5">
                <Avatar
                  variant="square"
                  alt={creatorPlayer?.fullName}
                  src={creatorPlayer?.photoUrlHiRes}
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
                />
                <Typography
                  variant="body1"
                  align="center"
                  className="w-full text-lg font-bold"
                >
                  {creatorPlayer?.fullName}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-sm"
                >
                  {`${creatorPlayer?.position} | ${creatorPlayer?.teamName}`}
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
                      Matchup
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {creatorPlayer?.homeOrAway === "AWAY" && "@"}
                      {creatorPlayer?.opponentName}
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
                      {Number(contestData.creatorPlayerSpread) > 0
                        ? contestData.creatorPlayerSpread
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
                      Entry
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
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
                      // align="left"
                      className="w-full text-gray-400"
                    >
                      Win
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {renderCurrency(
                        c2d(Number(contestData.claimerPlayerMaxWin))
                      )}
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

export default ContestCard;
