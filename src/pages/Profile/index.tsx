import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Chip from "@material-ui/core/Chip";

import Wallet from "./Wallet";
import AddFunds from "./AddFunds";
import WithdrawFunds from "./WithdrawFunds";
import IdentityVerification from "./IdentityVerification";

import TabPanel, { a11yConfig } from "../../components/TabPanel";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import {
  fetchAsyncTransfers,
  fetchAsyncWallet,
  fetchAsyncWalletFunds,
} from "../../redux/thunks/wallet";
import { resetLoading } from "../../redux/reducers/walletSlice";

import { selectUserData } from "../../redux/selectors/authentication";
import { selectWalletData } from "../../redux/selectors/wallet";

import useStyles from "./styles";
import Transfers from "./Transfers";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from "@material-ui/core/Zoom";
import { Button } from "@material-ui/core";

const redirectToTab = (tabKey: string | null) => {
  let tabIndex = 0;
  switch (tabKey) {
    case "wallet":
      tabIndex = 0;
      break;
    // case "add-funds":
    //   tabIndex = 1;
    //   break;
    case "withdraw-funds":
      tabIndex = 1;
      break;
    case "transfers":
      tabIndex = 2;
      break;
    case "account-verification":
      tabIndex = 3;
      break;
    default:
      tabIndex = 0;
      break;
  }
  return tabIndex;
};

const Profile = () => {
  const classes = useStyles();

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get("tab");
  const [tabIndex, setTabIndex] = useState(redirectToTab(tab));
  
  const dispatch: AppDispatch = useAppDispatch();
  const walletData = useAppSelector(selectWalletData);
  const isUserVerified = walletData?.status === "verified";

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setTabIndex(newValue);
  };

  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    const payload = { userId: userData?.id };
    var walletPromise = dispatch(fetchAsyncWallet(payload));
    var fundsPromise = dispatch(fetchAsyncWalletFunds(payload));

    Promise.all([walletPromise, fundsPromise]).then((values) => {
      dispatch(resetLoading());
    });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | Profile</title>
      </Helmet>
      <Grid container className={classes.root}>
        {/* <AppBar position="static" color="default"> */}
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Tabs
            value={tabIndex}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
            onChange={(event: React.ChangeEvent<{}>, value: any) =>
              handleChange(event, value)
            }
          >
            <Tab label="Wallet" {...a11yConfig(0)} />
            {/* <Tab label="Add Funds" {...a11yConfig(1)} /> */}
            {!isUserVerified ? (
              <Tooltip
                title="Please verify your account before withdrawing funds"
                placement="top"
                TransitionComponent={Zoom}
              >
                <div style={{ marginTop: "17px" }}>
                  <Tab
                    disabled={!isUserVerified}
                    label="Withdraw Funds"
                    {...a11yConfig(1)}
                  />
                </div>
              </Tooltip>
            ) : (
              <Tab label="Withdraw Funds" {...a11yConfig(2)} />
            )}

            <Tab label="Transfers" {...a11yConfig(3)} />
            <Tab
              label={
                isUserVerified ? (
                  "Account Verification"
                ) : (
                  <Grid container alignItems="center">
                    <Grid item xs={8}>
                      Account Verification
                    </Grid>
                    <Grid item xs={4} className="pl-1">
                      <Chip
                        className="text-red-500 border-red-500 text-xs"
                        variant="outlined"
                        label={walletData?.status ?? "unverified"}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                )
              }
              {...a11yConfig(4)}
            />
          </Tabs>
        </Grid>
        {/* </AppBar> */}
        <TabPanel value={tabIndex} index={0}>
          <Wallet setTabIndex={setTabIndex} />
        </TabPanel>
        {/* <TabPanel value={tabIndex} index={1}>
          <AddFunds setTabIndex={setTabIndex} />
        </TabPanel> */}
        <TabPanel value={tabIndex} index={1}>
          <WithdrawFunds />
        </TabPanel>
        <TabPanel value={tabIndex} index={2}>
          <Transfers />
        </TabPanel>
        <TabPanel value={tabIndex} index={3}>
          <IdentityVerification />
        </TabPanel>
      </Grid>
    </Fragment>
  );
};

export default Profile;
