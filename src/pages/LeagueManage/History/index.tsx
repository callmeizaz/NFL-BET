import React, { Fragment, useEffect } from "react";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";

import { fetchAsyncPastContests } from "../../../redux/thunks/leagueContests";
import { resetLoading } from "../../../redux/reducers/contestsSlice";
import { selectUserData } from "../../../redux/selectors/authentication";
import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";
import TableDesktop from "./TableDesktop";
import TableMobile from "./TableMobile";

import { LEAGUE_CONTEST_STATUSES } from "../../../constants/config/contests";

import { IProps } from "./interface";

const History = (props: IProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const { currentLeague, setCreateContestModalOpen, handleContestShareClick } =
    props;

  const userData = useAppSelector(selectUserData);

  // Contests Dispatch
  useEffect(() => {
    if (userData !== null) {
      const id = userData.id;
      dispatch(
        fetchAsyncPastContests({
          filter: {
            where: {
              and: [
                { ended: true },
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
                      status: LEAGUE_CONTEST_STATUSES.CLOSED,
                    },
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
      ).then((response) => {
        if (response.type == "leagueContestspastContests/fetch") {
          setTimeout(() => {
            dispatch(resetLoading());
          }, 3000);
        } else {
          return;
        }
      });
    }
  }, [userData, currentLeague]);

  return (
    <Fragment>
      <Grid container spacing={2} className="mb-5">
        <Grid item xs={12}>
          <TableDesktop handleContestShareClick={handleContestShareClick} />
          <TableMobile handleContestShareClick={handleContestShareClick} />
        </Grid>
      </Grid>
      <Hidden only={["md", "lg", "xl"]}>
        <AppBar
          position="fixed"
          color="transparent"
          className="top-auto bottom-4 p-1 shadow-none"
        >
          <Grid container justify="center">
            <Grid item xs={11}>
              <Button
                className="font-bold"
                variant="contained"
                fullWidth
                color="primary"
                disabled={true}
                onClick={() => {
                  setCreateContestModalOpen(true);
                }}
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
export default History;
