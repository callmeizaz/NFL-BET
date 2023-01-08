import clsx from "classnames";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";

import { ContestsPayload } from "./interfaces";

import { renderCurrency, c2d } from "../../helpers/currency";

import useStyles from "./styles";
import { useAppSelector } from "../../redux/store";
import { selectUserData } from "../../redux/selectors/authentication";
import {
  selectContestsData,
  selectPublicContestsData,
} from "../../redux/selectors/contests";
import ContestCard from "../ContestCard";
import React from "react";
import { Redirect, useHistory } from "react-router-dom";

const PublicContestCard = ({
  contestData,
  handleContestClaimClick,
}: ContestsPayload) => {
  const { creatorPlayer, claimerPlayer } = contestData;
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const classes = useStyles();
  const userData = useAppSelector(selectUserData);
  const publicContestsData = useAppSelector(selectPublicContestsData);

  let history = useHistory();

  const redirect = () => {
    history.push("/login");
  };

  return (
    <Grid item xs={12} className="m-auto">
      <Card
        className={clsx("rounded-lg", classes.contestWrapper)}
        elevation={2}
      >
        <Grid
          container
          item
          direction="column"
          alignItems="stretch"
          spacing={2}
          xs={12}
          className="px-4 py-2"
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
                alt={claimerPlayer?.fullName}
                src={claimerPlayer?.photoUrl}
                className="h-24 w-24 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
              />
              <Typography variant="body1" align="center" className="w-full">
                {claimerPlayer?.fullName}
              </Typography>
              <Typography variant="caption" align="center">
                {`${claimerPlayer?.position} | ${claimerPlayer?.teamName}`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={2}
              container
              direction="column"
              justify="flex-start"
              alignContent="center"
            >
              <Grid item xs={3} container justify="center">
                <Divider orientation="vertical" className="bg-gray-500" />
              </Grid>

              <Grid
                item
                xs={3}
                container
                justify="center"
                alignContent="center"
                className="w-full text-green-900"
              >
                <Typography className="font-bold" align="center">
                  VS
                </Typography>
              </Grid>
              <Grid item xs={3} container justify="center">
                <Divider orientation="vertical" className="bg-gray-500" />
              </Grid>
            </Grid>

            <Grid item xs={5} container justify="center">
              <Avatar
                alt={creatorPlayer?.photoUrl}
                src={creatorPlayer?.photoUrl}
                className="h-24 w-24 sm:h-24 sm:w-24 md:h-32 md:w-32 rounded-xl"
              />
              <Typography variant="body1" align="center" className="w-full">
                {creatorPlayer?.fullName}
              </Typography>
              <Typography variant="caption" align="center">
                {`${creatorPlayer?.position} | ${creatorPlayer?.teamName}`}
              </Typography>
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
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="left"
                  className="w-full text-gray-400"
                >
                  Matchup
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="right"
                  className="w-full"
                >
                  {claimerPlayer?.homeOrAway === "AWAY" && "@"}
                  {claimerPlayer?.opponentName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="left"
                  className="w-full text-gray-400"
                >
                  Spread
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="right"
                  className="w-full"
                >
                  {contestData.claimerPlayerSpread}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={1} />

            <Grid item xs={5} container justify="center">
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="left"
                  className="w-full text-gray-400"
                >
                  Matchup
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="right"
                  className="w-full"
                >
                  {creatorPlayer?.homeOrAway === "AWAY" && "@"}
                  {creatorPlayer?.opponentName}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="left"
                  className="w-full text-gray-400"
                >
                  Spread
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="right"
                  className="w-full"
                >
                  {contestData.creatorPlayerSpread}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider className="bg-gray-300" />
        <Grid container justify="space-between" className="px-4 py-2">
          <Grid
            item
            xs={12}
            container
            justify="space-between"
            alignContent="center"
          >
            <Grid item xs={5} container justify="center">
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="left"
                  className="w-full text-gray-400"
                >
                  Entry
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="right"
                  className="w-full"
                >
                  {renderCurrency(c2d(Number(contestData.entryAmount)))}
                </Typography>
              </Grid>
            </Grid>

            <Grid item xs={2} />

            <Grid item xs={5} container justify="center">
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="left"
                  className="w-full text-gray-400"
                >
                  Win
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography
                  variant={isSmall ? "subtitle1" : "h6"}
                  align="right"
                  className="w-full"
                >
                  {renderCurrency(c2d(Number(contestData.claimerPlayerMaxWin)))}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            container
            justify="center"
            alignContent="center"
            className="mt-5 mb-3"
          >
            <Grid item xs={6} container justify="center" alignContent="center">
              <Button
                variant="outlined"
                fullWidth
                className="border-green-900 text-green-900 font-bold"
                onClick={() => {
                  return redirect();
                }}
              >
                LOGIN
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PublicContestCard;
