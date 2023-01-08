import React, { Fragment, useEffect } from "react";
import { reverse } from "named-urls";
import { useSnackbar } from "notistack";
import { useParams, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Grid, Button, Typography } from "@material-ui/core";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import {
  doAsyncFetchLeagueInvite,
  doAsyncJoinLeagueInvite,
} from "../../redux/thunks/leagues";

import { selectLoading, selectInviteData } from "../../redux/selectors/leagues";

import InfoBanner from "../../components/InfoBanner";
import Loader from "../../components/Loader";
import useStyles from "./styles";
import routes from "../../constants/routes";
// import { CometChat } from "@cometchat-pro/chat";
import { selectUserData } from "../../redux/selectors/authentication";

const LeagueInvite = () => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();
  const { token } = useParams<{ token: string }>();
  const userData = useAppSelector(selectUserData);

  const loading = useAppSelector(selectLoading);
  const inviteData = useAppSelector(selectInviteData);

  useEffect(() => {
    dispatch(doAsyncFetchLeagueInvite({ token: token }));
  }, [dispatch, token]);

  const joinLeague = (inviteId: number) => {
    dispatch(doAsyncJoinLeagueInvite({ inviteId: inviteId })).then(
      (response) => {
        if (response.type == "league/invite/join/fulfilled") {
          enqueueSnackbar("Successfully joined league", {
            variant: "success",
          });
          const currentLeague = response.payload.data.currentLeague;
          let GUID = currentLeague.inviteToken;
          let password = "";
          // let groupType = CometChat.GROUP_TYPE.PRIVATE;

          // CometChat.joinGroup(GUID, groupType, password).then(
          //   group => {
          //     console.log("Group joined successfully:", group);
          //   },
          //   error => {
          //     console.log("Group joining failed with exception:", error);
          //   }
          // );
          
          // let membersList = [
          //   new CometChat.GroupMember(userData.username, CometChat.GROUP_MEMBER_SCOPE.PARTICIPANT)
          // ];

          // CometChat.addMembersToGroup(GUID, membersList, []).then(
          //   response => {
          //     console.log("Member Added to group", response);
          //   },
          //   error => {
          //     console.log("Failed to add member to group", error);
          //   }
          // );


          history.push(
            reverse(`${routes.dashboard.league.manage}`, {
              id: currentLeague.id,
            })
          );
        }
      }
    );
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
              title="Your invitation has expired, please request the league commissioner to send you a new invitation"
              action={{
                text: "Cancel Import",
                link: routes.dashboard.league.home,
              }}
            />
          ) : (
            <Grid item xs={12} md={8} lg={8} container justify="center">
              <Grid item xs={12} container justify="center">
                <Typography variant="h4" align="center">
                  {inviteData?.member?.user?.fullName} invited you to join the
                  league "{inviteData?.league?.name}"
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
                      joinLeague(inviteData.id);
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
                  <Typography>{inviteData?.league?.members.length}</Typography>
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
                  <Typography>{inviteData?.league?.teams.length}</Typography>
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
                  <Typography>
                    {inviteData?.league?.scoringType?.name}
                  </Typography>
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
                  <Typography>{inviteData?.league?.user?.fullName}</Typography>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Grid>
      )}
    </Fragment>
  );
};

export default LeagueInvite;
