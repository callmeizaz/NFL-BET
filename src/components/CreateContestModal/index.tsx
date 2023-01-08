import React, { Fragment, useEffect, useState } from "react";
import { Formik, Field, FormikProps } from "formik";
import clsx from "clsx";
import { useHistory } from "react-router-dom";
import v from "voca";
import { useDebounce } from "use-debounce";
import { useSnackbar } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Select from "react-select";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";
import FormHelperText from "@material-ui/core/FormHelperText";

import ReactSelectPlayerOption from "../ReactSelectPlayerOption";
import ReactSelectSingleValue from "../ReactSelectSingleValue";
import FormikAsyncFieldHandler from "../FormikAsyncFieldHandler";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import { TextField, CheckboxWithLabel } from "formik-material-ui";

import DialogTitle from "../DialogTitle";

import { d2c, renderCurrency } from "../../helpers/currency";

import createContestSchema from "../../constants/schemas/createContest";
import {
  PLAYER_POSITIONS,
  LOBBY_SPREAD_LIMIT,
  BET_AMOUNTS,
} from "../../constants/config";
import {
  fetchAsyncPlayers,
  fetchAsyncOpponents,
} from "../../redux/thunks/players";

import {
  fetchAsyncContestValues,
  doAsyncCreateContest,
} from "../../redux/thunks/contests";

import {
  resetPlayerData,
  resetOpponentData,
} from "../../redux/reducers/playersSlice";

import {
  selectPlayersData,
  selectOpponentData,
} from "../../redux/selectors/players";

import { selectContestValues } from "../../redux/selectors/contests";

import {
  CreateContestModalProps,
  CreateContestForm,
  ContestValuesPayloadInterface,
} from "./interfaces";

import { PlayerData } from "../../typings/interfaces/players";

import routes from "../../constants/routes";
import { fetchAsyncWalletFunds } from "../../redux/thunks/wallet";
import {
  selectUserData,
  selectConfig,
} from "../../redux/selectors/authentication";

import { c2d } from "../../helpers/currency";

const CreateContestModal = (props: CreateContestModalProps) => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  let history = useHistory();
  const { open, handleClose, changeTabs } = props;

  const [playerInput, setPlayerInput] = useState("");
  const [opponentInput, setOpponentInput] = useState("");

  const [playerQueryText] = useDebounce(playerInput, 300);
  const [opponentQueryText] = useDebounce(opponentInput, 300);

  const [playerFantasyPoints, setPlayerFantasyPoints] = useState(0);
  const [playerId, setPlayerId] = useState(0);
  const [nextButtonDisabled, setNextButtonDisabled] = useState(true);
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const playersData = useAppSelector(selectPlayersData);
  const opponentsData = useAppSelector(selectOpponentData);
  const contestValues = useAppSelector(selectContestValues);
  const userData = useAppSelector(selectUserData);
  const config = useAppSelector(selectConfig);

  const playerDropdownOptions = playersData?.map((player: PlayerData) => {
    return {
      label: `${player.firstName} ${player.lastName}`,
      value: player,
    };
  });

  const opponentDropdownOptions = opponentsData?.map((opponent: PlayerData) => {
    return {
      label: `${opponent.firstName} ${opponent.lastName}`,
      value: opponent,
    };
  });

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

  useEffect(() => {
    if (playerQueryText !== "") {
      dispatch(
        fetchAsyncPlayers({
          filter: {
            where: {
              or: [
                { firstName: { like: `%${playerQueryText}%` } },
                { lastName: { like: `%${playerQueryText}%` } },
                { fullName: { like: `%${playerQueryText}%` } },
              ],
              hasStarted: false,
              isOver: false,
              position: { inq: PLAYER_POSITIONS },
              available: true,
              status: "Active",
            },
            order: "projectedFantasyPoints DESC",
            include: [
              {
                relation: "team",
              },
            ],
          },
        })
      );
    }
  }, [dispatch, playerQueryText]);

  useEffect(() => {
    if (playerQueryText === "") {
      dispatch(resetPlayerData());
    }
  }, [dispatch, playerQueryText]);

  useEffect(() => {
    if (opponentQueryText !== "") {
      dispatch(
        fetchAsyncOpponents({
          filter: {
            where: {
              or: [
                { firstName: { like: `%${opponentQueryText}%` } },
                { lastName: { like: `%${opponentQueryText}%` } },
                { fullName: { like: `%${playerQueryText}%` } },
              ],
              hasStarted: false,
              isOver: false,
              position: { inq: PLAYER_POSITIONS },
              id: { neq: playerId },
              projectedFantasyPoints: {
                between: [
                  playerFantasyPoints - LOBBY_SPREAD_LIMIT,
                  playerFantasyPoints + LOBBY_SPREAD_LIMIT,
                ],
              },
              available: true,
              status: "Active",
            },
            order: "projectedFantasyPoints DESC",
            include: [
              {
                relation: "team",
              },
            ],
          },
        })
      );
    }
  }, [dispatch, opponentQueryText]);

  useEffect(() => {
    if (opponentQueryText === "") {
      dispatch(resetOpponentData());
    }
  }, [dispatch, opponentQueryText]);

  const handleFetchValues = (payload: ContestValuesPayloadInterface) => {
    // setNextButtonDisabled(true);
    // const { entry, opponentId, type } = payload;
    // console.log(entry);
    // console.log(payload);
    // let promise = null;
    // if (type === "creator" && entry && opponentId) {
    //   const data = {
    //     creatorPlayerId: playerId,
    //     claimerPlayerId: opponentId,
    //     entryAmount: Number(entry ? entry : 0),
    //   };
    //   promise = dispatch(fetchAsyncContestValues(data));
    //   console.log(promise);
    // }
  };

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

        const payload = {
          creatorPlayerId: !!player ? player.value.id : player,
          claimerPlayerId: !!opponent ? opponent.value.id : opponent,
          entryAmount: Number(entry ? entry.value : 0),
          winBonus: winBonusFlag,
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
        resetForm,
        handleChange,
      }: FormikProps<CreateContestForm>) => {
        const changePage = (value: boolean) => {
          setFieldValue("nextScreen", value);
        };

        const creatorBonusPoints = values?.spread;
        const claimerBonusPoints = -Number(values?.spread);

        const contestBonusValues = contestValues.withoutWinBonus;

        const handleEntryBlur = (player: any, type: string) => {
          // if (player !== null && opponent !== null && entry !== null) {
          //   // const payload = {
          //   //   playerId: player.value.id,
          //   //   opponentId: opponent.value.id,
          //   //   type: "creator",
          //   //   entry: Number(entry.value),
          //   // };

          //   // handleFetchValues(payload);

          // }

          setNextButtonDisabled(true);
          let promise = null;
          const { entry } = values;
          if (type === "creator" && values.opponent && values.entry) {
            const payload = {
              playerId: player.value.id,
              opponentId: values.opponent.value.id,
              entry: Number(entry ? entry.value : 0),
            };
            promise = dispatch(fetchAsyncContestValues(payload));
          }
          if (type === "claimer" && values.player && values.entry) {
            const payload = {
              playerId: values.player.value.id,
              opponentId: player.value.id,
              entry: Number(entry ? entry.value : 0),
            };
            promise = dispatch(fetchAsyncContestValues(payload));
          }
          if (values.player && values.opponent && type === "entry") {
            const payload = {
              playerId: values.player.value.id,
              opponentId: values.opponent.value.id,
              entry: Number(player ? player.value : 0),
            };

            promise = dispatch(fetchAsyncContestValues(payload));
          }

          if (promise) {
            promise.then((response) => {
              if (response.type == "contests/values/fetch/fulfilled") {
                setNextButtonDisabled(false);
              }
            });
          }
        };

        return (
          <form>
            <Dialog
              open={open}
              onClose={() => handleClose(false)}
              fullWidth
              maxWidth="sm"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle onClose={() => handleClose(false)}>
                Create a Contest
              </DialogTitle>
              {values.nextScreen === false ? (
                <Fragment>
                  <DialogContent>
                    <Grid
                      container
                      item
                      direction="column"
                      alignItems="stretch"
                      xs={12}
                    >
                      <Grid item xs={12} className="my-2">
                        <Typography>Select your Player</Typography>
                        <Select
                          className=""
                          isClearable
                          isSearchable
                          placeholder="Search..."
                          inputValue={playerInput}
                          onInputChange={(value: string) => {
                            setPlayerInput(v.titleCase(value));
                          }}
                          noOptionsMessage={() => {
                            return playerInput === ""
                              ? "Please start typing players name"
                              : "No Options";
                          }}
                          components={{
                            Option: ReactSelectPlayerOption,
                            SingleValue: ReactSelectSingleValue,
                          }}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            singleValue: (base) => ({ ...base, width: "100%" }),
                          }}
                          value={values.player}
                          name="player"
                          menuPortalTarget={document.body}
                          options={playerDropdownOptions}
                          onChange={(selectedPlayer) => {
                            setFieldValue("player", selectedPlayer);
                            setFieldValue("opponent", null);
                            setPlayerId(
                              selectedPlayer ? selectedPlayer.value.id : 0
                            );
                            handleEntryBlur(selectedPlayer, "creator");
                            setPlayerFantasyPoints(
                              selectedPlayer
                                ? parseFloat(
                                    selectedPlayer.value.projectedFantasyPoints
                                  )
                                : 0
                            );
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} className="my-2">
                        <Typography>Select your Opponent</Typography>
                        <Select
                          className=""
                          isClearable
                          isSearchable
                          isDisabled={values.player === null}
                          placeholder="Search..."
                          inputValue={opponentInput}
                          onInputChange={(value: string) => {
                            setOpponentInput(v.titleCase(value));
                          }}
                          noOptionsMessage={() => {
                            return opponentInput === ""
                              ? "Please start typing players name"
                              : "No Options";
                          }}
                          components={{
                            Option: ReactSelectPlayerOption,
                            SingleValue: ReactSelectSingleValue,
                          }}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            singleValue: (base) => ({ ...base, width: "100%" }),
                          }}
                          value={values.opponent}
                          name="opponent"
                          menuPortalTarget={document.body}
                          options={opponentDropdownOptions}
                          onChange={(selectedOpponent) => {
                            setFieldValue("opponent", selectedOpponent);
                            handleEntryBlur(selectedOpponent, "claimer");
                          }}
                        />
                        {values.player === null || (
                          <FormHelperText id="standard-weight-helper-text">
                            Only opponents within a +/- {LOBBY_SPREAD_LIMIT}{" "}
                            projected FP score will be displayed
                          </FormHelperText>
                        )}
                      </Grid>
                      <Grid item xs={12} className="my-2">
                        <Typography>Entry</Typography>
                        <Select
                          className=""
                          isClearable
                          isSearchable
                          placeholder="Select Entry Amount..."
                          value={values.entry}
                          name="entry"
                          menuPortalTarget={document.body}
                          styles={{
                            menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                            singleValue: (base) => ({ ...base, width: "100%" }),
                          }}
                          options={entryAmountDropdownOptions}
                          onChange={(selectedEntryAmount) => {
                            setFieldValue("entry", selectedEntryAmount);
                            handleEntryBlur(selectedEntryAmount, "entry");
                          }}
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <Field
                          component={CheckboxWithLabel}
                          type="checkbox"
                          color="primary"
                          onChange={handleChange}
                          name="winBonusFlag"
                          Label={{ label: "Win Bonus" }}
                        />
                      </Grid> */}
                    </Grid>
                  </DialogContent>
                  <DialogActions>
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
                          onClick={() => changePage(true)}
                          disabled={
                            values.player === null ||
                            values.opponent === null ||
                            values.entry === null ||
                            nextButtonDisabled
                          }
                          variant="contained"
                          color="primary"
                        >
                          Next
                        </Button>
                      </Grid>
                    </Grid>
                  </DialogActions>
                </Fragment>
              ) : (
                // Confirmation Page
                <Fragment>
                  <DialogContent>
                    <Grid
                      container
                      item
                      direction="column"
                      alignItems="stretch"
                      xs={10}
                    >
                      <Grid
                        item
                        xs={12}
                        container
                        justify="space-between"
                        alignContent="center"
                      >
                        <Grid item xs={5} lg={5} container justify="center">
                          <Grid item xs={12} lg={8} container justify="center">
                            <Avatar
                              variant="square"
                              alt={
                                values.player
                                  ? `${values.player.value.firstName} ${values.player.value.lastName}`
                                  : ""
                              }
                              src={
                                values.player
                                  ? values.player.value.photoUrlHiRes
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
                                    : "bg-whiet"
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
                          lg={2}
                          container
                          justify="center"
                          alignContent="center"
                        >
                          <Grid
                            item
                            xs={2}
                            container
                            justify="center"
                            alignContent="center"
                          >
                            <FormikAsyncFieldHandler
                              name="spread"
                              newValue={contestBonusValues.spread}
                            />
                            <Typography variant="h6" align="center">
                              Vs
                            </Typography>
                          </Grid>
                        </Grid>

                        <Grid item xs={5} lg={5} container justify="center">
                          <Grid item xs={12} lg={8} container justify="center">
                            <Avatar
                              variant="square"
                              alt={
                                values.opponent
                                  ? `${values.opponent.value.firstName} ${values.opponent.value.lastName}`
                                  : ""
                              }
                              src={
                                values.opponent
                                  ? values.opponent.value.photoUrlHiRes
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
                            {values.player
                              ? `${values.player.value.firstName} ${values.player.value.lastName}`
                              : ""}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            {values.player
                              ? `${values.player.value.position} | ${
                                  values.player.value.teamName
                                } | ${
                                  values.player.value.homeOrAway === "AWAY"
                                    ? "@"
                                    : ""
                                }
                              ${
                                values.player.value.opponentName
                                  ? values.player.value.opponentName
                                  : ""
                              }`
                              : ""}
                          </Typography>
                        </Grid>

                        <Grid item xs={2}></Grid>

                        <Grid item xs={5} container justify="center">
                          <Typography
                            variant="h6"
                            align="center"
                            className="w-full"
                          >
                            {values.opponent
                              ? `${values.opponent.value.firstName} ${values.opponent.value.lastName}`
                              : ""}
                          </Typography>
                          <Typography variant="subtitle2" align="center">
                            {values.opponent
                              ? `${values.opponent.value.position} | ${
                                  values.opponent.value.teamName
                                } | ${
                                  values.opponent.value.homeOrAway === "AWAY"
                                    ? "@"
                                    : ""
                                }
                              ${
                                values.opponent.value.opponentName
                                  ? values.opponent.value.opponentName
                                  : ""
                              }`
                              : ""}
                          </Typography>
                        </Grid>
                        <Grid
                          item
                          xs={12}
                          container
                          justify="space-between"
                          alignContent="center"
                        >
                          <Field
                            component={CheckboxWithLabel}
                            type="checkbox"
                            color="primary"
                            name="coverFlag"
                            Label={{ label: "Cover Spread" }}
                          />
                          <Grid
                            item
                            xs={2}
                            container
                            direction="column"
                            justify="center"
                          >
                            <FormikAsyncFieldHandler
                              name="cover"
                              newValue={contestBonusValues.cover}
                            />
                            <Typography variant="h6" align="right">
                              {renderCurrency(values.cover)}
                            </Typography>
                          </Grid>
                        </Grid>
                        {/* <Grid
                          item
                          xs={12}
                          container
                          justify="space-between"
                          alignContent="center"
                        >
                          <Field
                            component={CheckboxWithLabel}
                            type="checkbox"
                            color="primary"
                            name="winBonusFlag"
                            Label={{ label: "Win Bonus" }}
                          />
                          <Grid
                            item
                            xs={2}
                            container
                            direction="column"
                            justify="center"
                          >
                            <FormikAsyncFieldHandler
                              name="winBonus"
                              newValue={contestBonusValues.winBonus}
                            />
                            <Typography variant="h6" align="right">
                              {renderCurrency(values.winBonus)}
                            </Typography>
                          </Grid>
                        </Grid> */}
                        <Grid item xs={12} container className="my-2">
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            className="pr-1"
                          >
                            <Typography>Entry</Typography>
                            <Field
                              component={TextField}
                              size="small"
                              variant="outlined"
                              name="entry"
                              value={(values.entry
                                ? values.entry.value
                                : 0
                              ).toFixed(2)}
                              type="text"
                              fullWidth
                              className="bg-gray-200"
                              disabled
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                                inputProps: {
                                  readOnly: true,
                                },
                              }}
                            />
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={12}
                            lg={6}
                            className="pl-1"
                          >
                            <Typography>Win</Typography>
                            <FormikAsyncFieldHandler
                              name="maxWin"
                              newValue={(
                                values.cover + values.winBonus
                              ).toFixed(2)}
                            />
                            <Field
                              component={TextField}
                              size="small"
                              variant="outlined"
                              name="maxWin"
                              type="text"
                              value={Math.round(
                                c2d(values.maxWin) * 100
                              ).toFixed(2)}
                              fullWidth
                              className="bg-gray-200"
                              disabled
                              InputProps={{
                                startAdornment: (
                                  <InputAdornment position="start">
                                    $
                                  </InputAdornment>
                                ),
                                inputProps: {
                                  min: 0,
                                  readOnly: true,
                                },
                              }}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
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
                                className="font-black"
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
                                newValue={contestBonusValues.cover}
                              />
                              <FormikAsyncFieldHandler
                                name="winBonus"
                                newValue={contestBonusValues.winBonus}
                              />
                              <Typography
                                variant="body1"
                                component="span"
                                className="font-black pb-4 md:pb-0"
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
                            onClick={() => changePage(false)}
                            disabled={
                              values.player === null || values.opponent === null
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
                            disabled={values.coverFlag === false}
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
          </form>
        );
      }}
    </Formik>
  );
};
export default CreateContestModal;
