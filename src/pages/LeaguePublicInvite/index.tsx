import React, { Fragment, useEffect } from "react";
import { reverse } from "named-urls";
import { useSnackbar } from "notistack";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Grid, Button, Typography } from "@material-ui/core";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import {
  doAsyncFetchLeaguePublicInvite,
  doAsyncJoinLeaguePublicInvite,
} from "../../redux/thunks/leagues";

import { selectLoading, selectInviteData } from "../../redux/selectors/leagues";

import InfoBanner from "../../components/InfoBanner";
import Loader from "../../components/Loader";
import useStyles from "./styles";
import routes from "../../constants/routes";

const LeaguePublicInvite = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();
  const { token } = useParams<{ token: string }>();

  const loading = useAppSelector(selectLoading);
  const inviteData = useAppSelector(selectInviteData);

  useEffect(() => {
    dispatch(doAsyncFetchLeaguePublicInvite({ token: token }));
  }, [dispatch, token]);

  const joinLeague = (token: string) => {
    dispatch(doAsyncJoinLeaguePublicInvite({ token })).then((response) => {
      if (response.type == "league/public-invite/join/fulfilled") {
        enqueueSnackbar("Successfully joined league", {
          variant: "success",
        });
        const currentLeague = response.payload.data.currentLeague;

        history.push(
          reverse(`${routes.dashboard.league.manage}`, {
            id: currentLeague.id,
          })
        );
      }
    });
  };

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | League</title>
      </Helmet>
      {loading === "pending" ? (
        <Loader />
      ) : (
        <Grid container justify="center" className="w-full mt-24">
          {inviteData?.tokenExpired ? (
            <InfoBanner
              icon="error_outline"
              title="Your invitation has expired, please request the league admin to send you a new invitation"
              action={{
                text: "Cancel Import",
                link: routes.dashboard.league.home,
              }}
            />
          ) : (
            <Grid item xs={12} md={8} lg={8} container justify="center">
              <Grid item xs={12} container justify="center">
                <Typography variant="h4" align="center">
                  Now Invite your friends to the league "{inviteData?.name}"
                </Typography>
              </Grid>
              <Grid item xs={12} container justify="center" className="mt-12">
                <Grid item xs={6} md={6} lg={4}>
                  <Button
                    size="large"
                    variant="contained"
                    fullWidth
                    color="primary"
                    onClick={() => {
                      joinLeague(inviteData?.inviteToken);
                    }}
                  >
                    Join League
                  </Button>
                </Grid>
              </Grid>
              <Grid item xs={12} container justify="center">
                <Grid item xs={12} className="mt-12" />
                {inviteData?.teamId ? (
                  <Grid
                    item
                    xs={10}
                    sm={6}
                    md={6}
                    lg={6}
                    container
                    justify="space-between"
                    className="mt-2"
                  >
                    <Typography>Your Team</Typography>
                    <Typography>{inviteData?.team?.name}</Typography>
                  </Grid>
                ) : (
                  ""
                )}
                <Grid item xs={12} />
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={6}
                  lg={6}
                  container
                  justify="space-between"
                  className="mt-2"
                >
                  <Typography># of Members</Typography>
                  <Typography>{inviteData?.members?.length}</Typography>
                </Grid>
                <Grid item xs={12} />
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={6}
                  lg={6}
                  container
                  justify="space-between"
                  className="mt-2"
                >
                  <Typography># of Teams</Typography>
                  <Typography>{inviteData?.teams?.length}</Typography>
                </Grid>
                <Grid item xs={12} />
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={6}
                  lg={6}
                  container
                  justify="space-between"
                  className="mt-2"
                >
                  <Typography>Scoring Type</Typography>
                  <Typography>{inviteData?.scoringType?.name}</Typography>
                </Grid>
                <Grid item xs={12} />
                <Grid
                  item
                  xs={10}
                  sm={6}
                  md={6}
                  lg={6}
                  container
                  justify="space-between"
                  className="mt-2"
                >
                  <Typography>Commissioner</Typography>
                  <Typography>{inviteData?.user?.fullName}</Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Fragment>
  );
};

export default LeaguePublicInvite;
