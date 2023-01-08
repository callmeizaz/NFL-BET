import React, { Fragment, useEffect } from "react";
import { Formik, Field, FormikProps } from "formik";
import moment from "moment";
import clsx from "classnames";
import { useSnackbar } from "notistack";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import DialogTitle from "@material-ui/core/DialogTitle";
import InputAdornment from "@material-ui/core/InputAdornment";
import Avatar from "@material-ui/core/Avatar";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import { TextField, CheckboxWithLabel } from "formik-material-ui";

import DialogTitle from "../DialogTitle";
import { selectSelectedContest } from "../../redux/selectors/contests";
import { doAsyncClaimContest } from "../../redux/thunks/contests";

import { ShareContestModalProps, ClaimContestForm } from "./interfaces";

import { renderCurrency, c2d } from "../../helpers/currency";
import { contest } from "../../constants/mocked/publicContest";

const ShareContestModal = (props: ShareContestModalProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const contestData = useAppSelector(selectSelectedContest);
  const { open, handleClose, userId } = props;

  const getWin = (winnerId: number | null, userId: number) => {
    let status = "N.A";
    if (winnerId === userId) {
      status = "Win";
    } else {
      status = "Lose";
    }

    if (winnerId === null) {
      status = "Draw";
    }
    return status;
  };

  return (
    <Formik
      initialValues={{
        player: contestData ? contestData?.myPlayer : "",
        opponent: contestData ? contestData?.theirPlayer : "",
        toWin: contestData ? contestData?.myPlayerWinBonus : 0,
        winBonus: contestData ? contestData?.myPlayerMaxWin !== 0 : false,
        coverSpread: true,
        entry: contestData ? contestData?.entryAmount : 0,
        maxWin: contestData ? contestData?.myPlayerMaxWin : 0,
        spread: contestData ? contestData?.myPlayerSpread : 0,
        cover: contestData ? contestData?.myPlayerCover : 0,
      }}
      enableReinitialize
      // validationSchema={createContestSchema}
      onSubmit={(values: ClaimContestForm, { setSubmitting, resetForm }) => {
        setSubmitting(true);
        const contestId = contestData?.id;
        // handleLoginAttempt(values);

        resetForm();
      }}
    >
      {({
        values,
        handleSubmit,
        setFieldValue,
        resetForm,
      }: FormikProps<ClaimContestForm>) => {
        const winBonusAmount = (values.spread * 15) / 100;

        const closeClaimContestModal = () => {
          // handleSubmit();
          // resetForm();
          handleClose(false);
          // enqueueSnackbar("Successfully claimed contest", {
          //   variant: "success",
          // });
        };

        const contestDetails = [];

        const iAmClaimer = userId === contestData?.claimerId;
        if (contestData?.ended) {
          contestDetails.push({
            label: "Date",
            value: moment(contestData?.endedAt).format("MM/DD/YYYY"),
          });
        }

        // contestDetails.push({
        //   label: "Spread",
        //   value: contestData?.myPlayerSpread,
        // });

        // contestDetails.push({
        //   label: "Cover Spread",
        //   value: renderCurrency(Number(values.cover)),
        // });
        contestDetails.push({
          label: "Status",
          value: iAmClaimer ? "Matched" : "Created",
        });

        if (!contestData?.ended) {
          contestDetails.push({
            label: "Type",
            value: contestData?.type,
          });
        }

        if (contestData?.ended) {
          contestDetails.push({
            label: "Win/Lose/Draw",
            value: getWin(contestData?.winnerId, userId),
          });

          contestDetails.push({
            label: "Net",
            value: (
              Math.round(c2d(contestData?.myPlayerWinAmount) * 100) / 100
            ).toFixed(2),
          });
        }

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
                Contest Details
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
                      className="pb-4"
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
                              "border-4 rounded-md mb-2",
                              Number(contestData?.myPlayerSpread) > 0
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
                              Number(contestData?.myPlayerSpread) > 0
                                ? " bg-green-900"
                                : "bg-white"
                            )}
                          >
                            {Number(contestData?.myPlayerSpread) > 0
                              ? `+${Number(
                                  contestData?.myPlayerSpread
                                )} Bonus Points`
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
                        <Typography variant="h4" align="center">
                          VS
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
                              "border-4 rounded-md mb-2",
                              Number(contestData?.theirPlayerSpread) > 0
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
                              Number(contestData?.theirPlayerSpread) > 0
                                ? " bg-green-900"
                                : "bg-whiet"
                            )}
                          >
                            {Number(contestData?.theirPlayerSpread) > 0
                              ? `+${Number(
                                  contestData?.theirPlayerSpread
                                )} Bonus Points`
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
                                values.player.homeOrAway === "AWAY" ? "@" : "vs"
                              } ${
                                values.player.opponentName
                                  ? values.player.opponentName
                                  : ""
                              }`
                            : ""}
                        </Typography>
                        {contestData?.ended ? (
                          <Typography
                            variant="h6"
                            align="center"
                            className="w-full"
                          >
                            Points:{" "}
                            {contestData.creatorPlayerId == values.player?.id
                              ? contestData.creatorPlayerFantasyPoints ?? 0
                              : contestData.claimerPlayerFantasyPoints ?? 0}
                          </Typography>
                        ) : (
                          <Typography
                            variant="h6"
                            align="center"
                            className="w-full"
                          ></Typography>
                        )}
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
                                  ? "@"
                                  : "vs"
                              } ${
                                values.opponent.opponentName
                                  ? values.opponent.opponentName
                                  : ""
                              }`
                            : ""}
                        </Typography>
                        {contestData?.ended ? (
                          <Typography
                            variant="h6"
                            align="center"
                            className="w-full"
                          >
                            Points:{" "}
                            {contestData.creatorPlayerId == values.opponent?.id
                              ? contestData.creatorPlayerFantasyPoints ?? 0
                              : contestData.claimerPlayerFantasyPoints ?? 0}
                          </Typography>
                        ) : (
                          <Typography
                            variant="h6"
                            align="center"
                            className="w-full"
                          ></Typography>
                        )}
                      </Grid>
                      <Grid item className="mt-4" />
                      {contestDetails.map((detail) => {
                        return (
                          <Grid
                            item
                            xs={12}
                            container
                            justify="space-between"
                            alignContent="center"
                          >
                            <Grid
                              item
                              xs={6}
                              md={8}
                              container
                              direction="column"
                              justify="center"
                            >
                              <Typography align="left">
                                {detail.label}
                              </Typography>
                            </Grid>
                            <Grid
                              item
                              xs={6}
                              lg={4}
                              container
                              direction="column"
                              justify="center"
                            >
                              <Typography variant="h6" align="right">
                                {detail.value}
                              </Typography>
                            </Grid>
                          </Grid>
                        );
                      })}
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
                          onClick={() => handleClose(false)}
                          fullWidth
                          variant="outlined"
                          color="primary"
                        >
                          Close
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
export default ShareContestModal;
