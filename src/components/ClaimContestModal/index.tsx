import React, { Fragment, useEffect } from "react";
import { Formik, Field, FormikProps } from "formik";
import { useSnackbar } from "notistack";
import clsx from "classnames";
import { useHistory } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";

import useStyles from "./styles";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import { TextField, CheckboxWithLabel } from "formik-material-ui";

import DialogTitle from "../DialogTitle";
import { selectSelectedContest } from "../../redux/selectors/contests";
import { doAsyncClaimContest } from "../../redux/thunks/contests";

import { ClaimContestModalProps, ClaimContestForm } from "./interfaces";

import { renderCurrency } from "../../helpers/currency";
import { fetchAsyncWalletFunds } from "../../redux/thunks/wallet";
import { selectUserData } from "../../redux/selectors/authentication";
import { c2d } from "../../helpers/currency";
import routes from "../../constants/routes";

const ClaimContestModal = (props: ClaimContestModalProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const contestData = useAppSelector(selectSelectedContest);
  const userData = useAppSelector(selectUserData);

  const { open, handleClose, changeTabs } = props;

  const classes = useStyles();

  let history = useHistory();

  return (
    <Formik
      initialValues={{
        player: contestData ? contestData.claimerPlayer : "",
        opponent: contestData ? contestData.creatorPlayer : "",
        toWin: contestData ? contestData.claimerPlayerWinBonus : 0,
        winBonus: contestData ? contestData.claimerPlayerMaxWin !== 0 : false,
        coverSpread: true,
        entry: contestData ? contestData.entryAmount : 0,
        maxWin: contestData ? contestData.claimerPlayerMaxWin : 0,
        spread: contestData ? contestData.claimerPlayerSpread : 0,
        cover: contestData ? contestData.claimerPlayerCover : 0,
      }}
      enableReinitialize
      // validationSchema={createContestSchema}
      onSubmit={(values: ClaimContestForm, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const contestId = contestData.id;
        // handleLoginAttempt(values);
        dispatch(doAsyncClaimContest(contestId)).then((response) => {
          if (response.type == "contests/claim/contest/fulfilled") {
            handleClose(false);
            dispatch(fetchAsyncWalletFunds({ userId: userData.id }));
            enqueueSnackbar("Successfully claimed contest", {
              variant: "success",
            });
            changeTabs("openContests");
          }
        });
        resetForm();
      }}
    >
      {({ values, handleSubmit }: FormikProps<ClaimContestForm>) => {
        const claimerBonusPoints = Number(values?.spread);
        const creatorBonusPoints = -Number(values?.spread);

        return (
          <form>
            <Dialog
              open={open}
              onClose={() => handleClose(false)}
              fullWidth
              maxWidth="sm"
              scroll="body"
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle onClose={() => handleClose(false)}>
                Claim a Contest
              </DialogTitle>
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
                      className="mb-4"
                    >
                      <Grid item xs={5} container justify="center">
                        <Grid item xs={12} lg={8} container justify="center">
                          <Avatar
                            variant="square"
                            alt={values.player ? values.player.fullName : ""}
                            src={
                              values.player ? values.player.photoUrlHiRes : ""
                            }
                            className={clsx(
                              "h-24 w-24 md:h-32 md:w-32",
                              "border-4 rounded-md",
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
                                "rounded-full p-1 md:p-2 text-white -mb-2",
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
                        xs={2}
                        container
                        justify="center"
                        alignContent="center"
                      >
                        <Typography variant="h6" align="center">
                          Vs
                        </Typography>
                      </Grid>

                      <Grid item xs={5} container justify="center">
                        <Grid item xs={12} lg={8} container justify="center">
                          <Avatar
                            alt={
                              values.opponent ? values.opponent.fullName : ""
                            }
                            src={
                              values.opponent
                                ? values.opponent.photoUrlHiRes
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
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      container
                      justify="space-between"
                      alignContent="center"
                    >
                      <Grid item xs={5} container justify="center">
                        <Typography
                          variant="h6"
                          align="center"
                          className="w-full"
                        >
                          {values.player ? values.player.fullName : ""}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          align="center"
                          className="w-full"
                        >
                          {values.player
                            ? `${values.player.position} | ${
                                values.player.teamName
                              } ${
                                values.player.homeOrAway === "AWAY"
                                  ? " @ "
                                  : " vs "
                              } 
                          ${
                            values.player.opponentName
                              ? values.player.opponentName
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
                          {values.opponent ? values.opponent.fullName : ""}
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          align="center"
                          className="w-full"
                        >
                          {values.opponent
                            ? `${values.opponent.position} | ${
                                values.opponent.teamName
                              } ${
                                values.opponent.homeOrAway === "AWAY"
                                  ? " @ "
                                  : " vs "
                              } ${
                                values.opponent.opponentName
                                  ? values.opponent.opponentName
                                  : ""
                              }`
                            : ""}
                        </Typography>
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
                              {renderCurrency(c2d(values.entry) || 0)}
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
                      <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Button
                          onClick={() => {
                            handleSubmit();
                            // closeClaimContestModal();
                          }}
                          className="text-white"
                          fullWidth
                          disabled={values.coverSpread === false}
                          variant="contained"
                          color="primary"
                        >
                          Match
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Fragment>
            </Dialog>
          </form>
        );
      }}
    </Formik>
  );
};
export default ClaimContestModal;
