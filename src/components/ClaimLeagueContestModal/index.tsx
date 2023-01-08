import React, { Fragment, useState } from "react";
import clsx from "clsx";
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
import { doAsyncClaimContest } from "../../redux/thunks/contests";
import { ClaimLeagueContestModalProps, ClaimContestForm } from "./interfaces";
import { renderCurrency } from "../../helpers/currency";
import LeagueContestDetailsDesktop from "../LeagueContestDets/LeagueContestDetailsDesktop";
import LeagueContestDetailsMobile from "../LeagueContestDets/LeagueContestDetailsMobile";
import useStyles from "./styles";

import { c2d } from "../../helpers/currency";
import { selectCurrentLeague } from "../../redux/selectors/leagues";
import { SCORING_TYPE } from "../../constants/scoringType";

const ClaimLeagueContestModal = (props: ClaimLeagueContestModalProps) => {
  const classes = useStyles();
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isDisabled, setIsDisabled] = useState(false);
  const currentContest = useAppSelector(selectSelectedContest);
  const currentLeague = useAppSelector(selectCurrentLeague);

  const { open, handleClose, handleSubmit, changeTabs } = props;

  const leagueScoringType = currentLeague
    ? currentLeague.scoringTypeId
    : SCORING_TYPE.NOPPR;

  const myTeamPlayers = currentContest
    ? currentContest?.claimerContestTeam?.contestRosters
    : [];

  const myTeam = {
    ...currentContest?.claimerContestTeam?.team,
  };

  const opponentTeamPlayers = currentContest
    ? currentContest?.creatorContestTeam?.contestRosters
    : [];

  const opponentTeam = {
    ...currentContest?.creatorContestTeam?.team,
  };

  const myBonusPoints =
    currentContest?.claimerTeamSpread > 0
      ? currentContest?.claimerTeamSpread
      : 0;

  const opponentBonusPoints =
    currentContest?.creatorTeamSpread > 0
      ? currentContest?.creatorTeamSpread
      : 0;

  let myTeamPoints = 0;
  myTeamPlayers?.map((rosterEntry: any) => {
    let points = 0;
    if (rosterEntry?.player?.isOver) {
      if (leagueScoringType === SCORING_TYPE.NOPPR) {
        points = rosterEntry?.player?.fantasyPoints;
      }
      if (leagueScoringType === SCORING_TYPE.HALFPPR) {
        points = rosterEntry?.player?.fantasyPointsHalfPpr;
      }
      if (leagueScoringType === SCORING_TYPE.FULLPPR) {
        points = rosterEntry?.player?.fantasyPointsFullPpr;
      }
    } else {
      points = 0;
    }
    myTeamPoints += Number(points);
    return false;
  });

  let opponentTeamPoints = 0;
  opponentTeamPlayers?.map((rosterEntry: any) => {
    let points = 0;
    if (rosterEntry?.player?.isOver) {
      if (leagueScoringType === SCORING_TYPE.NOPPR) {
        points = rosterEntry?.player?.fantasyPoints;
      }
      if (leagueScoringType === SCORING_TYPE.HALFPPR) {
        points = rosterEntry?.player?.fantasyPointsHalfPpr;
      }
      if (leagueScoringType === SCORING_TYPE.FULLPPR) {
        points = rosterEntry?.player?.fantasyPointsFullPpr;
      }
    } else {
      points = 0;
    }
    opponentTeamPoints += Number(points);
    return false;
  });

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      fullWidth
      maxWidth="md"
      scroll="body"
      aria-labelledby="form-dialog-title"
    >
      <form>
        <DialogTitle onClose={() => handleClose(false)}>
          Claim a Contest
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
          </Fragment>
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item xs={12} md={6} container alignContent="center">
              <Fragment>
                <Grid item xs={12} sm={12} md={6} container>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    container
                    alignContent="center"
                  >
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

                <Grid item xs={12} sm={12} md={6} container>
                  <Grid
                    item
                    xs={6}
                    sm={6}
                    md={6}
                    container
                    alignContent="center"
                  >
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
              </Fragment>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              container
              alignContent="center"
              justify="flex-end"
            >
              <Grid
                item
                xs={12}
                sm={12}
                md={3}
                lg={3}
                container
                justify="flex-end"
              >
                <Button
                  onClick={() => {
                    setIsDisabled(true);
                    handleSubmit({ leagueContestId: currentContest?.id });
                    // closeClaimContestModal();
                    setTimeout(() => {
                      setIsDisabled(false);
                    }, 3000);
                    changeTabs("openContests");
                  }}
                  disabled={isDisabled}
                  className={clsx("text-white", classes.matchButton)}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Match
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default ClaimLeagueContestModal;
