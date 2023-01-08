import React, { Fragment, useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";

import LeagueInfoTable from "../../../components/LeagueInfoTable";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import { fetchAsyncMyContests } from "../../../redux/thunks/contests";
import { resetLoading } from "../../../redux/reducers/contestsSlice";

import { selectCurrentLeague } from "../../../redux/selectors/leagues";
import { selectUserData } from "../../../redux/selectors/authentication";

import useStyles from "./styles";
import { IProps } from "./interface";

import { CONTEST_STATUSES } from "../../../constants/config/contests";
import CircularProgress from "@material-ui/core/CircularProgress";

const LeagueInfo = (props: IProps) => {
  const dispatch: AppDispatch = useAppDispatch();
  const classes = useStyles();
  const { setInviteMemberModalOpen } = props;
  const userData = useAppSelector(selectUserData);
  const currentLeague = useAppSelector(selectCurrentLeague);
  const [loading, setLoading] = useState(false);

  const data = React.useMemo(() => currentLeague, []);

  return (
    <Fragment>
      <Grid container spacing={2} className="mb-5">
        <Grid item xs={12}>
          {currentLeague !== null ? (
            <LeagueInfoTable currentLeague={currentLeague} />
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
                onClick={() => setInviteMemberModalOpen(true)}
              >
                Invite Members
              </Button>
            </Grid>
          </Grid>
        </AppBar>
      </Hidden>

      
    </Fragment>
  );
};
export default LeagueInfo;
