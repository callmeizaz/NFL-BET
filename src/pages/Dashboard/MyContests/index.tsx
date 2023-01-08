import React, { Fragment, useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import MyContestsTable from "../../../components/MyContestsTable";
import Loader from "../../../components/Loader";
import EmptyContestList from "../../../components/EmptyContestList";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import { fetchAsyncMyContests } from "../../../redux/thunks/contests";
import { resetLoading } from "../../../redux/reducers/contestsSlice";

import {
  selectMyContestsData,
  selectContestsStatus,
} from "../../../redux/selectors/contests";
import { selectPlayersData } from "../../../redux/selectors/players";
import { selectUserData } from "../../../redux/selectors/authentication";

import useStyles from "./styles";
import { IProps, ContestsPayload } from "./interface";

import { CONTEST_STATUSES } from "../../../constants/config/contests";
import CircularProgress from "@material-ui/core/CircularProgress";

import { useTable, useSortBy, useFilters } from "react-table";

const MyContests = (props: IProps) => {
  const { setCreateContestModalOpen } = props;
  const { handleContestShareClick } = props;
  const { setShareContestModalOpen } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();
  const contestsData = useAppSelector(selectMyContestsData);
  const playerData = useAppSelector(selectPlayersData);
  const contestStatus = useAppSelector<string>(selectContestsStatus);
  const userData = useAppSelector(selectUserData);
  const [loading, setLoading] = useState(false);
  const [sectionState, setSectionState] = useState("loading"); // loading, noPlayers, noContests, contests

  // Contests Dispatch
  useEffect(() => {
    if (userData !== null) {
      setLoading(true);
      const id = userData.id;
      dispatch(
        fetchAsyncMyContests({
          filter: {
            where: {
              and: [
                { ended: false },
                { or: [{ creatorId: id }, { claimerId: id }] },
                {
                  or: [
                    { status: CONTEST_STATUSES.OPEN },
                    { status: CONTEST_STATUSES.MATCHED },
                    { status: CONTEST_STATUSES.UNMATCHED },
                  ],
                },
              ],
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
          setLoading(false);
          setTimeout(() => {
            dispatch(resetLoading());
          }, 3000);
        } else {
          setLoading(false);
          return;
        }
      });
    }
  }, [userData]);

  // empty players
  useEffect(() => {
    if (contestStatus && contestsData)
      if (contestsData?.length > 0) {
        setSectionState("contests");
      } else {
        if (contestStatus === "mondayNightFootball") {
          setSectionState("mondayNightFootball");
        } else if (contestStatus === "noPlayers") {
          setSectionState("noPlayers");
        } else {
          setSectionState("noContests");
        }
      }
  }, [contestStatus, contestsData]);

  const data = React.useMemo(() => contestsData, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "Date",
        accessor: "updatedAt",
      },
      {
        Header: "Player",
        accessor: "creatorPlayer.fullName",
      },
      {
        Header: "Spread",
        accessor: "claimerPlayerSpread",
      },
      {
        Header: "Win",
        accessor: "claimerPlayerMaxWin",
      },
      {
        Header: "Win Bonus",
        accessor: "claimerPlayerWinBonus",
      },
      {
        Header: "Opponent",
        accessor: "claimerPlayer.fullName",
      },
    ],
    []
  );

  // const { getTableProps, headerGroups, rows, prepareRow } = useTable({
  //   columns,
  //   data,
  // })

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
              // line1="PGA contests will be live for The Masters."
              // line2="Stay tuned for the latest."
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
                {contestsData !== null ? (
                  <MyContestsTable
                    contestData={contestsData}
                    handleContestShareClick={handleContestShareClick}
                    userId={userData?.id}
                  />
                ) : (
                  <Fragment>
                    {loading && (
                      <CircularProgress
                        size={24}
                        className="absolute top-1/2 left-1/2 -mt-3 -ml-3"
                      />
                    )}
                  </Fragment>
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
export default MyContests;
