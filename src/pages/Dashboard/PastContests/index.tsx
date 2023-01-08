import React, { Fragment, useEffect, useState } from "react";
import { useTable } from "react-table";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import PastContestsTable from "../../../components/PastContestsTable";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import { fetchAsyncPastContests } from "../../../redux/thunks/contests";
import { resetLoading } from "../../../redux/reducers/contestsSlice";

import { selectPastContestsData } from "../../../redux/selectors/contests";
import { selectUserData } from "../../../redux/selectors/authentication";
import { selectPlayersData } from "../../../redux/selectors/players";

import useStyles from "./styles";
import { IProps, ContestsPayload } from "./interface";

import { CONTEST_STATUSES } from "../../../constants/config/contests";
import CircularProgress from "@material-ui/core/CircularProgress";

const PastContests = (props: IProps) => {
  const { setCreateContestModalOpen } = props;
  const { handleContestShareClick } = props;
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();
  const contestsData = useAppSelector(selectPastContestsData);
  const userData = useAppSelector(selectUserData);
  const playerData = useAppSelector(selectPlayersData);
  const [loading, setLoading] = useState(false);

  // Contests Dispatch
  useEffect(() => {
    if (userData !== null) {
      setLoading(true);
      const id = userData?.id;
      dispatch(
        fetchAsyncPastContests({
          filter: {
            where: {
              and: [
                { ended: true },
                { or: [{ creatorId: id }, { claimerId: id }] },
                {
                  or: [{ status: CONTEST_STATUSES.CLOSED }],
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

  return (
    <Fragment>
      <Grid container spacing={2} className="mb-5">
        <Grid item xs={12}>
          {contestsData !== null ? (
            <PastContestsTable
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
      <Hidden only={["md", "lg", "xl"]}>
        <AppBar position="fixed" color="transparent" className={classes.appBar}>
          <Grid container justify="center">
            <Grid item xs={11}>
              <Button
                className={classes.fab}
                variant="contained"
                fullWidth
                color="primary"
                // disabled={!playerData || playerData?.length===0}
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

export default PastContests;
