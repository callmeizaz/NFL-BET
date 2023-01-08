import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import {
  useParams,
  useHistory,
  Link as RouterLink,
  useLocation,
} from "react-router-dom";
// import { CometChat } from "@cometchat-pro/chat";
import { reverse } from "named-urls";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import { writeStorage, deleteFromStorage } from "@rehooks/local-storage";
import jwt from "jsonwebtoken";

// import Select from "react-select";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Hidden from "@material-ui/core/Hidden";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import Fab from "@material-ui/core/Fab";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Badge from "@material-ui/core/Badge";
import { styled } from "@material-ui/core";

import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ErrorIcon from "@material-ui/icons/Error";
import ChatIcon from "@material-ui/icons/Chat";

import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";
import SyncIcon from "@material-ui/icons/Sync";
import SportsFootballIcon from "@material-ui/icons/SportsFootball";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CloseIcon from "@material-ui/icons/Close";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { toggleSidebar } from "../../redux/reducers/miscellaneousSlice";
import {
  fetchAsyncLeagueById,
  doAsyncSyncLeague,
  runWinCriteria,
  runCloseContests,
} from "../../redux/thunks/leagues";
import {
  selectLeaguesData,
  selectCurrentLeague,
  selectSyncLoading,
} from "../../redux/selectors/leagues";

import {
  selectUserData,
  selectRunType,
} from "./../../redux/selectors/authentication";

import { selectCometUserData } from "./../../redux/selectors/comet";

import {
  runFetchProjections,
  runFetchPoints,
} from "./../../redux/thunks/players";
import { fetchAsyncWalletFunds } from "../../redux/thunks/wallet";
import { doAsyncClaimContest } from "../../redux/thunks/leagueContests";

import { selectContest } from "../../redux/reducers/leagueContestsSlice";
import { selectWalletFundsData } from "../../redux/selectors/wallet";
import TabPanel from "../../components/TabPanel";
import SelectLeagueModal from "../../components/SelectLeagueModal";
import Lobby from "./Lobby";
import MyContests from "./MyContests";
import History from "./History";
import LeagueInfo from "./LeagueInfo";
import {
  LeagueContest,
  ClaimContestPayloadInterface,
} from "../../typings/interfaces/leagueContests";

import { CometChatMessages, CometChatUI } from "../../CometChatWorkspace/src";

import routes from "../../constants/routes";
import moment from "moment";

import InviteMembersModal from "../../components/InviteMembersModal";
import CreateLeagueContestModal from "../../components/CreateLeagueContestModal";
import ClaimLeagueContestModal from "../../components/ClaimLeagueContestModal";
import ViewLeagueContestModal from "../../components/ViewLeagueContestModal";
import ViewPastLeagueContestModal from "../../components/ViewPastLeagueContestModal";
import { renderCurrency } from "../../helpers/currency";

import {
  YAHOO_CLIENT_ID,
  YAHOO_OAUTH_REDIRECT_URL,
} from "../../constants/config";
import useStyles from "./styles";
import Loader from "../../components/Loader";
import FundsPopUp from "../../components/FundsPopup";

const tabs = [
  {
    key: "openContests",
    label: "Lobby",
  },
  {
    key: "myContests",
    label: "My Contests",
  },
  {
    key: "pastContests",
    label: "History",
  },
  {
    key: "info",
    label: "Info",
  },
];

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 3,
    top: 10,
    padding: "0 4px",
    textAlign: "center",
    background: "#ff4d4f",
  },
}));

const LeagueManage = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorLeagueEl, setAnchorLeagueEl] = useState(null);
  const [openSpeedDial, setSpeedDialOpen] = React.useState(false);
  const history = useHistory();
  const theme = useTheme();
  const location = useLocation();
  const hash = location.hash.replace("#", "");
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const hashedIndex = tabs.findIndex((tab) => tab.key === hash);

  const [tabIndex, setTabIndex] = useState(hashedIndex >= 0 ? hashedIndex : 0);
  const [isClaimContestModalOpen, setClaimContestModalOpen] = useState(false);

  const [isCreateContestModalOpen, setCreateContestModalOpen] = useState(false);
  const [isLeagueContestModalOpen, setLeagueContestModalOpen] = useState(false);
  const [isShareContestModalOpen, setShareContestModalOpen] = useState(false);
  const [isHistoryContestModalOpen, setHistoryContestModalOpen] =
    useState(false);
  const [isFundsPopUpOpen, setIsFundsPopUpOpen] = useState(false);
  const [isInviteMemberModalOpen, setInviteMemberModalOpen] = useState(false);
  const [selectLeagueModalOpen, setSelectLeagueModalOpen] = useState(false);
  const [isChatDrawerOpen, setChatDrawerOpen] = useState(false);
  const [cometChatGroup, setCometChatGroup] = useState<any>(null);
  const [unreadMessages, setUnreadMessages] = useState<number>(0);

  const [currentContest, setCurrentContest] = useState<LeagueContest | null>(
    null
  );

  const runType = useAppSelector(selectRunType);
  const fundsData = useAppSelector(selectWalletFundsData);
  const cometUserData = useAppSelector(selectCometUserData);

  const changeTabs = (index: number) => {
    setTabIndex(index);
  };

  const handleMenuClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLeagueMenuClose = () => {
    setAnchorLeagueEl(null);
  };

  const leagues = useAppSelector(selectLeaguesData);
  const userData = useAppSelector(selectUserData);
  const userId = userData?.id;
  const syncLoading = useAppSelector(selectSyncLoading);
  const currentLeague = useAppSelector(selectCurrentLeague);

  const commissionerId = currentLeague?.userId;

  const leagueDropdown = leagues
    ? leagues.map((league: any) => {
        return {
          id: league.id,
          name: league.name,
        };
      })
    : [];

  const selectedCurrentLeague = leagues?.find(
    (league: any) => league.id.toString() === id
  );

  const selectedDropdownCurrentLeague = leagueDropdown.find(
    (league: any) => league.id.toString() === id
  );

  if (!selectedCurrentLeague) {
    history.push(routes.dashboard.league.home);
  }

  // const groupProcessing = async () => {
  //   const CCUser = await CometChat.getLoggedinUser();

  //   // Comet group creation and member creation
  //   if (!currentLeague) {
  //     dispatch(fetchAsyncLeagueById({ id: id }));
  //   }
  //   const GUID = currentLeague?.inviteToken;
  //   if (CCUser) {
  //     await CometChat.getGroup(GUID).then(
  //       (group) => {
  //         if (!group.getHasJoined()) {
  //           const password = "";
  //           const groupType = CometChat.GROUP_TYPE.PUBLIC;

  //           CometChat.joinGroup(GUID, groupType, password).then(
  //             (group) => {
  //               console.log("Group joined successfully:", group);
  //               setCometChatGroup(group);
  //             },
  //             (error) => {
  //               console.log("Group joining failed with exception:", error);
  //             }
  //           );
  //         } else {
  //           setCometChatGroup(group);
  //         }
  //       },
  //       (error) => {
  //         if (error.code !== "USER_NOT_LOGED_IN") {
  //           const groupName = currentLeague?.name;
  //           const groupType = CometChat.GROUP_TYPE.PUBLIC;
  //           const password = "";

  //           var group = new CometChat.Group(
  //             GUID,
  //             groupName,
  //             groupType,
  //             password
  //           );
  //           CometChat.createGroup(group).then(
  //             (group) => {
  //               setCometChatGroup(group);
  //               //member check
  //             },
  //             (error) => {
  //               console.log("Group creation failed with exception:", error);
  //             }
  //           );
  //         }
  //       }
  //     );
  //   }
  // };

  // const fetchUnreadMsgs = async () => {
  //   const CCUser = await CometChat.getLoggedinUser();

  //   const msgLimit = 100;
  //   if (CCUser) {
  //     const GUID = currentLeague?.inviteToken;
  //     const messagesRequest = new CometChat.MessagesRequestBuilder()
  //       .setGUID(GUID)
  //       .setUnread(true)
  //       .setLimit(msgLimit)
  //       .build();

  //     await messagesRequest.fetchPrevious().then(
  //       (messages) => {
  //         setUnreadMessages(messages.length);
  //         // Handle the list of messages
  //       },
  //       (error) => {
  //         console.log("Message fetching failed with error:", error);
  //       }
  //     );
  //   }
  // };

  const listenerID = currentLeague?.inviteToken;
  // if (listenerID) {
  //   CometChat.addMessageListener(
  //     listenerID,
  //     new CometChat.MessageListener({
  //       onTextMessageReceived: (textMessage: any) => {
  //         if (textMessage.receiverId === listenerID) {
  //           updateUnreadCount(listenerID);
  //         }
  //       },
  //     })
  //   );
  // }

  const updateUnreadCount = (listenerID: string) => {
    if (!isChatDrawerOpen && listenerID === currentLeague?.inviteToken) {
      const count = unreadMessages + 1;
      setUnreadMessages(count);
    }
  };

  useEffect(() => {
    deleteFromStorage("tpsl");
    if (selectedCurrentLeague) {
      dispatch(fetchAsyncLeagueById({ id: id }));
    }
  }, [id, userData, isLeagueContestModalOpen]);

  // useEffect(() => {
  //   if (currentLeague) {
  //     leagues
  //       ?.filter((league: any) => {
  //         return league.inviteToken !== currentLeague.inviteToken;
  //       })
  //       ?.forEach((league: any) => {
  //         CometChat.removeMessageListener(league.inviteToken);
  //       });

  //     groupProcessing();
  //     fetchUnreadMsgs();
  //   }
  // }, [cometUserData, currentLeague]);

  useEffect(() => {
    if (fundsData && fundsData <= 0) {
      setIsFundsPopUpOpen(true);
    }
  }, [id, userData, isFundsPopUpOpen, fundsData]);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    if (hash) {
      history.replace(
        reverse(`${routes.dashboard.league.manage}`, {
          id,
        })
      );
    }
    setTabIndex(newValue);
  };

  const handleFundsPopUpConfirm = () => {
    history.replace(reverse(`${routes.profile.home}`));
  };

  const handleContestClaimClick = (contest: LeagueContest) => {
    setCurrentContest(contest);
    dispatch(selectContest(contest));
    setClaimContestModalOpen(true);
  };

  const claimContest = (contestParams: ClaimContestPayloadInterface) => {
    dispatch(doAsyncClaimContest(contestParams)).then((response) => {
      if (response.type == "leagueContestsclaim/contest/fulfilled") {
        dispatch(fetchAsyncWalletFunds({ userId: userData.id }));
        setClaimContestModalOpen(false);
        changeTabs(1);
      }
    });
  };

  const handleContestShareClick = (contest: LeagueContest) => {
    setCurrentContest(contest);
    dispatch(selectContest(contest));
    setShareContestModalOpen(true);
  };

  const handlePastContestViewClick = (contest: LeagueContest) => {
    setCurrentContest(contest);
    dispatch(selectContest(contest));
    setHistoryContestModalOpen(true);
  };

  const syncLeague = () => {
    if (selectedCurrentLeague) {
      dispatch(doAsyncSyncLeague({ leagueId: selectedCurrentLeague?.id })).then(
        (response) => {
          if (response.type == "league/source/sync/fulfilled") {
            enqueueSnackbar("Successfully synced league", {
              variant: "success",
            });
          }
          if (response.type == "league/source/sync/rejected") {
            dispatch(fetchAsyncLeagueById({ id: selectedCurrentLeague?.id }));
          }
        }
      );
    }
  };

  const revalidateSync = () => {
    if (currentLeague?.userId === userId) {
      const leagueId = currentLeague?.id;
      const sourceId = currentLeague?.importSourceId;
      const leagueName = currentLeague?.name;
      const jwToken = jwt.sign(
        { leagueId: leagueId, leagueName: leagueName },
        "topprop",
        { expiresIn: "15m" }
      );
      writeStorage("tpsl", jwToken);
      let link = "#";
      switch (sourceId) {
        case 1:
          // ESPN
          link = "https://www.espn.com/fantasy/football/";
          break;
        case 2:
          // Yahoo
          link = `https://api.login.yahoo.com/oauth2/request_auth?client_id=${YAHOO_CLIENT_ID}&redirect_uri=${YAHOO_OAUTH_REDIRECT_URL}&response_type=code`;
          break;
      }
      window.location.href = link;
    } else {
      enqueueSnackbar("Please ask the league admin to sync the league");
    }
  };

  const handleDrawerToggle = () => {
    dispatch(toggleSidebar());
    // setMobileOpen(!mobileOpen);
  };

  const fetchProjections = () => {
    dispatch(runFetchProjections()).then(() => {
      enqueueSnackbar("Fetched Player Fantasy Point Projections");
    });
  };

  const fetchPoints = () => {
    dispatch(runFetchPoints()).then(() => {
      enqueueSnackbar("Fetched Player Fantasy Points");
    });
  };

  const runWinCheck = () => {
    dispatch(runWinCriteria()).then((response) => {
      enqueueSnackbar("Ran Win Check Successfully");
    });
  };

  const runCloseContest = () => {
    dispatch(runCloseContests()).then(() => {
      enqueueSnackbar("Ran Close Contests Successfully");
    });
  };

  const actions = [
    {
      icon: <SyncIcon />,
      name: "Fetch Projections",
      onClick: fetchProjections,
    },
    {
      icon: <SportsFootballIcon />,
      name: "Fetch Points",
      onClick: fetchPoints,
    },
    { icon: <DoneAllIcon />, name: "Win Check", onClick: runWinCheck },
    { icon: <CloseIcon />, name: "Close Contests", onClick: runCloseContest },
  ];

  return (
    <div>
      <Grid container className="w-full">
        <Grid item xs={12} container>
          <Hidden only={["lg", "xl"]}>
            <Grid
              item
              xs={1}
              sm={1}
              md={1}
              lg={1}
              container
              alignContent="center"
            >
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className="self-start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
          </Hidden>
          <Grid
            item
            xs={6}
            sm={6}
            md={8}
            lg={3}
            xl={3}
            className="w-full"
            container
            alignContent="center"
          >
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              disableUnderline
              // fullWidth
              style={{
                textOverflow: "ellipsis",
                overflow: "hidden",
                whiteSpace: "pre",
              }}
              value={selectedDropdownCurrentLeague?.id}
              className="text-lg font-medium"
              onChange={(event: React.ChangeEvent<any>) => {
                if (event) {
                  // CometChat.removeMessageListener(listenerID);

                  const leagueId = event.target.value;
                  writeStorage("league", leagueId);
                  setUnreadMessages(0);

                  history.push(
                    reverse(`${routes.dashboard.league.manage}`, {
                      id: leagueId,
                    })
                  );
                }
              }}
            >
              {leagueDropdown.map((league: any) => (
                <MenuItem key={league.id} value={league.id}>
                  {league.name}
                </MenuItem>
              ))}
            </Select>
            {/* <Select
              isSearchable
              placeholder="Select League"
              name="league"
              value={selectedCurrentLeague}
              menuPortalTarget={document.body}
              className="w-full"
              styles={{
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                singleValue: (base) => ({ ...base, width: "100%" }),
              }}
              options={leagueDropdown}
              onChange={(selectedLeague) => {
                if (selectedLeague) {
                  const { leagueId } = selectedLeague.value;
                  history.push(
                    reverse(`${routes.dashboard.league.manage}`, {
                      id: leagueId,
                    })
                  );
                }
              }}
            /> */}
          </Grid>
          <Hidden only={["lg", "xl"]}>
            <Grid
              item
              xs={5}
              sm={5}
              md={3}
              lg={1}
              container
              justify="flex-end"
              alignContent="center"
            >
              <Grid xs={7} container alignContent="center" justify="flex-end">
                <Fab
                  aria-label="chat"
                  variant="extended"
                  onClick={() => setChatDrawerOpen(true)}
                  color="primary"
                  size="small"
                  className="shadow-none"
                >
                  <ChatIcon fontSize="small" className="mr-2" />
                  Chat
                </Fab>
              </Grid>
              <IconButton aria-label="menu" onClick={handleMenuClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                {currentLeague?.syncStatus === "failed" ? (
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      revalidateSync();
                    }}
                    disabled={isSmall && currentLeague.importSourceId === 1}
                  >
                    <Grid container direction="column">
                      <Typography className="text-red-600">
                        {isSmall && currentLeague.importSourceId === 1
                          ? "Please sync from Desktop"
                          : "Sync Now"}
                      </Typography>
                    </Grid>
                  </MenuItem>
                ) : (
                  <MenuItem
                    onClick={() => {
                      handleMenuClose();
                      syncLeague();
                    }}
                  >
                    Sync Now
                  </MenuItem>
                )}
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    setInviteMemberModalOpen(true);
                  }}
                >
                  Invite Members
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    setLeagueContestModalOpen(true);
                  }}
                >
                  Create Contest
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    setSelectLeagueModalOpen(true);
                    handleMenuClose();
                  }}
                >
                  Create Another League
                </MenuItem>
              </Menu>
            </Grid>
          </Hidden>
          <Hidden only={["xs", "sm", "md"]}>
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={3}
              xl={2}
              container
              justify="center"
              alignContent="center"
              // className="ml-8"
            >
              <Typography variant="subtitle2">
                Scoring Type: {selectedCurrentLeague?.scoringType?.name}
              </Typography>
            </Grid>
          </Hidden>
          {currentLeague ? (
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={5}
              xl={4}
              container
              alignContent="center"
              justify="center"
              // className="ml-8"
            >
              {currentLeague?.syncStatus === "failed" ? (
                <Typography variant="subtitle2">
                  <ErrorIcon className="text-red-600 mr-1" fontSize="small" />
                  Sync Failed. Please sync manually
                </Typography>
              ) : (
                <Typography variant="subtitle2">
                  <CheckCircleIcon
                    color="secondary"
                    className="mr-1"
                    fontSize="small"
                  />
                  Last Synced:{" "}
                  {moment(currentLeague?.lastSyncTime).from(moment())}
                </Typography>
              )}

              <Hidden only={["xs", "sm"]}>
                {currentLeague?.syncStatus === "failed" ? (
                  <Button
                    size="small"
                    variant="outlined"
                    disabled={syncLoading === "pending"}
                    className="text-xs px-1 py-0 ml-2 text-red-600 border-red-600"
                    onClick={() => {
                      revalidateSync();
                    }}
                  >
                    {syncLoading === "pending" ? "Syncing..." : "Sync Now"}
                  </Button>
                ) : (
                  <Button
                    size="small"
                    color="primary"
                    variant="outlined"
                    disabled={syncLoading === "pending"}
                    className="text-xs px-1 py-0 ml-2"
                    onClick={() => {
                      syncLeague();
                    }}
                  >
                    {syncLoading === "pending" ? "Syncing..." : "Sync Now"}
                  </Button>
                )}
              </Hidden>
            </Grid>
          ) : (
            ""
          )}

          <Hidden only={["lg", "xl"]}>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={5}
              xl={4}
              container
              alignContent="center"
              className="ml-8"
            >
              <Box>
                <Typography
                  display="inline"
                  variant="subtitle2"
                  className="mr-4"
                >
                  Available Funds:
                </Typography>
                <Typography
                  display="inline"
                  variant="h5"
                  color="secondary"
                  className="font-bold"
                >
                  {renderCurrency(fundsData ? fundsData / 100 : 0)}
                </Typography>
                <Button
                  size="small"
                  color="secondary"
                  variant="outlined"
                  disabled={syncLoading === "pending"}
                  className="text-xs px-1 py-0 ml-2"
                  component={RouterLink}
                  to={routes.profile.home}
                >
                  Deposit
                </Button>
              </Box>
            </Grid>
          </Hidden>
        </Grid>
      </Grid>
      <Grid item xs={12} container>
        <Grid item container>
          <Grid item xs={12} sm={12} md={12} lg={7} xl={8}>
            <Tabs
              value={tabIndex}
              indicatorColor="primary"
              textColor="primary"
              variant={"scrollable"}
              onChange={(event: React.ChangeEvent<{}>, value: any) =>
                handleChange(event, value)
              }
            >
              {tabs.map((tab) => {
                return <Tab key={tab.key} label={tab.label} />;
              })}
            </Tabs>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={6}
            lg={5}
            xl={4}
            container
            justify="flex-end"
            className="px-2"
          >
            <Hidden only={["sm", "xs", "md"]}>
              <Grid item xs={6} className="px-1">
                <Button
                  variant="outlined"
                  color="primary"
                  size="large"
                  fullWidth
                  // onClick={() => checkBrowser()}
                  onClick={() => setSelectLeagueModalOpen(true)}
                >
                  Create League
                </Button>
              </Grid>
              <Grid item xs={6} className="px-1">
                {tabIndex === 3 && userId === commissionerId ? (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    onClick={() => setInviteMemberModalOpen(true)}
                  >
                    Invite Members
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    fullWidth
                    disabled={true}
                    onClick={() => setLeagueContestModalOpen(true)}
                  >
                    Create Contest
                  </Button>
                )}
              </Grid>
            </Hidden>
          </Grid>
        </Grid>
        <TabPanel value={tabIndex} index={0}>
          <Lobby
            handleContestClaimClick={handleContestClaimClick}
            setCreateContestModalOpen={setLeagueContestModalOpen}
            currentLeague={selectedCurrentLeague}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <MyContests
            handleContestShareClick={handleContestShareClick}
            setCreateContestModalOpen={setLeagueContestModalOpen}
            currentLeague={selectedCurrentLeague}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <History
            handleContestShareClick={handlePastContestViewClick}
            setCreateContestModalOpen={setLeagueContestModalOpen}
            currentLeague={selectedCurrentLeague}
          />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <LeagueInfo
            isInviteMemberModalOpen={isInviteMemberModalOpen}
            setInviteMemberModalOpen={setInviteMemberModalOpen}
          />
        </TabPanel>
      </Grid>
      {/* 
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="right"
        open={isChatDrawerOpen}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton
            onClick={() => {
              setChatDrawerOpen(false);
            }}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <Divider />
        {cometChatGroup && currentLeague ? (
          <CometChatMessages
            type="group"
            key={currentLeague?.id}
            chatWithGroup={currentLeague?.inviteToken}
          />
        ) : (
          <Loader text="Initializing Chat ..." />
        )}
      </Drawer> */}

      {/* <div style={{ width: "500px", height: "100vh" }}>
        <CometChatUI chatWithGroup="supergroup" />
      </div> */}

      <InviteMembersModal
        open={isInviteMemberModalOpen}
        handleClose={setInviteMemberModalOpen}
        league={selectedCurrentLeague}
      />

      <CreateLeagueContestModal
        open={isLeagueContestModalOpen}
        handleClose={setLeagueContestModalOpen}
        changeTabs={changeTabs}
      />

      <ClaimLeagueContestModal
        open={isClaimContestModalOpen}
        handleClose={setClaimContestModalOpen}
        handleSubmit={claimContest}
        changeTabs={changeTabs}
      />

      <ViewLeagueContestModal
        open={isShareContestModalOpen}
        handleClose={setShareContestModalOpen}
      />

      <ViewPastLeagueContestModal
        open={isHistoryContestModalOpen}
        handleClose={setHistoryContestModalOpen}
      />

      <SelectLeagueModal
        open={selectLeagueModalOpen}
        handleClose={setSelectLeagueModalOpen}
      />

      {runType === "proxy" && (
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={clsx(
            "absolute",
            isSmall ? "bottom-14 right-6" : "bottom-8 right-6"
          )}
          FabProps={{
            className: "text-white",
          }}
          icon={
            <SpeedDialIcon icon={<SettingsIcon />} openIcon={<EditIcon />} />
          }
          onClose={() => setSpeedDialOpen(false)}
          onOpen={() => setSpeedDialOpen(true)}
          open={openSpeedDial}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={() => action.onClick()}
            />
          ))}
        </SpeedDial>
      )}
      {/* <Hidden only={["xs", "sm", "md"]}>
        <StyledBadge
          badgeContent={unreadMessages ? unreadMessages : 0}
          // badgeContent={5}
          color="secondary"
          className="absolute bottom-16 right-6 font-black"
        >
          <Fab
            variant="extended"
            size="large"
            color="primary"
            aria-label="chat"
            // className="absolute bottom-16 right-6 font-black"
            onClick={() => {
              setUnreadMessages(0);
              setChatDrawerOpen(true);
            }}
          >
            <ChatIcon className="mr-2" />
            Chat
          </Fab>
        </StyledBadge>
      </Hidden> */}
    </div>
  );
};

export default LeagueManage;
