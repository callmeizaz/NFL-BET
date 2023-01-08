import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import clsx from "clsx";
import { useSnackbar } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Button from "@material-ui/core/Button";
import SpeedDial from "@material-ui/lab/SpeedDial";
import SpeedDialIcon from "@material-ui/lab/SpeedDialIcon";
import SpeedDialAction from "@material-ui/lab/SpeedDialAction";
import Box from "@material-ui/core/Box";

import SettingsIcon from "@material-ui/icons/Settings";
import EditIcon from "@material-ui/icons/Edit";

import SyncIcon from "@material-ui/icons/Sync";
import SportsFootballIcon from "@material-ui/icons/SportsFootball";
import DoneAllIcon from "@material-ui/icons/DoneAll";
import CloseIcon from "@material-ui/icons/Close";

import OpenContests from "./OpenContests";
import MyContests from "./MyContests";
import PastContests from "./PastContests";

import CreateContestModal from "../../components/CreateContestModal";
import ClaimContestModal from "../../components/ClaimContestModal";
import ShareContestModal from "../../components/ShareContestModal";
import EmptyContestList from "../../components/EmptyContestList";
import TabPanel from "../../components/TabPanel";

import Hidden from "@material-ui/core/Hidden";

import useStyles from "./styles";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import {
  runFetchProjections,
  runFetchPoints,
  runWinCriteria,
  runCloseContests,
  fetchAsyncTopPlayer,
} from "../../redux/thunks/players";

import { fetchAsyncContestStatus } from "../../redux/thunks/contests";

import { selectContest } from "../../redux/reducers/contestsSlice";
import InfoBanner from "./../../components/InfoBanner";
import Typography from "@material-ui/core/Typography";
import ComingSoon from "../../icons/battleground-comingsoon.svg";

import {
  selectRunType,
  selectUserData,
  selectConfig,
} from "../../redux/selectors/authentication";

import { ContestsPayload } from "./interfaces";

import { ENABLE_BATTLEGROUND } from "../../constants/config";
import CreateBattleGroundContestModal from "../../components/CreateBattlegroundContestModal";
import {
  isPlayersLoading,
  selectPlayersData,
  selectTopPlayerData,
} from "../../redux/selectors/players";
import {
  selectMyContestsData,
  selectContestsData,
} from "../../redux/selectors/contests";
import Loader from "../../components/Loader";
import HelpModal from "../../components/HelpModal";
import { Link } from "react-router-dom";
import { resetLoading } from "../../redux/reducers/playersSlice";
import { renderCurrency } from "../../helpers/currency";
import { selectWalletFundsData } from "../../redux/selectors/wallet";
import routes from "../../constants/routes";
import { selectSyncLoading } from "../../redux/selectors/leagues";

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
];

const Dashboard = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isXSmall = useMediaQuery(theme.breakpoints.down("xs"));
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const dispatch: AppDispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isCreateContestModalOpen, setCreateContestModalOpen] = useState(false);
  const [isClaimContestModalOpen, setClaimContestModalOpen] = useState(false);
  const [isShareContestModalOpen, setShareContestModalOpen] = useState(false);
  const [isHelpModalOpen, setHelpModalOpen] = useState(false);
  const userData = useAppSelector(selectUserData);
  const config = useAppSelector(selectConfig);
  const userId = userData?.id;
  const loading = useAppSelector(isPlayersLoading);
  const myContestData = useAppSelector(selectMyContestsData);
  const contestData = useAppSelector(selectContestsData);
  const runType = useAppSelector(selectRunType);
  const [isEmptyContest, setEmptyContest] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState<any | null>(null);
  const [helpModalId, setHelpModalId] = useState(0);
  const topPlayerData = useAppSelector(selectTopPlayerData);
  const fundsData = useAppSelector(selectWalletFundsData);
  const syncLoading = useAppSelector(selectSyncLoading);
  const playerData = useAppSelector(selectPlayersData);

  const [openSpeedDial, setSpeedDialOpen] = React.useState(false);

  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchAsyncContestStatus());
  }, []);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const handleContestClaimClick = (contest: ContestsPayload) => {
    dispatch(selectContest(contest));
    setClaimContestModalOpen(true);
  };

  const handleContestShareClick = (contest: ContestsPayload) => {
    dispatch(selectContest(contest));
    setShareContestModalOpen(true);
  };

  const handleHelpModalClick = (event: React.MouseEvent) => {
    setAnchorEl(event.currentTarget);
    setHelpModalId(Number(event.currentTarget.id));
    setHelpModalOpen(true);
  };

  const handleHelpModalClose = () => {
    setHelpModalId(0);
    setAnchorEl(null);
    setHelpModalOpen(false);
  };

  const changeTabs = (key: string) => {
    const tabIndex = tabs.findIndex((tab) => tab.key === key);
    setTabIndex(tabIndex);
  };

  // const number = 3.51;

  // const round = (value: number, step: number) => {
  //   step || (step = 1.0);
  //   var inv = 1.0 / step;
  //   var total = 0;
  //   if (value < 0) {
  //     total = Math.floor(value * inv) / inv;
  //   } else {
  //     total = Math.ceil(value * inv) / inv;
  //   }
  //   return total;
  // };

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
    dispatch(runWinCriteria()).then(() => {
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

  return !ENABLE_BATTLEGROUND || !config?.battlegroundEnabled ? (
    <div className={classes.pageHeight}>
      <Grid
        style={{ height: "100%" }}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        <Grid item className="pb-4">
          <img alt="Coming Soon!" src={ComingSoon}></img>
        </Grid>
        <Grid>
          <Typography variant="h4" color="primary" align="center">
            Coming Soon
          </Typography>
        </Grid>
      </Grid>
    </div>
  ) : (
    <Fragment>
      <Helmet>
        <title>TopProp | Lobby</title>
      </Helmet>
      <Grid container>
        {config?.paidContests ? (
          <Hidden only={["lg", "xl"]}>
            <Grid container alignContent="center">
              <Grid item xs={12} sm={12} md={12} lg={5} xl={4} className="ml-8">
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
                    component={Link}
                    to={routes.profile.home}
                  >
                    Deposit
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Hidden>
        ) : (
          ""
        )}
        <Grid item xs={12} sm={12} md={8} lg={10}>
          <Tabs
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant={isXSmall ? "fullWidth" : "standard"}
            onChange={(event: React.ChangeEvent<{}>, value: any) =>
              handleChange(event, value)
            }
          >
            {tabs.map((tab) => {
              return <Tab key={tab.key} label={tab.label} />;
            })}
          </Tabs>
        </Grid>
        <Grid item xs={12} sm={12} md={4} lg={2} container justify="flex-end">
          <Hidden only={["sm", "xs"]}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              className="text-white"
              // disabled={!playerData || playerData?.length === 0}
              disabled={true}
              onClick={() => setCreateContestModalOpen(true)}
            >
              Create a Contest
            </Button>
          </Hidden>
        </Grid>
      </Grid>

      {/* Help */}
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        className={`${classes.rootHelp} my-2 rounded-lg relative overflow-hidden`}
      >
        <Grid className="absolute right-0">
          <img
            className="opacity-60 w-24 transform -rotate-45"
            alt="sparkling trophy"
            src={process.env.PUBLIC_URL + "/football-icon.svg"}
          ></img>
        </Grid>
        <Grid item xs={12} className=" uppercase pt-3 z-50">
          <Typography
            variant="h5"
            className={clsx(
              "text-white",
              "font-bold",
              "tracking-wide",
              classes.helpHeading
            )}
          >
            Head-to-head Player Matchups based on fantasy points
          </Typography>
        </Grid>
        <Grid item xs={10} md={6} className="py-3 w-full z-50">
          <Grid
            item
            xs={12}
            md={10}
            container
            direction="row"
            justify="space-evenly"
          >
            <Grid item>
              <Typography
                id="1"
                className={clsx(
                  "cursor-pointer",
                  "uppercase",
                  "text-white",
                  classes.helpButtonActive
                )}
                onClick={handleHelpModalClick}
              >
                How to play
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                id="2"
                className={clsx(
                  "cursor-pointer",
                  "uppercase",
                  "text-white",
                  classes.helpButtonActive
                )}
                onClick={handleHelpModalClick}
              >
                Create vs match
              </Typography>
            </Grid>
            <Grid item>
              <Typography
                id="3"
                className={clsx(
                  "cursor-pointer",
                  "uppercase",
                  "text-white",
                  classes.helpButtonActive
                )}
                onClick={handleHelpModalClick}
              >
                Scoring
              </Typography>
            </Grid>
            <Grid item>
              <Link
                to="//www.toppropsports.com/faq"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Typography
                  className={clsx(
                    "cursor-pointer",
                    "uppercase",
                    "text-white",
                    classes.helpButtonActive
                  )}
                >
                  Rules
                </Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <HelpModal
        open={isHelpModalOpen}
        handleClose={handleHelpModalClose}
        id={helpModalId}
        anchorEl={anchorEl}
      />

      {/* Public Contests */}
      <TabPanel value={tabIndex} index={0}>
        <OpenContests
          handleContestClaimClick={handleContestClaimClick}
          setCreateContestModalOpen={setCreateContestModalOpen}
        />
      </TabPanel>

      {/* My Contests */}
      <TabPanel value={tabIndex} index={1}>
        <MyContests
          handleContestShareClick={handleContestShareClick}
          setCreateContestModalOpen={setCreateContestModalOpen}
          setShareContestModalOpen={setShareContestModalOpen}
        />
      </TabPanel>

      {/* Past Contests */}
      <TabPanel value={tabIndex} index={2}>
        <PastContests
          handleContestShareClick={handleContestShareClick}
          setShareContestModalOpen={setShareContestModalOpen}
          setCreateContestModalOpen={setCreateContestModalOpen}
        />
      </TabPanel>

      {/* <CreateContestModal
        open={isCreateContestModalOpen}
        handleClose={setCreateContestModalOpen}
        changeTabs={changeTabs}
      /> */}

      <CreateBattleGroundContestModal
        open={isCreateContestModalOpen}
        handleClose={setCreateContestModalOpen}
        changeTabs={changeTabs}
      />

      <ClaimContestModal
        open={isClaimContestModalOpen}
        handleClose={setClaimContestModalOpen}
        changeTabs={changeTabs}
      />

      <ShareContestModal
        open={isShareContestModalOpen}
        handleClose={setShareContestModalOpen}
        userId={userId}
      />

      {runType === "proxy" && (
        <SpeedDial
          ariaLabel="SpeedDial openIcon example"
          className={clsx(
            "absolute",
            isSmall ? "bottom-14 right-6" : "bottom-6 right-6"
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
    </Fragment>
  );
};

export default Dashboard;
