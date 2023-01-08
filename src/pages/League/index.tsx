import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { reverse } from "named-urls";
import { Grid, Button, Typography } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import { browserName } from "react-device-detect";
import { useLocalStorage, writeStorage } from "@rehooks/local-storage";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "./../../redux/store";

import {
  selectUserData,
  selectConfig,
} from "./../../redux/selectors/authentication";

import {
  selectLoading,
  selectLeaguesData,
} from "../../redux/selectors/leagues";

import { fetchAsyncLeagues } from "./../../redux/thunks/leagues";

import SelectLeagueModal from "./../../components/SelectLeagueModal";
import Loader from "./../../components/Loader";
import ComingSoon from "../../icons/battleground-comingsoon.svg";
import useStyles from "./styles";

import routes from "./../../constants/routes";
import { ENABLE_BATTLEGROUND } from "../../constants/config";
import { useSnackbar } from "notistack";
import { selectUserInfoData } from "../../redux/selectors/users";
import { selectCurrentLeague } from "../../redux/selectors/leagues";
import { selectWalletFundsData } from "../../redux/selectors/wallet";


const League = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const dispatch: AppDispatch = useAppDispatch();
  const userData = useAppSelector(selectUserData);
  const userInfoData = useAppSelector(selectUserInfoData);
  const loading = useAppSelector(selectLoading);
  const leagues = useAppSelector(selectLeaguesData);
  const currentLeague = useAppSelector(selectCurrentLeague);
  const config = useAppSelector(selectConfig);
  const fundsData = useAppSelector(selectWalletFundsData);

  const [selectLeagueModalOpen, setSelectLeagueModalOpen] = useState(false);
  const [isFundsPopUpOpen, setIsFundsPopUpOpen] = useState(false);
  const [leagueId] = useLocalStorage<string>("league");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (userData !== null) {
      dispatch(fetchAsyncLeagues());
    }
  }, [userData, userInfoData, currentLeague]);

  if (leagues?.length > 0) {
    const firstLeague = leagues[0];
    let currentLeagueId = firstLeague?.id;
    if (leagueId) {
      const foundLeague = leagues.find((league: any) => league.id === leagueId);
      if (foundLeague) {
        currentLeagueId = leagueId;
      }
    } else {
      writeStorage("league", currentLeagueId);
    }

    if (config?.leaguesEnabled) {
      history.push(
        reverse(`${routes.dashboard.league.manage}`, {
          id: currentLeagueId,
        })
      );
    }
  }

  const checkBrowser = () => {
    if (browserName !== "Chrome") {
      enqueueSnackbar("Please use Google Chrome Browser", {
        variant: "warning",
      });
      return;
    }
    setSelectLeagueModalOpen(true);
  };

  useEffect(() => {
    if(localStorage.getItem('fundPopState') != 'shown'){
      if(config?.paidContests && (!fundsData || fundsData <= 0)) {
        localStorage.setItem('fundPopState','shown');
        setIsFundsPopUpOpen(true); 
      }
    }
  }, []);

  const handleFundsPopUpConfirm = () => {
    history.replace(
      reverse(`${routes.profile.home}`)
    );
};

  // CometChat

  return !config?.leaguesEnabled ? (
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
    <div className={classes.pageHeight}>
      <Helmet>
        <title>TopProp | League</title>
      </Helmet>
      <Grid
        style={{ height: "100%" }}
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
        {loading === "pending" ? (
          <Loader text="Almost there. Fetching all your leagues" />
        ) : (
          <Grid
            item
            container
            direction="row"
            justify="center"
            alignItems="stretch"
          >
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <Grid item className="pb-4">
                <img
                  alt="sparkling trophy"
                  src={process.env.PUBLIC_URL + "/trophy-sparkle.svg"}
                ></img>
              </Grid>
              <Grid item className="pb-8">
                <p className={classes.ctaText}>
                  You are not part of any Leagues.
                </p>
                <p className={classes.ctaText}>Please create a new league</p>
              </Grid>
              <Grid item>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  className="text-white"
                  // onClick={() => checkBrowser()}
                  onClick={() => setSelectLeagueModalOpen(true)}
                >
                  Create a League
                </Button>
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>

      {/* </Grid> */}
      <SelectLeagueModal
        open={selectLeagueModalOpen}
        handleClose={setSelectLeagueModalOpen}
      />
      
    </div>
  );
};

export default League;
