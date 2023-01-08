import React, { useMemo, Fragment } from "react";
import { FormikProps, useFormik } from "formik";
import { useSnackbar } from "notistack";
// import { useHistory } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import DialogTitle from "../DialogTitle";
import { selectSelectedContest } from "../../redux/selectors/leagueContests";
import { selectUserData } from "../../redux/selectors/authentication";
import { doAsyncClaimContest } from "../../redux/thunks/contests";
import { ViewLeagueContestModalProps } from "./interfaces";
import { renderCurrency, c2d } from "../../helpers/currency";
import LeagueContestDetailsDesktop from "../LeagueContestDets/LeagueContestDetailsDesktop";
import LeagueContestDetailsMobile from "../LeagueContestDets/LeagueContestDetailsMobile";

import modifyContest from "../../pages/LeagueManage/History/modifyContest";

const ViewPastLeagueContestModal = (props: ViewLeagueContestModalProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const currentContest = useAppSelector(selectSelectedContest);
  const userData = useAppSelector(selectUserData);

  const userId = userData?.id;

  const { open, handleClose } = props;

  const data = useMemo(
    () => modifyContest(userId, [currentContest]),
    [currentContest]
  );

  const normalisedContest = data[0];

  const myTeamPlayers = data
    ? normalisedContest?.myContestTeam?.contestRosters.map((contestRosters) => {
        return { ...contestRosters, finishedFlag: true };
      })
    : [];

  const myTeam = normalisedContest?.myTeam;

  const opponentTeamPlayers = currentContest
    ? normalisedContest?.theirContestTeam?.contestRosters.map(
        (contestRosters) => {
          return { ...contestRosters, finishedFlag: true };
        }
      )
    : [];

  const opponentTeam = normalisedContest?.theirTeam;

  const myBonusPoints =
    normalisedContest?.myTeamSpreadValue > 0
      ? normalisedContest?.myTeamSpreadValue
      : 0;

  const opponentBonusPoints =
    normalisedContest?.theirTeamSpreadValue > 0
      ? normalisedContest?.theirTeamSpreadValue
      : 0;

  let myTeamPoints = 0;
  myTeamPlayers?.map((rosterEntry: any) => {
    myTeamPoints += Number(rosterEntry?.playerFantasyPoints);
    return false;
  });

  let opponentTeamPoints = 0;
  opponentTeamPlayers?.map((rosterEntry: any) => {
    opponentTeamPoints += Number(rosterEntry?.playerFantasyPoints);
    return false;
  });

  let color = "";
  switch (normalisedContest?.winLoseDraw) {
    case "Win":
      color = "border-t-8 rounded border-green-500";
      break;
    case "Lose":
      color = "border-t-8 rounded border-red-500";
      break;
    case "Unmatched":
      color = "border-t-8 rounded border-white";
      break;
    case "Draw":
      color = "border-t-8 rounded border-gray-400";
      break;
    default:
      color = "border-t-8 rounded border-white";
      break;
  }

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      fullWidth
      maxWidth="md"
      scroll="body"
      aria-labelledby="form-dialog-title"
    >
      <form className={color}>
        <DialogTitle onClose={() => handleClose(false)}>
          Contest Details
        </DialogTitle>
        <DialogContent>
          <Fragment>
            <Grid className="flex flex-col">
              <LeagueContestDetailsDesktop
                myTeamId={currentContest?.claimerTeamId || 0}
                opponentTeamId={currentContest?.creatorTeamId || 0}
                myTeam={myTeam}
                opponentTeam={opponentTeam}
                myTeamPlayers={myTeamPlayers}
                opponentTeamPlayers={opponentTeamPlayers}
                myBonusPoints={myBonusPoints}
                opponentBonusPoints={opponentBonusPoints}
                myTeamPoints={myTeamPoints}
                opponentTeamPoints={opponentTeamPoints}
              />
              <LeagueContestDetailsMobile
                myTeamId={currentContest?.claimerTeamId || 0}
                opponentTeamId={currentContest?.creatorTeamId || 0}
                myTeam={myTeam}
                opponentTeam={opponentTeam}
                myTeamPlayers={myTeamPlayers}
                opponentTeamPlayers={opponentTeamPlayers}
                myBonusPoints={myBonusPoints}
                opponentBonusPoints={opponentBonusPoints}
                myTeamPoints={myTeamPoints}
                opponentTeamPoints={opponentTeamPoints}
              />
            </Grid>
            <Grid container className="mt-4">
              <Grid item xs={12} sm={12} md={12} container>
                <Grid item xs={6} sm={6} md={3}>
                  <Typography
                    variant="body1"
                    className="w-full font-semibold  "
                  >
                    Entry
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Typography
                    variant="body1"
                    component="span"
                    className="font-black  "
                  >
                    {renderCurrency(
                      c2d(Number(currentContest?.entryAmount)) || 0
                    )}
                  </Typography>
                </Grid>
              </Grid>
              {/* <Grid item xs={12} sm={12} md={12} container>
                <Grid item xs={6} sm={6} md={3}>
                  <Typography
                    variant="body1"
                    className="w-full font-semibold  "
                  >
                    Cover Spread
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Typography
                    variant="body1"
                    component="span"
                    className="font-black  "
                  >
                    {renderCurrency(
                      Number(currentContest?.claimerTeamCover) || 0
                    )}
                  </Typography>
                </Grid>
              </Grid> */}

              <Grid item xs={12} sm={12} md={12} container>
                <Grid item xs={6} sm={6} md={3}>
                  <Typography
                    variant="body1"
                    className="w-full font-semibold  "
                  >
                    Win &nbsp; &nbsp;{" "}
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={6} md={3}>
                  <Typography
                    variant="body1"
                    component="span"
                    className="font-black  "
                  >
                    {renderCurrency(
                      c2d(Number(currentContest?.claimerTeamMaxWin)) || 0
                    )}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Grid container justify="flex-end">
            <Grid item xs={12} sm={6} md={6} lg={4} container justify="center">
              <Button
                onClick={() => {
                  handleClose(false);
                  // closeClaimContestModal();
                }}
                fullWidth
                variant="outlined"
                color="primary"
              >
                Close
              </Button>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default ViewPastLeagueContestModal;
