import React, { useState, useEffect, Fragment } from "react";
import { Formik, Field, FormikProps } from "formik";
import v from "voca";
import Select from "react-select";

import {
  Avatar,
  Button,
  Dialog,
  DialogContent,
  Grid,
  makeStyles,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Divider,
  DialogActions,
  ListItem,
  List,
  ListItemAvatar,
  ListItemText,
  Hidden,
  useMediaQuery,
} from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import {
  selectOpponentData,
  selectPlayersData,
  selectTopPlayerData,
  selectRecommendedPlayersData,
} from "../../redux/selectors/players";
import { useDebounce } from "use-debounce";
import { useAppSelector, useAppDispatch, AppDispatch } from "../../redux/store";
import { CreateBattleProps } from "./interface";
import clsx from "clsx";
import DialogTitle from "../DialogTitle";
import PlayerList from "./playerList";
import PlayerListMobile from "./playerListMobile";
import {
  fetchAsyncOpponents,
  fetchAsyncPlayers,
  fetchAsyncRecommendedPlayers,
  fetchAsyncTopPlayer,
} from "../../redux/thunks/players";
import {
  PLAYER_POSITIONS,
  LOBBY_SPREAD_LIMIT,
  BET_AMOUNTS_BATTLEGROUND,
} from "../../constants/config";
import TEAMS from "../../constants/teams";
import { generateGradientString } from "../../helpers/suggestions";
import { resetLoading } from "../../redux/reducers/playersSlice";
import createContestSchema from "../../constants/schemas/createCard";
import {
  ContestValuesPayloadInterface,
  CreateContestForm,
} from "../CreateContestModal/interfaces";
import {
  doAsyncCreateContest,
  fetchAsyncContestValues,
} from "../../redux/thunks/contests";
import { fetchAsyncWalletFunds } from "../../redux/thunks/wallet";
import { useSnackbar } from "notistack";
import { selectContestValues } from "../../redux/selectors/contests";
import {
  selectConfig,
  selectUserData,
} from "../../redux/selectors/authentication";
import FormikAsyncFieldHandler from "../FormikAsyncFieldHandler";
import { c2d, renderCurrency } from "../../helpers/currency";
import theme from "../../constants/theme";

const useStyles = makeStyles((theme) => ({
  bold: {
    fontWeight: 600,
  },

  circleText: {
    transform: "translate(0, -50%)",
    borderRadius: "50%",
    padding: "6px 10px",
    zIndex: 100,
  },
  xsScrText: {
    [theme.breakpoints.down("xs")]: {
      fontSize: "12px !important",
    },
  },
}));

const CreateBattleGroundContestModal = (props: CreateBattleProps) => {
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const playersData = useAppSelector(selectPlayersData);

  const opponentsData = useAppSelector(selectOpponentData);
  const topPlayerData = useAppSelector(selectTopPlayerData);
  const recommendedPlayersData = useAppSelector(selectRecommendedPlayersData);
  const contestValues = useAppSelector(selectContestValues);
  const userData = useAppSelector(selectUserData);
  const dispatch: AppDispatch = useAppDispatch();
  const { open, handleClose, changeTabs } = props;
  const [changePlayer, setChangePlayer] = useState(false);
  const [searchMainInput, setSearchMainInput] = useState("");
  const [searchListInput, setSearchListInput] = useState("");
  const [mainQueryText] = useDebounce(searchMainInput, 300);
  const [listQueryText] = useDebounce(searchListInput, 300);
  const [playerPoint, setPlayerPoint] = useState(5);
  const [opponentPoint, setOpponentPoint] = useState(4);
  const [changeOpponent, setChangeOpponent] = useState(false);
  const [makeOpponent, setMakeOpponent] = useState(false);
  const [dropdownPlayer, setDropdownPlayer] = useState<any>(null);
  const [selectedMainPlayer, setMainPlayer] = useState<any>(topPlayerData);
  const [selectedListPlayer, setListPlayer] = useState<any>(null);
  const [playerId, setPlayerId] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const config = useAppSelector(selectConfig);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const entryAmountDropdownOptions = BET_AMOUNTS_BATTLEGROUND.filter(
    (amount) => {
      let flag = true;
      if (!config?.paidContests) {
        if (amount !== 0) {
          flag = false;
        }
      }
      return flag;
    }
  ).map((amount) => {
    return {
      label: `$${amount}`,
      value: amount,
    };
  });

  useEffect(() => {
    dispatch(fetchAsyncTopPlayer()).then((response: any) => {
      if (
        response.type == "players/top-player/fetch/fulfilled" &&
        topPlayerData
      ) {
        dispatch(fetchAsyncRecommendedPlayers(topPlayerData?.id)).then(
          (response: any) => {
            if (
              response.type == "players/recommended-players/fetch/fulfilled"
            ) {
              // setTimeout(() => {
              //   dispatch(resetLoading());
              // }, 3000);
            } else {
              return;
            }
          }
        );
      } else {
        return;
      }
    });
  }, []);

  useEffect(() => {
    if (selectedMainPlayer) {
      dispatch(fetchAsyncRecommendedPlayers(selectedMainPlayer?.id)).then(
        (response: any) => {
          if (response.type == "players/recommended-players/fetch/fulfilled") {
            // setTimeout(() => {
            //   dispatch(resetLoading());
            // }, 3000);
          } else {
            return;
          }
        }
      );
    }
  }, [selectedMainPlayer]);

  // useEffect(() => {
  //   setMainPlayer(topPlayerData);
  // }, [topPlayerData]);

  const LOWERLIMIT_SPREAD = 0.65;
  const UPPERLIMIT_SPREAD = 1.6;

  useEffect(() => {
    let selectedMainPlayerProjectedFantasyPoints = Number(
      selectedMainPlayer?.projectedFantasyPointsHalfPpr
    );
    let projectedLowerLimit =
      selectedMainPlayerProjectedFantasyPoints * LOWERLIMIT_SPREAD;

    if (selectedMainPlayerProjectedFantasyPoints - projectedLowerLimit > 6.5) {
      projectedLowerLimit = selectedMainPlayerProjectedFantasyPoints - 6.5;
    }

    let projectedUpperLimit =
      selectedMainPlayerProjectedFantasyPoints * UPPERLIMIT_SPREAD;

    if (projectedUpperLimit - selectedMainPlayerProjectedFantasyPoints > 6.5) {
      projectedUpperLimit = selectedMainPlayerProjectedFantasyPoints + 6.5;
    }

    if (playersData.length !== 0) {
      if (listQueryText !== "") {
        dispatch(
          fetchAsyncOpponents({
            filter: {
              limit: 100,
              where: {
                or: [
                  { firstName: { like: `%${listQueryText}%` } },
                  { lastName: { like: `%${listQueryText}%` } },
                  { fullName: { like: `%${listQueryText}%` } },
                ],
                hasStarted: false,
                isOver: false,
                position: { inq: PLAYER_POSITIONS },
                and: [
                  {
                    projectedFantasyPointsHalfPpr: {
                      between: [
                        projectedLowerLimit || 2.9,
                        projectedUpperLimit || 30,
                      ],
                    },
                  },
                  { projectedFantasyPointsHalfPpr: { gt: 2.9 } },
                ],
                id: { neq: selectedMainPlayer?.id },
                available: true,
                status: "Active",
              },
              order: "projectedFantasyPointsHalfPpr DESC",
              include: [
                {
                  relation: "team",
                },
              ],
            },
          })
        );
      } else {
        dispatch(
          fetchAsyncOpponents({
            filter: {
              limit: 200,
              where: {
                hasStarted: false,
                isOver: false,
                position: { inq: PLAYER_POSITIONS },
                and: [
                  {
                    projectedFantasyPointsHalfPpr: {
                      between: [
                        projectedLowerLimit || 2.9,
                        projectedUpperLimit || 30,
                      ],
                    },
                  },
                  { projectedFantasyPointsHalfPpr: { gt: 2.9 } },
                ],
                available: true,
                status: "Active",
              },
              order: "projectedFantasyPointsHalfPpr DESC",
              include: [
                {
                  relation: "team",
                },
              ],
            },
          })
        );
      }
    }
  }, [dispatch, listQueryText, selectedMainPlayer]);

  useEffect(() => {
    if (mainQueryText !== "") {
      dispatch(
        fetchAsyncPlayers({
          filter: {
            limit: 100,
            where: {
              or: [
                { firstName: { like: `%${mainQueryText}%` } },
                { lastName: { like: `%${mainQueryText}%` } },
                { fullName: { like: `%${mainQueryText}%` } },
              ],
              hasStarted: false,
              isOver: false,
              position: { inq: PLAYER_POSITIONS },
              projectedFantasyPointsHalfPpr: { gt: 2.9 },
              // id: { neq: firstPlayer?.id },
              available: true,
              status: "Active",
            },
            order: "projectedFantasyPointsHalfPpr DESC",
            include: [
              {
                relation: "team",
              },
            ],
          },
        })
      );
    } else {
      dispatch(
        fetchAsyncPlayers({
          filter: {
            limit: 200,
            where: {
              hasStarted: false,
              isOver: false,
              position: { inq: PLAYER_POSITIONS },
              projectedFantasyPointsHalfPpr: { gt: 2.9 },
              available: true,
              status: "Active",
            },
            order: "projectedFantasyPointsHalfPpr DESC",
            include: [
              {
                relation: "team",
              },
            ],
          },
        })
      );
    }
  }, [dispatch, mainQueryText]);

  // handler
  const closeModalHandler = () => {
    handleClose(false);
    setTimeout(() => {
      if (changePlayer) {
        setChangePlayer(false);
      } else if (changeOpponent) {
        setChangeOpponent(false);
      }
    }, 500);
  };

  const handleFetchValues = (payload: ContestValuesPayloadInterface) => {
    setNextButtonDisabled(true);
    const { entry, opponentId, playerId, type } = payload;
    let promise = null;
    if (type === "creator" && opponentId) {
      const data = {
        playerId: playerId,
        opponentId: opponentId,
        entry: Number(entry ? entry : 0),
        type,
      };
      promise = dispatch(fetchAsyncContestValues(data));
    }
  };

  // @ts-ignore
  const topPlayerTeamColor = TEAMS[selectedMainPlayer?.teamName]?.PrimaryColor;

  return (
    <Formik
      initialValues={{
        player: null,
        opponent: null,
        entry: null,
        winBonusFlag: false,
        spread: 0,
        coverFlag: true,
        cover: 0,
        winBonus: 0,
        nextScreen: false,
        maxWin: 0,
      }}
      validationSchema={createContestSchema}
      // enableReinitialize
      onSubmit={(values: CreateContestForm, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        handleClose(false);

        const { player, opponent, entry, winBonusFlag } = values;
        let selectedPlayer = { fullName: "", id: 0 };
        let selectedOpponent = { fullName: "", id: 0 };
        if (makeOpponent) {
          selectedPlayer = selectedListPlayer;
          selectedOpponent = selectedMainPlayer;
        } else {
          selectedPlayer = selectedMainPlayer;
          selectedOpponent = selectedListPlayer;
        }

        const payload = {
          creatorPlayerId: selectedPlayer.id,
          claimerPlayerId: selectedOpponent.id,
          entryAmount: Number(entry ? entry.value : 0),
          winBonus: winBonusFlag,
          toWin: values.maxWin,
        };

        dispatch(doAsyncCreateContest(payload)).then((response) => {
          if (response.type == "contests/create/contest/fulfilled") {
            dispatch(fetchAsyncWalletFunds({ userId: userData.id }));
            enqueueSnackbar("Successfully added contest", {
              variant: "success",
            });
            changeTabs("myContests");
          }
        });
        resetForm();
      }}
    >
      {({
        values,
        handleSubmit,
        setFieldValue,
        errors,
        resetForm,
        handleChange,
      }: FormikProps<CreateContestForm>) => {
        const changePage = (value: boolean) => {
          setFieldValue("nextScreen", value);
        };

        const creatorBonusPoints = values?.spread;
        const claimerBonusPoints = -Number(values?.spread);

        const contestBonusValues = contestValues?.withoutWinBonus;

        return (
          <form onSubmit={handleSubmit}>
            <Fragment>
              <Hidden only={["xs", "sm"]}>
                <Dialog
                  open={open && !values.nextScreen}
                  onClose={() => closeModalHandler()}
                  fullWidth
                  maxWidth="md"
                  scroll="body"
                  aria-labelledby="battleground"
                >
                  <DialogTitle onClose={() => closeModalHandler()}>
                    Create a Contest
                  </DialogTitle>

                  <DialogContent>
                    <Grid
                      container
                      direction={`${makeOpponent ? "row-reverse" : "row"}`}
                      spacing={3}
                    >
                      {/* Right Tab */}
                      <Grid item xs={4} className="relative h-96">
                        <Grid
                          item
                          className={`absolute top-1/4 bg-green-900 ${
                            !makeOpponent ? "-right-3.5" : "-left-3.5"
                          } transform rounded-full px-3 py-2 z-50`}
                        >
                          <Typography
                            variant="h4"
                            className={`font-black text-white`}
                          >
                            VS
                          </Typography>
                        </Grid>
                        <Grid
                          container
                          direction="column"
                          justify="flex-start"
                          alignItems="center"
                          style={{ borderColor: "#B69056" }}
                          className={clsx("border-4  rounded-2xl py-3 h-full")}
                        >
                          {/* details */}
                          {!changePlayer ? (
                            <Grid item container justify="center">
                              <Grid item>
                                <Grid container direction="column">
                                  <Grid item xs={12} container justify="center">
                                    <Avatar
                                      variant="square"
                                      alt={selectedMainPlayer?.fullName}
                                      src={selectedMainPlayer?.photoUrlHiRes}
                                      className="h-32 w-32 rounded-xl"
                                    ></Avatar>
                                  </Grid>
                                  <Grid item>
                                    <Typography
                                      variant="h6"
                                      align="center"
                                      className={classes.bold}
                                    >
                                      {selectedMainPlayer?.fullName}
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                              {/* Buttons */}
                              <Grid item>
                                <Grid container direction="column">
                                  <Grid item className="w-full pt-1">
                                    <Button
                                      variant="outlined"
                                      color="primary"
                                      size="medium"
                                      fullWidth
                                      onClick={() => setChangePlayer(true)}
                                    >
                                      Change Player
                                    </Button>
                                  </Grid>
                                  <Grid item className="w-full pt-1">
                                    <Button
                                      variant="outlined"
                                      color="secondary"
                                      size="medium"
                                      fullWidth
                                      onClick={() =>
                                        setMakeOpponent(!makeOpponent)
                                      }
                                    >
                                      {makeOpponent
                                        ? "Make your player"
                                        : " Make opponent"}
                                    </Button>
                                  </Grid>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid item container justify="center">
                                  <Grid item className="my-2">
                                    <Typography variant="h6">
                                      {selectedMainPlayer?.position} |{" "}
                                      {selectedMainPlayer?.teamName}
                                      {selectedMainPlayer?.homeOrAway === "AWAY"
                                        ? " @ "
                                        : " vs "}
                                      {selectedMainPlayer?.opponentName
                                        ? selectedMainPlayer?.opponentName
                                        : ""}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    container
                                    justify="center"
                                    xs={6}
                                    alignContent="center"
                                    style={{ borderColor: "#B69056" }}
                                    className="border-2 rounded-md"
                                  >
                                    <Typography
                                      variant="h4"
                                      align="center"
                                      className="text-green-900 font-bold"
                                    >
                                      {
                                        selectedMainPlayer?.projectedFantasyPointsHalfPpr
                                      }
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Grid>
                            </Grid>
                          ) : (
                            <Grid
                              item
                              container
                              direction="column"
                              className="px-2"
                              justify="flex-start"
                            >
                              <Grid item container alignItems="center">
                                {/* Search */}
                                <Grid item xs={2}>
                                  <ArrowBackIcon
                                    onClick={() => {
                                      setChangePlayer(false);
                                      setSearchMainInput("");
                                    }}
                                    className="cursor-pointer"
                                    fontSize="small"
                                  />
                                </Grid>
                                <Grid item xs={10}>
                                  <TextField
                                    id="outlined-basic"
                                    placeholder="Search Players"
                                    value={searchMainInput}
                                    onChange={(event) => {
                                      setSearchMainInput(
                                        v.titleCase(event.target.value)
                                      );
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <SearchIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              {/* Players list */}
                              <Grid item container>
                                <List
                                  style={{ width: "100%" }}
                                  className="py-0 max-h-72 overflow-auto"
                                >
                                  {playersData?.map((player: any) => {
                                    return (
                                      <>
                                        <ListItem
                                          className="py-0 px-1 cursor-pointer hover:bg-yellow-100"
                                          style={{
                                            backgroundColor: `${
                                              player?.remoteId ===
                                              selectedMainPlayer?.remoteId
                                                ? "#e9decc"
                                                : ""
                                            }`,
                                          }}
                                          onClick={() => {
                                            setMainPlayer(player);
                                            if (
                                              player.remoteId ===
                                              selectedListPlayer?.remoteId
                                            ) {
                                              setListPlayer(null);
                                            }
                                            setDropdownPlayer(null);
                                            setListPlayer(null);
                                            setChangePlayer(false);
                                            setSearchMainInput("");
                                          }}
                                        >
                                          <ListItemAvatar
                                            style={{ minWidth: 0 }}
                                          >
                                            <Avatar
                                              className="h-8 w-8 mr-1"
                                              alt="Remy Sharp"
                                              src={player?.photoUrlHiRes}
                                            />
                                          </ListItemAvatar>
                                          <ListItemText
                                            className="text-xs"
                                            primary={player?.fullName}
                                            secondary={
                                              <>
                                                {`${player?.position} | ${
                                                  player?.teamName
                                                }  ${
                                                  player?.homeOrAway === "AWAY"
                                                    ? " @ "
                                                    : " vs "
                                                } ${
                                                  player?.opponentName
                                                    ? player?.opponentName
                                                    : ""
                                                } `}{" "}
                                                <Typography
                                                  style={{
                                                    display: "inline",
                                                  }}
                                                  component="span"
                                                  className="font-bold"
                                                  variant="body2"
                                                  color="primary"
                                                >
                                                  |{" "}
                                                  {
                                                    player?.projectedFantasyPointsHalfPpr
                                                  }
                                                </Typography>
                                              </>
                                            }
                                          />
                                        </ListItem>
                                        <Divider style={{ width: "100%" }} />
                                      </>
                                    );
                                  })}
                                </List>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      {/* Left Tab */}
                      <Grid item xs={8}>
                        {!changeOpponent ? (
                          <Grid
                            item
                            className="px-2 h-full"
                            container
                            justify="flex-start"
                            direction="column"
                            alignItems="stretch"
                          >
                            <Grid item xs={1} container className="max-w-none">
                              <Typography
                                color="secondary"
                                className="text-sm text-gray-500	"
                              >
                                {`CHOOSE ${
                                  makeOpponent ? "A PLAYER" : "AN OPPONENT"
                                } TO CREATE A CONTEST`}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={7}
                              container
                              alignContent="flex-start"
                              className="max-w-none min-h-0 overflow-auto"
                            >
                              {recommendedPlayersData?.recommendations?.map(
                                (opponent: any) => {
                                  if (
                                    opponent?.fullName !==
                                    selectedMainPlayer?.fullName
                                  ) {
                                    return (
                                      <PlayerList
                                        playerPoint={Number(
                                          selectedMainPlayer?.projectedFantasyPointsHalfPpr
                                        )}
                                        opponentPoint={Number(
                                          opponent?.projectedFantasyPointsHalfPpr
                                        )}
                                        remoteId={opponent?.remoteId}
                                        name={opponent?.fullName}
                                        position={opponent?.position}
                                        team={opponent?.teamName}
                                        opponent={opponent?.opponentName}
                                        homeOrAway={opponent?.homeOrAway}
                                        image={opponent?.photoUrlHiRes}
                                        topPlayerDataTeam={
                                          selectedMainPlayer?.teamName
                                        }
                                        makeOpponent={makeOpponent}
                                        selectedListPlayer={
                                          selectedListPlayer?.remoteId
                                        }
                                        onRowClick={() => {
                                          setListPlayer(opponent);
                                        }}
                                      />
                                    );
                                  }
                                }
                              )}
                            </Grid>

                            <Grid
                              item
                              xs={3}
                              container
                              className="max-w-none"
                              direction={`${
                                makeOpponent ? "row-reverse" : "row"
                              }`}
                            >
                              <Grid item xs={12}>
                                <Typography
                                  color="secondary"
                                  className="text-sm pt-4 text-gray-500"
                                >
                                  CREATE YOUR OWN MATCHUP
                                </Typography>
                              </Grid>
                              {dropdownPlayer ? (
                                <PlayerList
                                  playerPoint={Number(
                                    selectedMainPlayer?.projectedFantasyPointsHalfPpr
                                  )}
                                  opponentPoint={Number(
                                    dropdownPlayer?.projectedFantasyPointsHalfPpr
                                  )}
                                  remoteId={dropdownPlayer?.remoteId}
                                  name={dropdownPlayer?.fullName}
                                  position={dropdownPlayer?.position}
                                  team={dropdownPlayer?.teamName}
                                  opponent={dropdownPlayer?.opponentName}
                                  homeOrAway={dropdownPlayer?.homeOrAway}
                                  image={dropdownPlayer?.photoUrlHiRes}
                                  topPlayerDataTeam={
                                    selectedMainPlayer.teamName
                                  }
                                  makeOpponent={makeOpponent}
                                  button={{
                                    text: "Change Player",
                                    callback: () => {
                                      setDropdownPlayer(null);
                                      setListPlayer(null);
                                      setChangeOpponent(true);
                                    },
                                  }}
                                  selectedListPlayer={
                                    selectedListPlayer?.remoteId
                                  }
                                  onRowClick={() => {
                                    setListPlayer(dropdownPlayer);
                                  }}
                                />
                              ) : (
                                <Grid
                                  item
                                  container
                                  direction={`${
                                    makeOpponent ? "row-reverse" : "row"
                                  }`}
                                  justify="center"
                                  alignItems="center"
                                >
                                  <Grid item xs={2}></Grid>
                                  <Grid item xs={1}>
                                    <Typography
                                      variant="h5"
                                      className="text-green-900 font-black"
                                      align="center"
                                    >
                                      {"vs"}
                                    </Typography>
                                  </Grid>
                                  <Grid
                                    item
                                    xs={7}
                                    className="cursor-pointer "
                                    onClick={() => setChangeOpponent(true)}
                                  >
                                    <Grid
                                      item
                                      container
                                      direction="row"
                                      alignItems="center"
                                      className="my-1"
                                    >
                                      <Grid item className="mx-0.5">
                                        <SearchIcon />
                                      </Grid>
                                      <Grid item>
                                        <Typography
                                          variant="h6"
                                          className="uppercase font-bold"
                                          color="primary"
                                        >
                                          {makeOpponent
                                            ? "Select your player"
                                            : "Select an opponent"}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                  <Grid item xs={2}></Grid>
                                  <Grid item xs={12}>
                                    <Divider
                                      className="h-0.5"
                                      style={{
                                        backgroundImage: generateGradientString(
                                          makeOpponent,
                                          selectedMainPlayer?.teamName,
                                          dropdownPlayer
                                            ? dropdownPlayer?.teamName
                                            : null
                                        ),
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                              )}
                            </Grid>
                          </Grid>
                        ) : (
                          <Grid item container className="px-2">
                            <Grid item container alignItems="center">
                              {/* Search */}
                              <Grid
                                item
                                xs={12}
                                container
                                alignContent="center"
                              >
                                <Grid item xs={1}>
                                  <ArrowBackIcon
                                    onClick={() => {
                                      setChangeOpponent(false);
                                      setSearchListInput("");
                                    }}
                                  />
                                </Grid>
                                <Grid
                                  item
                                  xs={11}
                                  container
                                  direction="column"
                                  justify="center"
                                >
                                  <Typography
                                    color="secondary"
                                    className="text-sm text-gray-500"
                                  >
                                    {`CHOOSE ${
                                      makeOpponent ? "A PLAYER" : "AN OPPONENT"
                                    } TO CREATE A CONTEST`}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={12} container className="pt-4">
                                <Grid item xs={1}></Grid>
                                <Grid item xs={8}>
                                  <TextField
                                    id="outlined-basic"
                                    placeholder="SEARCH PLAYERS"
                                    value={searchListInput}
                                    fullWidth
                                    autoComplete="off"
                                    onChange={(event) => {
                                      setSearchListInput(
                                        v.titleCase(event.target.value)
                                      );
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <SearchIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            {/* Players list */}
                            <Grid item container>
                              <Grid item xs={1}></Grid>
                              <Grid item xs={8}>
                                <List className="max-h-72 overflow-auto">
                                  {opponentsData?.map((opponent: any) => {
                                    if (
                                      opponent?.fullName !==
                                      selectedMainPlayer?.fullName
                                    ) {
                                      return (
                                        <>
                                          <ListItem
                                            className="py-0 px-1 cursor-pointer hover:bg-yellow-50"
                                            onClick={() => {
                                              setDropdownPlayer(opponent);
                                              setListPlayer(opponent);
                                              setChangeOpponent(false);
                                            }}
                                          >
                                            <ListItemAvatar
                                              style={{ minWidth: 0 }}
                                            >
                                              <Avatar
                                                className="h-8 w-8 mr-1"
                                                alt={opponent?.fullName}
                                                src={opponent?.photoUrlHiRes}
                                              />
                                            </ListItemAvatar>
                                            <ListItemText
                                              className="text-xs"
                                              primary={opponent?.fullName}
                                              secondary={
                                                <>
                                                  {`${opponent?.position} | ${
                                                    opponent?.teamName
                                                  }  ${
                                                    opponent?.homeOrAway ===
                                                    "AWAY"
                                                      ? " @ "
                                                      : " vs "
                                                  } ${
                                                    opponent?.opponentName
                                                      ? opponent?.opponentName
                                                      : ""
                                                  } `}{" "}
                                                  <Typography
                                                    style={{
                                                      display: "inline",
                                                    }}
                                                    className="font-bold"
                                                    component="span"
                                                    variant="body2"
                                                    color="primary"
                                                  >
                                                    |{" "}
                                                    {
                                                      opponent?.projectedFantasyPointsHalfPpr
                                                    }
                                                  </Typography>
                                                </>
                                              }
                                            />
                                          </ListItem>
                                          <Divider style={{ width: "100%" }} />
                                        </>
                                      );
                                    }
                                  })}
                                </List>
                              </Grid>
                            </Grid>
                          </Grid>
                        )}
                      </Grid>
                    </Grid>
                    <DialogActions className="px-0">
                      <Grid
                        container
                        item
                        xs={12}
                        direction="row"
                        justify="flex-end"
                      >
                        <Grid item xs={12} sm={12} md={6} lg={4}>
                          <Button
                            className="text-white"
                            fullWidth
                            onClick={() => {
                              let player = { fullName: "", id: 0 };
                              let opponent = { fullName: "", id: 0 };
                              if (makeOpponent) {
                                player = selectedListPlayer;
                                opponent = selectedMainPlayer;
                              } else {
                                player = selectedMainPlayer;
                                opponent = selectedListPlayer;
                              }

                              setFieldValue("player", player);
                              setFieldValue("opponent", opponent);

                              handleFetchValues({
                                playerId: player.id,
                                opponentId: opponent.id,
                                type: "creator",
                                entry: Number(values?.entry?.value),
                              });
                              changePage(true);
                            }}
                            disabled={
                              !selectedListPlayer ||
                              !selectedMainPlayer ||
                              selectedListPlayer?.remoteId ===
                                selectedMainPlayer.remoteId
                            }
                            variant="contained"
                            color="primary"
                          >
                            Create Contest
                          </Button>
                        </Grid>
                      </Grid>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
                <Dialog
                  open={open && values.nextScreen}
                  onClose={() => closeModalHandler()}
                  fullWidth
                  maxWidth="md"
                  scroll="body"
                  aria-labelledby="battleground"
                >
                  <DialogTitle onClose={() => closeModalHandler()}>
                    Confirm Contest
                  </DialogTitle>
                  <DialogContent>
                    <Grid
                      container
                      item
                      direction="column"
                      alignItems="stretch"
                      xs={12}
                      className="py-4"
                    >
                      <Grid
                        item
                        xs={12}
                        container
                        justify="space-between"
                        alignContent="center"
                      >
                        <Grid item xs={5} container justify="center">
                          <Avatar
                            variant="square"
                            alt={
                              values?.player
                                ? `${values?.player?.firstName} ${values?.player?.lastName}`
                                : ""
                            }
                            src={
                              values?.player ? values?.player.photoUrlHiRes : ""
                            }
                            className={clsx(
                              "h-24 w-24 md:h-32 md:w-32",
                              "border-4 rounded-md",
                              creatorBonusPoints > 0
                                ? "border-green-800"
                                : "border-white"
                            )}
                          />
                          <Grid item xs={12} container justify="center">
                            <Typography
                              variant="caption"
                              component="span"
                              className={clsx(
                                "rounded-full p-1 md:p-2 text-white -mb-4",
                                creatorBonusPoints > 0
                                  ? " bg-green-900"
                                  : "bg-white"
                              )}
                            >
                              {creatorBonusPoints > 0
                                ? `+${creatorBonusPoints} Bonus Points`
                                : "."}
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid
                          item
                          xs={2}
                          container
                          justify="center"
                          alignContent="center"
                        >
                          <FormikAsyncFieldHandler
                            name="spread"
                            newValue={contestBonusValues?.spread}
                          />
                          <Typography variant="h6" align="center">
                            Vs
                          </Typography>
                        </Grid>

                        <Grid item xs={5} container justify="center">
                          <Avatar
                            alt={
                              values?.opponent
                                ? `${values?.opponent.firstName} ${values?.opponent.lastName}`
                                : ""
                            }
                            src={
                              values?.opponent
                                ? values?.opponent.photoUrlHiRes
                                : ""
                            }
                            className={clsx(
                              "h-24 w-24 md:h-32 md:w-32",
                              "border-4 rounded-md mb-2",
                              claimerBonusPoints > 0
                                ? "border-green-800"
                                : "border-white"
                            )}
                          />
                          <Grid item xs={12} container justify="center">
                            <Typography
                              variant="caption"
                              component="span"
                              className={clsx(
                                "rounded-full py-1 md:py-2 px-2  text-white -mb-4",
                                claimerBonusPoints > 0
                                  ? " bg-green-900"
                                  : "bg-whiet"
                              )}
                            >
                              {claimerBonusPoints > 0
                                ? `+${claimerBonusPoints} Bonus Points`
                                : "."}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        container
                        justify="space-between"
                        alignContent="center"
                        className="mt-4"
                      >
                        <Grid item xs={5} container justify="center">
                          <Typography
                            variant="h6"
                            align="center"
                            className="w-full"
                          >
                            {values?.player
                              ? `${values?.player.firstName} ${values?.player.lastName}`
                              : ""}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            {values?.player
                              ? `${values?.player.position} | ${
                                  values?.player.teamName
                                } ${
                                  values?.player.homeOrAway === "AWAY"
                                    ? "@"
                                    : "vs"
                                }
                                ${
                                  values?.player.opponentName
                                    ? values?.player.opponentName
                                    : ""
                                }`
                              : ""}
                          </Typography>
                        </Grid>

                        <Grid
                          item
                          xs={2}
                          container
                          justify="center"
                          alignContent="center"
                        ></Grid>

                        <Grid item xs={5} container justify="center">
                          <Typography
                            variant="h6"
                            align="center"
                            className="w-full"
                          >
                            {values?.opponent
                              ? `${values?.opponent.firstName} ${values?.opponent.lastName}`
                              : ""}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            {values?.opponent
                              ? `${values?.opponent.position} | ${
                                  values?.opponent.teamName
                                } ${
                                  values?.opponent.homeOrAway === "AWAY"
                                    ? "@"
                                    : "vs"
                                }
                                ${
                                  values?.opponent.opponentName
                                    ? values?.opponent.opponentName
                                    : ""
                                }`
                              : ""}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} container className="my-2">
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={12}
                            className="pr-1"
                          >
                            <Typography>Entry</Typography>
                            <Select
                              className=""
                              isSearchable
                              placeholder="Select Entry Amount..."
                              value={values.entry}
                              name="entry"
                              menuPortalTarget={document.body}
                              styles={{
                                menuPortal: (base) => ({
                                  ...base,
                                  zIndex: 9999,
                                }),
                                singleValue: (base) => ({
                                  ...base,
                                  width: "100%",
                                }),
                              }}
                              options={entryAmountDropdownOptions}
                              onChange={(selectedEntryAmount) => {
                                setFieldValue("entry", selectedEntryAmount);
                                let player = { fullName: "", id: 0 };
                                let opponent = { fullName: "", id: 0 };
                                if (makeOpponent) {
                                  player = selectedListPlayer;
                                  opponent = selectedMainPlayer;
                                } else {
                                  player = selectedMainPlayer;
                                  opponent = selectedListPlayer;
                                }
                                handleFetchValues({
                                  playerId: player.id,
                                  opponentId: opponent.id,
                                  type: "creator",
                                  entry: Number(selectedEntryAmount?.value),
                                });
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                    <DialogActions>
                      <Grid container justify="space-between">
                        <Grid
                          item
                          xs={12}
                          md={6}
                          container
                          alignContent="center"
                        >
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
                                  className="font-bold"
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
                                <FormikAsyncFieldHandler
                                  name="maxWin"
                                  newValue={(
                                    values.cover + values.winBonus
                                  ).toFixed(2)}
                                />
                                <FormikAsyncFieldHandler
                                  name="cover"
                                  newValue={contestBonusValues?.cover}
                                />
                                <FormikAsyncFieldHandler
                                  name="winBonus"
                                  newValue={contestBonusValues?.winBonus}
                                />
                                <Typography
                                  variant="body1"
                                  component="span"
                                  className="font-bold pb-4 md:pb-0"
                                >
                                  {renderCurrency(c2d(values.maxWin) || 0)}
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
                          <Grid item xs={3} sm={3} md={4} lg={4}>
                            <Button
                              color="secondary"
                              variant="outlined"
                              onClick={() => changePage(false)}
                              disabled={
                                selectedMainPlayer === null ||
                                selectedListPlayer === null
                              }
                              fullWidth={isSmall}
                            >
                              Back
                            </Button>
                          </Grid>
                          <Grid item xs={9} sm={9} md={8} lg={8}>
                            <Button
                              onClick={() => {
                                handleSubmit();
                              }}
                              fullWidth
                              className="text-white"
                              disabled={contestBonusValues === undefined}
                              variant="contained"
                              color="primary"
                            >
                              Confirm
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                    </DialogActions>
                  </DialogContent>
                </Dialog>
              </Hidden>
              {/* Mobile View */}
              <Hidden only={["md", "lg", "xl"]}>
                <Dialog
                  open={open}
                  onClose={() => closeModalHandler()}
                  fullWidth
                  scroll="body"
                  aria-labelledby="battleground"
                  PaperProps={{
                    className: "m-0 max-w-full w-full",
                  }}
                >
                  <DialogTitle onClose={() => closeModalHandler()}>
                    Create a Contest
                  </DialogTitle>

                  {values.nextScreen === false ? (
                    <DialogContent>
                      <Grid
                        container
                        direction={makeOpponent ? "column-reverse" : "column"}
                      >
                        {/* Right Tab */}
                        <Grid item xs={12}>
                          <Grid
                            container
                            direction="column"
                            justify="center"
                            alignItems="center"
                            style={{ borderColor: "#B69056" }}
                            className={clsx("border-4 rounded-xl pt-3")}
                          >
                            {/* details */}
                            {!changePlayer ? (
                              <Grid item container justify="center">
                                <Grid item xs={12}>
                                  <Grid container direction="column">
                                    <Grid
                                      item
                                      xs={12}
                                      container
                                      justify="center"
                                    >
                                      <Avatar
                                        variant="square"
                                        alt={selectedMainPlayer?.fullName}
                                        src={selectedMainPlayer?.photoUrlHiRes}
                                        className="h-32 w-32 rounded-xl"
                                      ></Avatar>
                                    </Grid>

                                    <Grid item xs={12}>
                                      <Typography
                                        variant="h5"
                                        align="center"
                                        className="font-bold"
                                      >
                                        {selectedMainPlayer?.fullName}
                                      </Typography>
                                      <Typography
                                        variant="h5"
                                        align="center"
                                        className="font-bold"
                                      >
                                        {selectedMainPlayer?.position} |{" "}
                                        {selectedMainPlayer?.teamName}
                                        {selectedMainPlayer?.homeOrAway ===
                                        "AWAY"
                                          ? " @ "
                                          : " vs "}
                                        {selectedMainPlayer?.opponentName
                                          ? selectedMainPlayer?.opponentName
                                          : ""}
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item>
                                  <Grid item container justify="center">
                                    <Grid
                                      item
                                      container
                                      justify="center"
                                      xs={12}
                                      alignContent="center"
                                      style={{
                                        borderColor: "#B69056",
                                        padding: "5px",
                                      }}
                                      className="border-2 rounded-md"
                                    >
                                      <Typography
                                        variant="h4"
                                        align="center"
                                        className="font-bold"
                                        style={{ color: "#B69056" }}
                                      >
                                        {
                                          selectedMainPlayer?.projectedFantasyPointsHalfPpr
                                        }
                                      </Typography>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                {/* Buttons */}
                                <Grid item xs={12} className="pt-2">
                                  <Grid container direction="row">
                                    <Grid item xs={6} container className="">
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        fullWidth
                                        disableElevation
                                        className="font-bold text-white h-full rounded-none rounded-bl-lg"
                                        onClick={() => setChangePlayer(true)}
                                      >
                                        Change Player
                                      </Button>
                                    </Grid>

                                    <Grid item xs={6} container className="">
                                      <Button
                                        variant="contained"
                                        color="primary"
                                        size="medium"
                                        disableElevation
                                        className="font-bold text-white h-full rounded-none rounded-br-lg"
                                        fullWidth
                                        onClick={() =>
                                          setMakeOpponent(!makeOpponent)
                                        }
                                      >
                                        {makeOpponent
                                          ? "Make player"
                                          : " Make opponent"}
                                      </Button>
                                    </Grid>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ) : (
                              <Grid item container className="px-2">
                                <Grid item container alignItems="center">
                                  {/* Search */}
                                  <Grid item xs={2}>
                                    <ArrowBackIcon
                                      onClick={() => {
                                        setChangePlayer(false);
                                        setSearchMainInput("");
                                      }}
                                      fontSize="small"
                                    />
                                  </Grid>
                                  <Grid item xs={10}>
                                    <TextField
                                      id="outlined-basic"
                                      placeholder="Search Players"
                                      value={searchMainInput}
                                      onChange={(event) => {
                                        setSearchMainInput(
                                          v.titleCase(event.target.value)
                                        );
                                      }}
                                      InputProps={{
                                        startAdornment: (
                                          <InputAdornment position="start">
                                            <SearchIcon />
                                          </InputAdornment>
                                        ),
                                      }}
                                    />
                                  </Grid>
                                </Grid>
                                {/* Players list */}
                                <Grid item container>
                                  <List
                                    style={{ width: "100%" }}
                                    className="py-0 max-h-72 overflow-auto"
                                  >
                                    {playersData?.map((player: any) => {
                                      return (
                                        <>
                                          <ListItem
                                            className="py-0 px-1 cursor-pointer hover:bg-yellow-100"
                                            style={{
                                              backgroundColor: `${
                                                player?.remoteId ===
                                                selectedMainPlayer?.remoteId
                                                  ? "#e9decc"
                                                  : ""
                                              }`,
                                            }}
                                            onClick={() => {
                                              setMainPlayer(player);
                                              if (
                                                player.remoteId ===
                                                selectedListPlayer?.remoteId
                                              ) {
                                                setListPlayer(null);
                                              }
                                              setDropdownPlayer(null);
                                              setChangePlayer(false);
                                              setSearchMainInput("");
                                            }}
                                          >
                                            <ListItemAvatar
                                              style={{ minWidth: 0 }}
                                            >
                                              <Avatar
                                                className="h-8 w-8 mr-1"
                                                alt={player?.fullName}
                                                src={player?.photoUrlHiRes}
                                              />
                                            </ListItemAvatar>
                                            <ListItemText
                                              className="text-xs"
                                              primary={player?.fullName}
                                              secondary={
                                                <>
                                                  {`${player?.position}  | ${
                                                    player?.teamName
                                                  } ${
                                                    player?.homeOrAway ===
                                                    "AWAY"
                                                      ? " @ "
                                                      : " vs "
                                                  } ${
                                                    player?.opponentName
                                                      ? player?.opponentName
                                                      : ""
                                                  } `}
                                                  <Typography
                                                    style={{
                                                      display: "inline",
                                                    }}
                                                    component="span"
                                                    className="font-bold"
                                                    variant="body2"
                                                    color="primary"
                                                  >
                                                    |{" "}
                                                    {
                                                      player?.projectedFantasyPointsHalfPpr
                                                    }
                                                  </Typography>
                                                </>
                                              }
                                            />
                                          </ListItem>
                                          <Divider style={{ width: "100%" }} />
                                        </>
                                      );
                                    })}
                                  </List>
                                </Grid>
                              </Grid>
                            )}
                          </Grid>
                        </Grid>
                        {/* Left Tab */}
                        <Grid item xs={12} className="relative">
                          {!changeOpponent ? (
                            <Grid
                              item
                              className="px-2 pt-4"
                              container
                              justify="center"
                              direction="column"
                            >
                              <Grid item className="py-0 xs:py-1.5">
                                <Typography
                                  color="secondary"
                                  className="text-sm xs:text-xs text-gray-500"
                                >
                                  {`CHOOSE ${
                                    makeOpponent ? "A PLAYER" : "AN OPPONENT"
                                  } TO CREATE A CONTEST`}
                                </Typography>
                              </Grid>
                              {/* Opponents */}
                              <Grid
                                item
                                style={{ maxHeight: "35vh", overflow: "auto" }}
                              >
                                {recommendedPlayersData?.recommendations?.map(
                                  (opponent: any) => {
                                    if (
                                      opponent?.fullName !==
                                      selectedMainPlayer?.fullName
                                    ) {
                                      return (
                                        <PlayerListMobile
                                          playerPoint={Number(
                                            selectedMainPlayer?.projectedFantasyPointsHalfPpr
                                          )}
                                          opponentPoint={Number(
                                            opponent?.projectedFantasyPointsHalfPpr
                                          )}
                                          remoteId={opponent?.remoteId}
                                          name={opponent?.fullName}
                                          playerName={
                                            selectedMainPlayer?.fullName
                                          }
                                          position={opponent?.position}
                                          team={opponent?.teamName}
                                          opponent={opponent?.opponentName}
                                          homeOrAway={opponent?.homeOrAway}
                                          image={opponent?.photoUrlHiRes}
                                          playerImage={
                                            selectedMainPlayer?.photoUrlHiRes
                                          }
                                          topPlayerDataTeam={
                                            selectedMainPlayer?.teamName
                                          }
                                          makeOpponent={makeOpponent}
                                          selectedListPlayer={
                                            selectedListPlayer?.remoteId
                                          }
                                          onRowClick={() => {
                                            setListPlayer(opponent);
                                          }}
                                        />
                                      );
                                    }
                                  }
                                )}
                              </Grid>

                              <Grid
                                item
                                xs={12}
                                className="py-2"
                                // className="absolute right-0 left-0 bottom-0 px-2"
                              >
                                <Typography
                                  color="secondary"
                                  className={`text-sm text-gray-500`}
                                >
                                  CREATE YOUR OWN MATCHUP
                                </Typography>
                                {dropdownPlayer ? (
                                  <PlayerListMobile
                                    playerPoint={Number(
                                      selectedMainPlayer?.projectedFantasyPointsHalfPpr
                                    )}
                                    opponentPoint={Number(
                                      dropdownPlayer?.projectedFantasyPointsHalfPpr
                                    )}
                                    remoteId={dropdownPlayer?.remoteId}
                                    name={dropdownPlayer?.fullName}
                                    playerName={selectedMainPlayer?.fullName}
                                    position={dropdownPlayer?.position}
                                    team={dropdownPlayer?.teamName}
                                    opponent={dropdownPlayer?.opponentName}
                                    homeOrAway={dropdownPlayer?.homeOrAway}
                                    image={dropdownPlayer?.photoUrlHiRes}
                                    playerImage={
                                      selectedMainPlayer?.photoUrlHiRes
                                    }
                                    topPlayerDataTeam={
                                      selectedMainPlayer.teamName
                                    }
                                    makeOpponent={makeOpponent}
                                    button={{
                                      text: "Change Player",
                                      callback: () => {
                                        setDropdownPlayer(null);
                                        setListPlayer(null);
                                        setChangeOpponent(true);
                                      },
                                    }}
                                    selectedListPlayer={
                                      selectedListPlayer?.remoteId
                                    }
                                    onRowClick={() => {
                                      setListPlayer(dropdownPlayer);
                                    }}
                                  />
                                ) : (
                                  <Grid
                                    item
                                    container
                                    direction={
                                      makeOpponent ? "row-reverse" : "row"
                                    }
                                    justify="center"
                                    alignItems="center"
                                  >
                                    <Grid item xs={3}></Grid>
                                    <Grid item xs={1}>
                                      <Typography
                                        variant="h6"
                                        className="text-green-900 font-black"
                                        align="center"
                                      >
                                        {" vs "}
                                      </Typography>
                                    </Grid>
                                    <Grid
                                      item
                                      xs={8}
                                      className="cursor-pointer "
                                      onClick={() => setChangeOpponent(true)}
                                    >
                                      <Grid
                                        item
                                        xs={12}
                                        container
                                        direction="row"
                                        alignItems="center"
                                        justify="space-evenly"
                                      >
                                        <Grid item className="mx-0.5">
                                          <SearchIcon className="text-md text-base" />
                                        </Grid>
                                        <Grid item>
                                          <Typography
                                            variant="body1"
                                            className={`uppercase font-bold`}
                                            color="primary"
                                          >
                                            {makeOpponent
                                              ? "Select your player"
                                              : "Select an opponent"}
                                          </Typography>
                                        </Grid>
                                      </Grid>
                                    </Grid>
                                    <Grid item xs={2}></Grid>
                                    <Grid item xs={12}>
                                      <Divider
                                        className="h-0.5"
                                        style={{
                                          backgroundImage:
                                            generateGradientString(
                                              makeOpponent,
                                              selectedMainPlayer?.teamName,
                                              dropdownPlayer
                                                ? dropdownPlayer?.teamName
                                                : null
                                            ),
                                        }}
                                      />
                                    </Grid>
                                  </Grid>
                                )}
                              </Grid>
                            </Grid>
                          ) : (
                            <Grid item container className="px-2">
                              <Grid item container alignItems="center">
                                {/* Search */}
                                <Grid item xs={2}>
                                  <ArrowBackIcon
                                    onClick={() => {
                                      setChangeOpponent(false);
                                      setSearchListInput("");
                                    }}
                                    fontSize="small"
                                  />
                                </Grid>

                                <Grid item xs={10}>
                                  <TextField
                                    id="outlined-basic"
                                    placeholder="Search Players"
                                    value={searchListInput}
                                    autoComplete="off"
                                    onChange={(event) => {
                                      setSearchListInput(
                                        v.titleCase(event.target.value)
                                      );
                                    }}
                                    InputProps={{
                                      startAdornment: (
                                        <InputAdornment position="start">
                                          <SearchIcon />
                                        </InputAdornment>
                                      ),
                                    }}
                                  />
                                </Grid>
                              </Grid>
                              {/* Players list */}
                              <Grid item container>
                                <List
                                  style={{ width: "100%" }}
                                  className="py-0 max-h-72 overflow-auto"
                                >
                                  {opponentsData?.map((opponent: any) => {
                                    if (
                                      opponent.fullName !==
                                      selectedMainPlayer.fullName
                                    ) {
                                      return (
                                        <>
                                          <ListItem
                                            className="py-0 px-1  cursor-pointer hover:bg-yellow-50"
                                            onClick={() => {
                                              setDropdownPlayer(opponent);
                                              setListPlayer(opponent);
                                              setChangeOpponent(false);
                                            }}
                                          >
                                            <ListItemAvatar
                                              style={{ minWidth: 0 }}
                                            >
                                              <Avatar
                                                className="h-8 w-8 mr-1"
                                                alt="Remy Sharp"
                                                src={opponent?.photoUrlHiRes}
                                              />
                                            </ListItemAvatar>
                                            <ListItemText
                                              className="text-xs"
                                              primary={opponent?.fullName}
                                              secondary={
                                                <>
                                                  {`${opponent?.position} | ${
                                                    opponent?.teamName
                                                  }  ${
                                                    opponent?.homeOrAway ===
                                                    "AWAY"
                                                      ? " @ "
                                                      : " vs "
                                                  } ${
                                                    opponent?.opponentName
                                                      ? opponent?.opponentName
                                                      : ""
                                                  } `}
                                                  <Typography
                                                    style={{
                                                      display: "inline",
                                                    }}
                                                    className="font-bold"
                                                    component="span"
                                                    variant="body2"
                                                    color="primary"
                                                  >
                                                    |{" "}
                                                    {
                                                      opponent?.projectedFantasyPointsHalfPpr
                                                    }
                                                  </Typography>
                                                </>
                                              }
                                            />
                                          </ListItem>
                                          <Divider style={{ width: "100%" }} />
                                        </>
                                      );
                                    }
                                  })}
                                </List>
                              </Grid>
                            </Grid>
                          )}
                        </Grid>
                      </Grid>
                      <DialogActions className="px-0">
                        <Grid
                          container
                          item
                          xs={12}
                          direction="row"
                          justify="flex-end"
                        >
                          <Grid item xs={12} sm={12} md={6} lg={4}>
                            <Button
                              className="text-white"
                              fullWidth
                              onClick={() => {
                                let player = { fullName: "", id: 0 };
                                let opponent = { fullName: "", id: 0 };
                                if (makeOpponent) {
                                  player = selectedListPlayer;
                                  opponent = selectedMainPlayer;
                                } else {
                                  player = selectedMainPlayer;
                                  opponent = selectedListPlayer;
                                }
                                setFieldValue("player", player);
                                setFieldValue("opponent", opponent);

                                handleFetchValues({
                                  playerId: player.id,
                                  opponentId: opponent.id,
                                  type: "creator",
                                  entry: Number(values?.entry?.value),
                                });
                                changePage(true);
                              }}
                              variant="contained"
                              color="primary"
                              disabled={
                                !selectedListPlayer ||
                                !selectedMainPlayer ||
                                selectedListPlayer?.remoteId ===
                                  selectedMainPlayer.remoteId
                              }
                            >
                              Create Contest
                            </Button>
                          </Grid>
                        </Grid>
                      </DialogActions>
                    </DialogContent>
                  ) : (
                    // Confirmation Page
                    <Fragment>
                      <DialogContent>
                        <Grid
                          container
                          item
                          direction="column"
                          alignItems="stretch"
                          xs={12}
                        >
                          <Grid
                            item
                            xs={12}
                            container
                            justify="space-between"
                            alignContent="center"
                          >
                            <Grid item xs={5} container justify="center">
                              <Grid
                                item
                                xs={12}
                                lg={8}
                                container
                                justify="center"
                              >
                                <Avatar
                                  variant="square"
                                  alt={
                                    values?.player
                                      ? `${values?.player?.firstName} ${values?.player?.lastName}`
                                      : ""
                                  }
                                  src={
                                    values?.player
                                      ? values?.player.photoUrlHiRes
                                      : ""
                                  }
                                  className={clsx(
                                    "h-24 w-24 md:h-32 md:w-32",
                                    "border-4 rounded-md",
                                    creatorBonusPoints > 0
                                      ? "border-green-800"
                                      : "border-white"
                                  )}
                                />
                                <Grid item xs={12} container justify="center">
                                  <Typography
                                    variant="caption"
                                    component="span"
                                    className={clsx(
                                      "rounded-full p-1 md:p-2 text-white -mb-4",
                                      creatorBonusPoints > 0
                                        ? " bg-green-900"
                                        : "bg-white"
                                    )}
                                  >
                                    {creatorBonusPoints > 0
                                      ? `+${creatorBonusPoints} Bonus Points`
                                      : "."}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid
                              item
                              xs={2}
                              container
                              justify="center"
                              alignContent="center"
                            >
                              <FormikAsyncFieldHandler
                                name="spread"
                                newValue={contestBonusValues?.spread}
                              />
                              <Typography variant="h6" align="center">
                                Vs
                              </Typography>
                            </Grid>

                            <Grid item xs={5} container justify="center">
                              <Grid
                                item
                                xs={12}
                                lg={8}
                                container
                                justify="center"
                              >
                                <Avatar
                                  alt={
                                    values?.opponent
                                      ? `${values?.opponent.firstName} ${values?.opponent.lastName}`
                                      : ""
                                  }
                                  src={
                                    values?.opponent
                                      ? values?.opponent.photoUrlHiRes
                                      : ""
                                  }
                                  className={clsx(
                                    "h-24 w-24 md:h-32 md:w-32",
                                    "border-4 rounded-md mb-2",
                                    claimerBonusPoints > 0
                                      ? "border-green-800"
                                      : "border-white"
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12} container justify="center">
                                <Typography
                                  variant="caption"
                                  component="span"
                                  className={clsx(
                                    "rounded-full py-1 md:py-2 px-2  text-white -mb-4",
                                    claimerBonusPoints > 0
                                      ? " bg-green-900"
                                      : "bg-whiet"
                                  )}
                                >
                                  {claimerBonusPoints > 0
                                    ? `+${claimerBonusPoints} Bonus Points`
                                    : "."}
                                </Typography>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            container
                            justify="space-between"
                            alignContent="center"
                            className="mt-4"
                          >
                            <Grid item xs={5} container justify="center">
                              <Typography
                                variant="h6"
                                align="center"
                                className="w-full"
                              >
                                {values?.player
                                  ? `${values?.player.firstName} ${values?.player.lastName}`
                                  : ""}
                              </Typography>
                              <Typography variant="subtitle2" align="center">
                                {values?.player
                                  ? `${values?.player.position} | ${
                                      values?.player.teamName
                                    } ${
                                      values?.player.homeOrAway === "AWAY"
                                        ? "@"
                                        : "vs"
                                    }
                                    ${
                                      values?.player.opponentName
                                        ? values?.player.opponentName
                                        : ""
                                    }`
                                  : ""}
                              </Typography>
                            </Grid>

                            <Grid
                              item
                              xs={2}
                              container
                              justify="center"
                              alignContent="center"
                            ></Grid>

                            <Grid item xs={5} container justify="center">
                              <Typography
                                variant="h6"
                                align="center"
                                className="w-full"
                              >
                                {values?.opponent
                                  ? `${values?.opponent.firstName} ${values?.opponent.lastName}`
                                  : ""}
                              </Typography>
                              <Typography variant="subtitle2" align="center">
                                {values?.opponent
                                  ? `${values?.opponent.position} | ${
                                      values?.opponent.teamName
                                    } ${
                                      values?.opponent.homeOrAway === "AWAY"
                                        ? "@"
                                        : "vs"
                                    }
                                    ${
                                      values?.opponent.opponentName
                                        ? values?.opponent.opponentName
                                        : ""
                                    }`
                                  : ""}
                              </Typography>
                            </Grid>
                            <Grid item xs={12} container className="my-2">
                              <Grid
                                item
                                xs={12}
                                sm={12}
                                md={12}
                                lg={12}
                                className="pr-1"
                              >
                                <Typography>Entry</Typography>
                                <Select
                                  className=""
                                  isSearchable
                                  placeholder="Select Entry Amount..."
                                  value={values.entry}
                                  name="entry"
                                  menuPortalTarget={document.body}
                                  styles={{
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                    singleValue: (base) => ({
                                      ...base,
                                      width: "100%",
                                    }),
                                  }}
                                  options={entryAmountDropdownOptions}
                                  onChange={(selectedEntryAmount) => {
                                    setFieldValue("entry", selectedEntryAmount);
                                    let player = { fullName: "", id: 0 };
                                    let opponent = { fullName: "", id: 0 };
                                    if (makeOpponent) {
                                      player = selectedListPlayer;
                                      opponent = selectedMainPlayer;
                                    } else {
                                      player = selectedMainPlayer;
                                      opponent = selectedListPlayer;
                                    }
                                    handleFetchValues({
                                      playerId: player.id,
                                      opponentId: opponent.id,
                                      type: "creator",
                                      entry: Number(selectedEntryAmount?.value),
                                    });
                                  }}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </DialogContent>
                      <DialogActions>
                        <Grid container justify="space-between">
                          <Grid
                            item
                            xs={12}
                            md={6}
                            container
                            alignContent="center"
                          >
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
                                    className="font-bold"
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
                                  <FormikAsyncFieldHandler
                                    name="maxWin"
                                    newValue={(
                                      values.cover + values.winBonus
                                    ).toFixed(2)}
                                  />
                                  <FormikAsyncFieldHandler
                                    name="cover"
                                    newValue={contestBonusValues?.cover}
                                  />
                                  <FormikAsyncFieldHandler
                                    name="winBonus"
                                    newValue={contestBonusValues?.winBonus}
                                  />
                                  <Typography
                                    variant="body1"
                                    component="span"
                                    className="font-bold pb-4 md:pb-0"
                                  >
                                    {renderCurrency(c2d(values.maxWin) || 0)}
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
                            spacing={1}
                          >
                            <Grid item xs={3} sm={3} md={4} lg={4}>
                              <Button
                                color="secondary"
                                variant="outlined"
                                onClick={() => changePage(false)}
                                disabled={
                                  selectedMainPlayer === null ||
                                  selectedListPlayer === null
                                }
                                fullWidth={isSmall}
                              >
                                Back
                              </Button>
                            </Grid>
                            <Grid item xs={9} sm={9} md={8} lg={8}>
                              <Button
                                onClick={() => {
                                  handleSubmit();
                                }}
                                fullWidth
                                className="text-white"
                                disabled={contestBonusValues === undefined}
                                variant="contained"
                                color="primary"
                              >
                                Confirm
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>
                      </DialogActions>
                    </Fragment>
                  )}
                </Dialog>
              </Hidden>
            </Fragment>
          </form>
        );
      }}
    </Formik>
  );
};

export default CreateBattleGroundContestModal;
