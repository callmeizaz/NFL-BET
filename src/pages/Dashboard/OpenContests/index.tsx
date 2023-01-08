import React, { Fragment, useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import OpenContestsTable from "../../../components/OpenContestsTable";
import Loader from "../../../components/Loader";
import EmptyContestList from "../../../components/EmptyContestList";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import { fetchAsyncContests } from "../../../redux/thunks/contests";
import { resetLoading } from "../../../redux/reducers/contestsSlice";

import {
  selectContestsData,
  selectContestsStatus,
} from "../../../redux/selectors/contests";
import { selectUserData } from "../../../redux/selectors/authentication";

import useStyles from "./styles";
import { IProps } from "./interface";

import { CONTEST_STATUSES } from "../../../constants/config/contests";
import { selectPlayersData } from "../../../redux/selectors/players";
import { Helmet } from "react-helmet";
import { Typography } from "@material-ui/core";

const OpenContests = (props: IProps) => {
  const { handleContestClaimClick, setCreateContestModalOpen } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sectionState, setSectionState] = useState("loading"); // loading, noPlayers, noContests, contests

  const [isEmptyPlayer, setEmptyPlayer] = useState(false);
  const playerData = useAppSelector(selectPlayersData);
  const contestStatus = useAppSelector<string>(selectContestsStatus);

  const contestsData = useAppSelector(selectContestsData);
  const sortedArray = contestsData?.slice();
  sortedArray?.sort((a: any, b: any) => {
    const aTotal =
      Number(a.claimerPlayerProjFantasyPoints) +
      Number(a.creatorPlayerProjFantasyPoints);
    const bTotal =
      Number(b.claimerPlayerProjFantasyPoints) +
      Number(b.creatorPlayerProjFantasyPoints);
    return bTotal - aTotal;
  });
  const userData = useAppSelector(selectUserData);

  // empty players
  useEffect(() => {
    if (contestStatus && contestsData)
      if (contestStatus === "mondayNightFootball") {
        setSectionState("mondayNightFootball");
        setEmptyPlayer(true);
      } else if (contestStatus === "noPlayers") {
        setSectionState("noPlayers");
        setEmptyPlayer(true);
      } else {
        if (contestsData.length === 0) {
          setSectionState("noContests");
        } else {
          setSectionState("contests");
        }
        setEmptyPlayer(false);
      }
  }, [contestStatus, contestsData]);

  // Contests Dispatch
  useEffect(() => {
    if (userData !== null) {
      setLoading(true);
      const id = userData.id;
      dispatch(
        fetchAsyncContests({
          filter: {
            where: {
              status: CONTEST_STATUSES.OPEN,
              ended: false,
              creatorId: { neq: id },
            },
            include: [
              "creator",
              "claimer",
              "winner",
              "creatorPlayer",
              "claimerPlayer",
            ],
            order: "createdAt DESC",
          },
        })
      ).then((response) => {
        if (response.type == "contests/fetch/fulfilled") {
          setTimeout(() => {
            setLoading(false);
            dispatch(resetLoading());
          }, 3000);
        } else {
          setLoading(false);
          return;
        }
      });
    }
  }, [userData]);

  return (
    <Fragment>
      {
        {
          loading: <Loader />,
          noPlayers: (
            <EmptyContestList
              line1="PGA contests will be live for The Masters."
              line2="Stay tuned for the latest."
              buttonText="Create a contest"
              buttonDisabled={true}
              callback={() => {
                setCreateContestModalOpen(true);
              }}
            />
          ),
          noContests: (
            <EmptyContestList
              // line1="You are not part of any contest"
              // line2="Please create a new contest."
              line1="PGA contests will be live for The Masters."
              line2="Stay tuned for the latest."
              buttonText="Create a contest"
              buttonDisabled={true}
              callback={() => {
                setCreateContestModalOpen(true);
              }}
            />
          ),
          mondayNightFootball: (
            <EmptyContestList
              line1="Game is in Progress"
              line2="Please come back soon."
              buttonText="Create a contest"
              buttonDisabled={true}
              callback={() => {
                setCreateContestModalOpen(true);
              }}
            />
          ),
          contests: (
            <Grid container spacing={2} className="mb-5">
              <Grid item xs={12}>
                {sortedArray !== null && sortedArray !== undefined ? (
                  <OpenContestsTable
                    contestData={sortedArray}
                    handleContestClaimClick={handleContestClaimClick}
                  />
                ) : (
                  ""
                )}
              </Grid>
            </Grid>
          ),
        }[sectionState]
      }
      <Hidden only={["md", "lg", "xl"]}>
        <AppBar position="fixed" color="transparent" className={classes.appBar}>
          <Grid container justify="center">
            <Grid item xs={11}>
              <Button
                className={classes.fab}
                variant="contained"
                fullWidth
                color="primary"
                // disabled={!playerData || playerData?.length === 0}
                disabled={true}
                onClick={() => setCreateContestModalOpen(true)}
              >
                Create a Contest
              </Button>
            </Grid>
          </Grid>
        </AppBar>
      </Hidden>
    </Fragment>
  );
};
export default OpenContests;
