import React, { Fragment, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import ContestListHeader from "../../components/ContestListHeader";
import PublicContestCard from "../../components/PublicContestCard";
import { useParams } from "react-router-dom";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import { fetchAsyncPublicContest } from "../../redux/thunks/contests";
import {
  resetLoading,
  selectContest,
} from "../../redux/reducers/contestsSlice";

import { contest } from "../../constants/mocked/publicContest";

import { selectContestsData } from "../../redux/selectors/contests";
import { selectUserData } from "../../redux/selectors/authentication";

import useStyles from "./styles";
import { IProps, ContestsPayload } from "./interface";

import { CONTEST_STATUSES } from "../../constants/config/contests";

const PublicContest = (props: IProps) => {
  const { handleContestClaimClick, setCreateContestModalOpen } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();

  const { id } = useParams<{ id: string }>();

  const contestsData = useAppSelector(selectContestsData);
  const userData = useAppSelector(selectUserData);

  // Contests Dispatch
  useEffect(() => {
    dispatch(
      fetchAsyncPublicContest({
        filter: {
          where: {
            //TODO: Send the contest id
            id: 1,
          },
          include: [
            "creator",
            "claimer",
            "winner",
            "creatorPlayer",
            "claimerPlayer",
          ],
        },
      })
    ).then((response) => {
      if (response.type == "publicContests/fetch/fulfilled") {
        setTimeout(() => {
          dispatch(resetLoading());
        }, 3000);
      } else {
        return;
      }
    });
  }, []);

  return (
    <Fragment>
      <Grid container spacing={2} className="mb-5">
        {/* Lobby Header */}
        <Grid item xs={12} md={6} lg={6}>
          <Typography
            className={classes.LobbyTextSubHeader}
            variant="h6"
            gutterBottom
          >
            Claim Contest
          </Typography>
        </Grid>
        <Grid item xs={12} className="m-auto"></Grid>
        {/* Public Contest Card */}
        <PublicContestCard
          key={contest.id}
          contestData={contest}
          handleContestClaimClick={handleContestClaimClick}
        />
      </Grid>
    </Fragment>
  );
};
export default PublicContest;
