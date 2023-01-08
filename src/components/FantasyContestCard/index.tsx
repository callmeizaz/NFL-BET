import clsx from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Chip from "@material-ui/core/Chip";
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { ContestsPayload } from "./interfaces";

import { renderCurrency, c2d } from "../../helpers/currency";

import RosterDetailsDesktop from "../RosterDetailsDesktop";

import useStyles from "./styles";

const FantasyContestCard = ({
  contestData,
  handleContestClaimClick,
  handleContestShareClick,
}: ContestsPayload) => {
  const {
    myTeam,
    myContestTeam,
    theirTeam,
    theirContestTeam,
    myDetails,
    theirDetails,
    myTeamMaxWin,
    myTeamSpread,
    theirTeamSpread,
  } = contestData;

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();

  let color = "";
  switch (contestData?.winLoseDraw) {
    case "Win":
      color = "h-5 bg-green-500 text-white";
      break;
    case "Lose":
      color = "h-5 bg-red-500 text-white";
      break;
    case "Unmatched":
      color = "h-5 bg-white";
      break;
    case "Draw":
      color = "h-5 bg-gray-400";
      break;
    default:
      color = "h-5 bg-white";
      break;
  }

  return (
    // <Grid item xs={12} className="m-auto">
    <Grid item xs={12}>
      <Card
        className={"rounded-3xl flex flex-auto"}
        elevation={2}
        onClick={
          handleContestShareClick
            ? () => handleContestShareClick(contestData)
            : () => {}
        }
      >
        {/* Mobile Section Start */}
        <Hidden only={["md", "lg", "xl"]}>
          <Grid item container spacing={0} xs={12} className="relative">
            <div className={classes.versusPosition}>
              <p className={classes.versusText}>VS</p>
            </div>
            <Grid
              item
              xs={6}
              container
              direction="column"
              justify="space-between"
              className={clsx(" p-3", classes.claimPlayerHighlight)}
            >
              <Grid className="flex flex-col justify-center items-center">
                <Avatar
                  alt={myTeam?.name}
                  src={myTeam?.logoUrl}
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
                />
                <Typography
                  variant="body1"
                  align="center"
                  className="w-full text-lg font-bold mt-2"
                >
                  {myTeam?.name}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-sm mb-2"
                >
                  {myTeam?.user?.fullName}
                </Typography>
              </Grid>
              <Grid item>
                <RosterDetailsDesktop players={myContestTeam?.contestRosters} />
              </Grid>
              <Grid>
                <Typography className="w-full my-2 text-center  text-green-800 ">
                  Bonus Points {myTeamSpread}
                </Typography>
              </Grid>
              <Grid>
                {handleContestClaimClick ? (
                  <Grid className="mt-4">
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
                ) : (
                  <Grid className="mt-4">
                    <Grid item xs={12} container>
                      <Grid className="w-1/2">
                        <Typography
                          variant={isSmall ? "subtitle1" : "h6"}
                          align="center"
                          className="w-full text-gray-400"
                        >
                          Status
                        </Typography>
                        <Typography
                          variant={isSmall ? "subtitle1" : "h6"}
                          align="center"
                          className="w-full"
                        >
                          {contestData.status}
                        </Typography>
                      </Grid>
                      <Grid className="w-1/2">
                        <Typography
                          variant={isSmall ? "subtitle1" : "h6"}
                          align="center"
                          className="w-full text-gray-400"
                        >
                          {contestData?.winLoseDraw !== "" ? "W/L/D" : "Type"}
                        </Typography>
                        <Typography
                          variant={isSmall ? "subtitle1" : "h6"}
                          align="center"
                          className="w-full"
                        >
                          {contestData?.winLoseDraw !== "" ? (
                            <Chip
                              label={contestData?.winLoseDraw}
                              className={color}
                            />
                          ) : (
                            contestData.type
                          )}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
            <Grid
              xs={6}
              container
              direction="column"
              justify="space-between"
              className="p-3"
            >
              <Grid className="flex flex-col justify-center items-center">
                <Avatar
                  variant="square"
                  alt={theirTeam?.name}
                  src={theirTeam?.logoUrl}
                  className="h-16 w-16 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
                />
                <Typography
                  variant="body1"
                  align="center"
                  className="w-full text-lg font-bold mt-2"
                >
                  {theirTeam?.name}
                </Typography>
                <Typography
                  variant="caption"
                  align="center"
                  className="text-sm mb-2"
                >
                  {theirTeam?.user?.fullName}
                </Typography>
              </Grid>
              <Grid item>
                <RosterDetailsDesktop
                  players={theirContestTeam?.contestRosters}
                />
              </Grid>
              <Grid>
                <Typography className="w-full my-2 text-center  text-green-800 ">
                  Bonus Points {theirTeamSpread}
                </Typography>
              </Grid>
              <Grid container>
                <Grid item xs={12} container>
                  <Grid className="w-1/2">
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="center"
                      className="w-full text-gray-400"
                    >
                      Entry
                    </Typography>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="center"
                      className="w-full"
                    >
                      {renderCurrency(c2d(Number(contestData.entryAmount)))}
                    </Typography>
                  </Grid>
                  <Grid className="w-1/2">
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="center"
                      className="w-full text-gray-400"
                    >
                      Win
                    </Typography>
                    <Typography
                      variant={isSmall ? "subtitle1" : "h6"}
                      align="center"
                      className="w-full"
                    >
                      {renderCurrency(c2d(Number(myTeamMaxWin)))}
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

export default FantasyContestCard;
