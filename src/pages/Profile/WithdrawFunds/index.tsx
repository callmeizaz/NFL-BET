import { useState, Fragment } from "react";
import { useTheme } from "@material-ui/core/styles";
import { useSnackbar } from "notistack";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Formik, FormikProps } from "formik";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import { renderCurrency } from "../../../helpers/currency";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import {
  fetchAsyncTransfers,
  fetchAsyncWalletFunds,
  requestAsyncWithdrawal,
} from "../../../redux/thunks/wallet";
import { resetLoading } from "../../../redux/reducers/walletSlice";

import { selectUserData } from "../../../redux/selectors/authentication";
import {
  selectWalletData,
  selectWalletFundingSourcesData,
  selectWalletFundsData,
} from "../../../redux/selectors/wallet";

import useStyles from "./styles";

import { WithdrawFundsForm } from "./interfaces";
import { Button, Tooltip } from "@material-ui/core";
import SelectionFundingSource from "../../../components/SelectionFundingSource";
import { FundingSourceData } from "../Wallet/interfaces";

const WithdrawFunds = () => {
  const classes = useStyles();
  const theme = useTheme();
  const dispatch: AppDispatch = useAppDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  const { enqueueSnackbar } = useSnackbar();

  const userData = useAppSelector(selectUserData);
  const funds = useAppSelector(selectWalletFundsData);
  const walletData = useAppSelector(selectWalletData);
  const fundingSources = useAppSelector(selectWalletFundingSourcesData);
  const walletStatus = walletData?.status;
  const isVerified = walletData?.status === "verified";

  const handleWithdrawRequestAttempt = (values: {
    fundingSourceDetails: FundingSourceData | null;
    amount: number | null;
  }) => {
    if (userData !== null) {
      const id = userData.id;
      return dispatch(
        requestAsyncWithdrawal({
          userId: id,
          amount: values.amount ?? 0,
          destinationFundingSourceId: values.fundingSourceDetails
            ? values.fundingSourceDetails.id
            : "",
        })
      ).then((response) => {
        if (response.type == "withdraw/request/fulfilled") {
          setTimeout(() => {
            enqueueSnackbar("Withdrawal Request Submitted Successfully.", {
              variant: "success",
            });
            dispatch(fetchAsyncWalletFunds({ userId: userData.id }));
            dispatch(fetchAsyncTransfers({ userId: userData.id }));
            dispatch(resetLoading());
          }, 500);
        } else {
          return;
        }
      });
    }
  };
  const setNotifier = () => {
    let notifier = "";
    if (
      +funds < 2000 ||
      walletData.status !== "verified" ||
      fundingSources.length === 0
    ) {
      if (+funds < 2000) {
        notifier = "Insufficient Funds. You need a minimum of $20 to withdraw";
      }

      if (walletStatus !== "verified") {
        notifier =
          "Your account is not verified yet. Please verify it so you withdraw your money.";
      }

      if (fundingSources.length === 0) {
        notifier = "Please add some funding sources to fund your wallet";
      }
    } else {
      notifier = "This action withdraws all your funds";
    }

    return notifier;
  };

  const defaultPayoutMethod = fundingSources[0];

  return (
    <Fragment>
      <Grid container direction="column" spacing={4}>
        <Grid item xs={12} container alignContent="center">
          <Grid item xs={6} sm={6} md={6} lg={3}>
            <Typography variant={isSmall ? "h6" : "h5"}>
              Available Balance
            </Typography>
          </Grid>
          <Grid item xs={6} sm={6} md={6} lg={1}>
            <Typography
              align="right"
              color="primary"
              variant={isSmall ? "h6" : "h5"}
            >
              {renderCurrency(funds / 100)}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={12} container alignContent="center">
          <Grid item xs={12}>
            <Typography variant={isSmall ? "h6" : "h5"}>
              Profits Payout
            </Typography>

            <Grid container>
              <Divider style={{ width: "100%" }} />
            </Grid>
            <Grid container className="spacer__0-5" />
            {!isVerified ? (
              <Grid item xs={12}>
                <Typography
                  align="left"
                  color="primary"
                  variant={isSmall ? "h6" : "h5"}
                >
                  Please verify your account first
                </Typography>
              </Grid>
            ) : !fundingSources.length ? (
              <Grid item xs={12}>
                <Typography
                  align="left"
                  color="primary"
                  variant={isSmall ? "h6" : "h5"}
                >
                  Please add some funding sources first
                </Typography>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Formik
                  initialValues={{
                    fundingSourceDetails: defaultPayoutMethod,
                    amount: 20,
                  }}
                  enableReinitialize
                  onSubmit={(values, { setSubmitting }) => {
                    handleWithdrawRequestAttempt(values)?.then(() => {
                      setSubmitting(false);
                    });
                  }}
                >
                  {({
                    values,
                    handleSubmit,
                    isSubmitting,
                  }: FormikProps<WithdrawFundsForm>) => {
                    return (
                      <form>
                        <Grid container spacing={3}>
                          <Grid item xs={12} container spacing={2}>
                            {/* <Grid
                          item
                          xs={12}
                          sm={6}
                          md={4}
                          lg={3}
                          className="p-2"
                        >
                          <ButtonBase
                            onClick={() => {
                              handleAddCardInitiate();
                            }}
                            disableRipple
                            className="w-full"
                          >
                            <MuiCard className="rounded-2xl px-4 pb-2 h-64 w-80 m-auto">
                              <Box className="p-2 h-full">
                                <Grid
                                  container
                                  justify="center"
                                  alignContent="center"
                                  className="h-full"
                                >
                                  <Grid item xs={12} container justify="center">
                                    <AddIcon
                                      className="text-6xl"
                                      color="primary"
                                      fontSize="large"
                                    />
                                  </Grid>

                                  <Grid item xs={12} container justify="center">
                                    <Typography
                                      color="primary"
                                      variant="h6"
                                      align="center"
                                    >
                                      add payout method
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Box>
                            </MuiCard>
                          </ButtonBase>
                        </Grid> */}

                            <Grid item xs={12} container spacing={2}>
                              {fundingSources.map(
                                (fundingSource: FundingSourceData) => {
                                  return (
                                    <SelectionFundingSource
                                      key={fundingSource.id}
                                      fundingSource={fundingSource}
                                      selectedFundingSource={
                                        values.fundingSourceDetails
                                      }
                                    />
                                  );
                                }
                              )}
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={6}
                            md={6}
                            lg={4}
                            className="mb-4"
                          >
                            <Button
                              variant="contained"
                              color="primary"
                              size="large"
                              fullWidth
                              disabled={
                                funds < 2000 ||
                                walletStatus !== "verified" ||
                                isSubmitting ||
                                fundingSources.length === 0
                              }
                              onClick={() => handleSubmit()}
                            >
                              Withdraw
                            </Button>
                            <Typography variant="subtitle2">
                              {setNotifier()}
                            </Typography>
                          </Grid>
                        </Grid>
                      </form>
                    );
                  }}
                </Formik>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};
export default WithdrawFunds;
