import clsx from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Box from "@material-ui/core/Box";

import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";

import { ContestsPayload } from "./interfaces";

import { renderCurrency, c2d } from "../../helpers/currency";

import useStyles from "./styles";

const MyContestCard = ({
  contestData,
  userId,
  handleContestShareClick,
  setShareContestModalOpen,
  closeContestConfirmation,
}: ContestsPayload) => {
  const { theirPlayer, myPlayer } = contestData;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
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
            {contestData?.type === "Open" &&
            contestData?.status === "Created" ? (
              <Box className="absolute right-2">
                <IconButton
                  onClick={(event) => {
                    event.stopPropagation();
                    closeContestConfirmation(contestData);
                  }}
                >
                  <DeleteOutlineIcon className="text-gray-400 text-3xl" />
                </IconButton>
              </Box>
            ) : (
              ""
            )}
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
                      Type
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {contestData.type}
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
                      Matchup
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      // align="right"
                      className="w-full"
                    >
                      {theirPlayer?.homeOrAway === "AWAY" && "@"}
                      {theirPlayer?.opponentName}
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
                      {Number(contestData.theirPlayerSpread) > 0
                        ? contestData.theirPlayerSpread
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
                      {renderCurrency(Number(c2d(contestData.entryAmount)))}
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
                      {renderCurrency(Number(c2d(contestData.myPlayerMaxWin)))}
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

export default MyContestCard;
