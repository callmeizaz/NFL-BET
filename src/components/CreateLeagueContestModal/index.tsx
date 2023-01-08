import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
// import useMediaQuery from "@material-ui/core/useMediaQuery";
// import clsx from "classnames";

import { FormikProps, useFormik } from "formik";
// import { TextField, CheckboxWithLabel } from "formik-material-ui";
import Select from "react-select";

import ReactSelectTeamOption from "./../../components/ReactSelectTeamOption";
import ReactSelectSingleTeamValue from "./../../components/ReactSelectSingleTeamValue";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { BET_AMOUNTS } from "../../constants/config";
import DialogTitle from "../DialogTitle";
// import useStyles from "./styles";
import routes from "../../constants/routes";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { useSnackbar } from "notistack";
import createLeagueContestCardSchema from "../../constants/schemas/createLeagueContest";
import {
  // fetchAsyncLeagues,
  doAsyncCreateLeagueContest,
} from "../../redux/thunks/leagues";
import { fetchAsyncContestValues } from "../../redux/thunks/leagueContests";

import { fetchAsyncMyContests } from "../../redux/thunks/leagueContests";
import { resetLoading } from "../../redux/reducers/contestsSlice";

import LeagueContestDetailsDesktop from "../LeagueContestDets/LeagueContestDetailsDesktop";
import LeagueContestDetailsMobile from "../LeagueContestDets/LeagueContestDetailsMobile";

import { renderCurrency, c2d } from "../../helpers/currency";

import {
  IProps,
  CreateLeagueContestForm,
  // LeagueContestValuesPayloadInterface,
} from "./interfaces";

import { TeamData } from "../../typings/interfaces/leagues";

import { fetchAsyncWalletFunds } from "../../redux/thunks/wallet";
import {
  selectUserData,
  selectConfig,
} from "../../redux/selectors/authentication";
import { selectCurrentLeague } from "../../redux/selectors/leagues";
import { selectContestValues } from "../../redux/selectors/leagueContests";

import { LEAGUE_CONTEST_STATUSES } from "../../constants/config/contests";
import { SCORING_TYPE } from "../../constants/scoringType";

const CONTEST_MENU = "CONTEST_MENU";
const TEAMS_PREVIEW = "TEAMS_PREVIEW";

const CreateLeagueContestModal = (props: IProps) => {
  const theme = useTheme();
  // const classes = useStyles();
  let history = useHistory();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { open, handleClose, changeTabs } = props;

  const [teamFantasyPoints, setTeamFantasyPoints] = useState(0);
  const [myTeamId, setMyTeamId] = useState(0);
  const [opponentTeamId, setOpponentTeamId] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const userData = useAppSelector(selectUserData);
  const currentLeague = useAppSelector(selectCurrentLeague);
  const contestValues = useAppSelector(selectContestValues);
  const config = useAppSelector(selectConfig);

  const entryAmountDropdownOptions = BET_AMOUNTS.filter((amount) => {
    let flag = true;
    if (!config?.paidContests) {
      if (amount !== 0) {
        flag = false;
      }
    }
    return flag;
  }).map((amount) => {
    return {
      label: `$${amount}`,
      value: amount,
    };
  });

  const teams = currentLeague ? currentLeague.teams : [];

  const leagueScoringType = currentLeague
    ? currentLeague.scoringTypeId
    : SCORING_TYPE.NOPPR;

  let teamDropdownOptions = teams?.map((team: TeamData) => {
    return {
      label: `${team.name}`,
      value: team,
    };
  });
  const autoSelectedTeam = teamDropdownOptions.find((teamOption: any) => {
    const team = teamOption.value;
    return team.userId === userData?.id;
  });

  let opponentTeamDropdownOptions = teams?.map((team: TeamData) => {
    return {
      label: `${team.name}`,
      value: team,
    };
  });

  // const filterTeamOptions = (
  //   teamType: string,
  //   teamName: string | undefined
  // ) => {
  //   if (teamType === "opponent") {
  //     opponentTeamDropdownOptions = opponentTeamDropdownOptions.filter(
  //       (t: { label: string; value: object }) => t.label !== teamName
  //     );
  //   } else {
  //     teamDropdownOptions = teamDropdownOptions.filter(
  //       (t: { label: string; value: object }) => t.label !== teamName
  //     );
  //   }
  // };

  const initialValues: CreateLeagueContestForm = {
    creatorTeam: autoSelectedTeam || null,
    claimerTeam: null,
    entry: null,
    winBonusFlag: false,
    winBonus: 0,
    currentScreen: CONTEST_MENU,
  };

  const fetchMyContests = () => {
    if (userData !== null) {
      const id = userData.id;
      dispatch(
        fetchAsyncMyContests({
          filter: {
            where: {
              and: [
                { ended: false },
                { leagueId: currentLeague?.id },
                {
                  or: [
                    {
                      creatorId: id,
                    },
                    {
                      claimerId: id,
                    },
                  ],
                },
                {
                  or: [
                    {
                      status: LEAGUE_CONTEST_STATUSES.OPEN,
                    },
                    { status: LEAGUE_CONTEST_STATUSES.MATCHED },
                    { status: LEAGUE_CONTEST_STATUSES.UNMATCHED },
                  ],
                },
              ],
            },
            include: [
              {
                relation: "creatorTeam",
                scope: {
                  include: [
                    {
                      relation: "user",
                    },
                  ],
                },
              },
              {
                relation: "claimerTeam",
                scope: {
                  include: [
                    {
                      relation: "user",
                    },
                  ],
                },
              },
              {
                relation: "creator",
              },
              {
                relation: "claimer",
              },
              {
                relation: "creatorContestTeam",
                scope: {
                  include: [
                    {
                      relation: "contestRosters",
                      scope: {
                        include: [
                          {
                            relation: "player",
                          },
                        ],
                      },
                    },
                    {
                      relation: "team",
                      scope: {
                        include: [
                          {
                            relation: "user",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
              {
                relation: "claimerContestTeam",
                scope: {
                  include: [
                    {
                      relation: "contestRosters",
                      scope: {
                        include: [
                          {
                            relation: "player",
                          },
                        ],
                      },
                    },
                    {
                      relation: "team",
                      scope: {
                        include: [
                          {
                            relation: "user",
                          },
                        ],
                      },
                    },
                  ],
                },
              },
            ],
          },
        })
      ).then((response: any) => {
        if (response.type == "leagueContestsmyContests/fetch") {
          setTimeout(() => {
            dispatch(resetLoading());
          }, 3000);
        } else {
          return;
        }
      });
    }
  };

  const {
    values,
    setFieldValue,
    dirty,
    isValid,
    resetForm,
    handleSubmit,
    isSubmitting,
  }: FormikProps<CreateLeagueContestForm> = useFormik<CreateLeagueContestForm>({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: createLeagueContestCardSchema,
    onSubmit: (values: CreateLeagueContestForm, { setSubmitting }) => {
      setSubmitting(true);
      const { creatorTeam, claimerTeam, entry, winBonusFlag } = values;

      const payload = {
        creatorTeamId: !!creatorTeam ? creatorTeam.value.id : creatorTeam,
        claimerTeamId: !!claimerTeam ? claimerTeam.value.id : claimerTeam,
        entryAmount: Number(entry ? entry.value : 0),
        winBonus: winBonusFlag,
      };

      dispatch(doAsyncCreateLeagueContest(payload)).then((response) => {
        setSubmitting(false);
        if (response.type == "league/create/contest/fulfilled") {
          dispatch(fetchAsyncWalletFunds({ userId: userData.id }));
          fetchMyContests();

          enqueueSnackbar("Successfully added contest", {
            variant: "success",
          });
          closeModal();
          changeTabs(1);
        }
      });
    },
  });

  opponentTeamDropdownOptions = opponentTeamDropdownOptions?.filter(
    (team: any) => {
      return team?.value.id !== values?.creatorTeam?.value.id;
    }
  );

  const closeModal = () => {
    handleClose(false);
    resetForm();
  };

  const handleNext = () => {
    const { creatorTeam, claimerTeam, entry } = values;
    if (!!creatorTeam && !!claimerTeam) {
      const payload = {
        creatorTeamId: creatorTeam.value.id,
        claimerTeamId: claimerTeam.value.id,
        entryAmount: Number(entry ? entry.value : 0),
      };

      dispatch(fetchAsyncContestValues(payload));
    }
    setFieldValue("currentScreen", TEAMS_PREVIEW);
  };

  const contestBonusValues = contestValues.withoutWinBonus;

  const fetchContestValues = (type: string, team: any) => {
    setNextButtonDisabled(true);
    const { entry } = values;
    let promise = null;
    if (type === "creator" && values.claimerTeam && values.entry) {
      const payload = {
        creatorTeamId: team.value.id,
        claimerTeamId: values.claimerTeam.value.id,
        entryAmount: Number(entry ? entry.value : 0),
      };

      promise = dispatch(fetchAsyncContestValues(payload));
    }
    if (values.creatorTeam && type === "claimer" && values.entry) {
      const payload = {
        creatorTeamId: values.creatorTeam.value.id,
        claimerTeamId: team.value.id,
        entryAmount: Number(entry ? entry.value : 0),
      };

      promise = dispatch(fetchAsyncContestValues(payload));
    }

    if (values.creatorTeam && values.claimerTeam && type === "entry") {
      const payload = {
        creatorTeamId: values.creatorTeam.value.id,
        claimerTeamId: values.claimerTeam.value.id,
        entryAmount: Number(team ? team.value : 0),
      };

      promise = dispatch(fetchAsyncContestValues(payload));
    }

    if (promise) {
      promise.then((response) => {
        if (response.type == "leagueContestsvalues/fetch/fulfilled") {
          setNextButtonDisabled(false);
        }
      });
    }
  };

  const { creatorTeam, claimerTeam } = values;

  const myTeamPlayers = creatorTeam ? creatorTeam?.value?.rosters : [];
  const myTeam = creatorTeam?.value;

  const opponentTeamPlayers = claimerTeam ? claimerTeam?.value?.rosters : [];
  const opponentTeam = claimerTeam?.value;

  const myBonusPoints =
    contestValues?.withoutWinBonus.spread > 0
      ? contestValues?.withoutWinBonus.spread
      : 0;

  const opponentBonusPoints =
    contestValues?.withoutWinBonus.spread < 0
      ? Math.abs(contestValues?.withoutWinBonus.spread)
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
      onClose={closeModal}
      fullWidth
      fullScreen={isSmall && values.currentScreen === TEAMS_PREVIEW}
      maxWidth="sm"
      scroll="body"
      aria-labelledby="form-dialog-title"
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle onClose={closeModal}>Create a Contest</DialogTitle>
        <DialogContent>
          {values.currentScreen === CONTEST_MENU && (
            <Grid className="flex flex-col">
              <Grid className="mb-2">
                <Typography>Select your Team</Typography>
                <Select
                  placeholder="Select Team"
                  name="team"
                  menuPortalTarget={document.body}
                  noOptionsMessage={() => "No Teams"}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    singleValue: (base) => ({
                      ...base,
                      width: "100%",
                    }),
                  }}
                  components={{
                    Option: ReactSelectTeamOption,
                    SingleValue: ReactSelectSingleTeamValue,
                  }}
                  value={values.creatorTeam}
                  options={teamDropdownOptions}
                  onChange={(selectedTeam) => {
                    setFieldValue("creatorTeam", selectedTeam);
                    setFieldValue("claimerTeam", null);
                    fetchContestValues("creator", selectedTeam);
                    setMyTeamId(selectedTeam ? selectedTeam.value.id : 0);
                  }}
                />
              </Grid>
              <Grid className="mb-2">
                <Typography>Select your Opponent Team</Typography>
                <Select
                  placeholder="Select Opponent's Team"
                  name="opponentTeam"
                  menuPortalTarget={document.body}
                  noOptionsMessage={() => "No Teams"}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    singleValue: (base) => ({
                      ...base,
                      width: "100%",
                    }),
                  }}
                  components={{
                    Option: ReactSelectTeamOption,
                    SingleValue: ReactSelectSingleTeamValue,
                  }}
                  value={values.claimerTeam}
                  options={opponentTeamDropdownOptions}
                  onChange={(selectedTeam) => {
                    setFieldValue("claimerTeam", selectedTeam);
                    fetchContestValues("claimer", selectedTeam);
                    setOpponentTeamId(selectedTeam ? selectedTeam.value.id : 0);
                  }}
                  isDisabled={!values.creatorTeam}
                />
                <Typography className="w-full" variant="caption" align="right">
                  (Only team within a +/- 50 Projected FP score will be allowed)
                </Typography>
              </Grid>
              <Grid className="mb-8 ">
                <Typography>Entry</Typography>
                <Select
                  className=""
                  isSearchable
                  placeholder="Select Entry Amount..."
                  value={values.entry}
                  name="entry"
                  menuPortalTarget={document.body}
                  styles={{
                    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                    singleValue: (base) => ({
                      ...base,
                      width: "100%",
                    }),
                  }}
                  options={entryAmountDropdownOptions}
                  onChange={(selectedEntryAmount) => {
                    setFieldValue("entry", selectedEntryAmount);
                    fetchContestValues("entry", selectedEntryAmount);
                  }}
                />
              </Grid>
            </Grid>
          )}
          {values.currentScreen === TEAMS_PREVIEW && (
            <Fragment>
              <Grid className="flex flex-col">
                <LeagueContestDetailsDesktop
                  myTeamId={myTeamId}
                  opponentTeamId={opponentTeamId}
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
                  myTeamId={myTeamId}
                  opponentTeamId={opponentTeamId}
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
          )}
        </DialogContent>
        <DialogActions>
          <Grid container justify="space-between">
            <Grid item xs={12} md={6} container alignContent="center">
              {values.currentScreen === TEAMS_PREVIEW && (
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
                        component="span"
                        className="font-black  "
                      >
                        {renderCurrency(values?.entry?.value || 0)}
                      </Typography>
                    </Grid>
                  </Grid>

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
                        className="w-full font-semibold pb-4 md:pb-0"
                      >
                        Win
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      sm={6}
                      md={3}
                      container
                      alignContent="center"
                    >
                      <Typography
                        variant="body1"
                        component="span"
                        className="font-black pb-4 md:pb-0"
                      >
                        {renderCurrency(c2d(contestBonusValues.maxWin) || 0)}
                      </Typography>
                    </Grid>
                  </Grid>
                </Fragment>
              )}
            </Grid>

            <Grid
              item
              xs={12}
              md={6}
              container
              alignContent="center"
              justify="flex-end"
              spacing={1}
            >
              {values.currentScreen === CONTEST_MENU && (
                <Grid className="w-full md:w-3/12">
                  <Button
                    fullWidth
                    onClick={handleNext}
                    variant="contained"
                    color="primary"
                    disabled={
                      nextButtonDisabled ||
                      values.creatorTeam === null ||
                      values.claimerTeam === null ||
                      values.entry === null
                    }
                  >
                    Next
                  </Button>
                </Grid>
              )}
              {values.currentScreen === TEAMS_PREVIEW && (
                <Grid item xs={3} sm={3} md={4} lg={4}>
                  <Button
                    onClick={() => setFieldValue("currentScreen", CONTEST_MENU)}
                    fullWidth
                    color="secondary"
                              variant="outlined"
                  >
                    Back
                  </Button>
                </Grid>
              )}
              {values.currentScreen === TEAMS_PREVIEW && (
                <Grid item xs={9} sm={9} md={8} lg={8}>
                  <Button
                    fullWidth
                    type="submit"
                    // onClick={}
                    variant="contained"
                    color="primary"
                    disabled={!(dirty && isValid && !isSubmitting)}
                  >
                    Confirm
                  </Button>
                </Grid>
              )}
            </Grid>
          </Grid>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default CreateLeagueContestModal;
