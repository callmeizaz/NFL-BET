import React, { useEffect, useState } from "react";
import { Formik, Field, FormikProps } from "formik";
import clsx from "classnames";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useSnackbar } from "notistack";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import InputAdornment from "@material-ui/core/InputAdornment";
import Button from "@material-ui/core/Button";

import { TextField } from "formik-material-ui";

import SelectionFundingSource from "../../../components/SelectionFundingSource";
import AddFundsPrompt from "../../../components/AddFundsPrompt";

import { AddFundsProps, AddFundsForm } from "./interfaces";

import { renderCurrency } from "../../../helpers/currency";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import {
  addAsyncWalletFunds,
  fetchAsyncTransfers,
  fetchAsyncWalletFunds,
} from "../../../redux/thunks/wallet";
import { resetLoading } from "../../../redux/reducers/walletSlice";
import { WalletProps } from "./interfaces";

import { selectUserData } from "../../../redux/selectors/authentication";
import {
  selectWalletData,
  selectWalletFundingSourcesData,
  selectWalletFundsData,
} from "../../../redux/selectors/wallet";

import useStyles from "./styles";
import { FundingSourceData } from "../Wallet/interfaces";

const AddFunds = (props: AddFundsProps) => {
  const { setTabIndex } = props;
  const theme = useTheme();
  const classes = useStyles();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [amountSuggestion, setAmountSuggestion] = useState(100);

  const { enqueueSnackbar } = useSnackbar();

  const dispatch: AppDispatch = useAppDispatch();

  const userData = useAppSelector(selectUserData);
  const walletData = useAppSelector(selectWalletData);
  const fundingSources = useAppSelector(selectWalletFundingSourcesData);
  const isVerified = walletData?.status === "verified";

  const funds = useAppSelector(selectWalletFundsData);

  const handleAddFundAttempt = (values: {
    fundingSourceDetails: FundingSourceData | null;
    amount: number | null;
  }) => {
    return dispatch(
      addAsyncWalletFunds({
        userId: userData.id,
        amount: (values.amount ?? 0) * 100,
        sourceFundingSourceId: values.fundingSourceDetails
          ? values.fundingSourceDetails.id
          : "",
      })
    ).then((response) => {
      if (response.type == "wallet/addFunds/fulfilled") {
        setTimeout(() => {
          dispatch(fetchAsyncWalletFunds({ userId: userData.id }));
          dispatch(fetchAsyncTransfers({ userId: userData.id }));
          enqueueSnackbar(response.payload.message, {
            variant: "success",
          });
          dispatch(resetLoading());
        }, 500);
      } else {
        return;
      }
    });
  };

  const openVerifyModal = () => {
    setVerifyModalOpen(true);
  };

  const handleVerifyConfirm = () => {
    setTabIndex(4);
    setVerifyModalOpen(false);
  };

  const handleClose = () => {
    setVerifyModalOpen(false);
  };

  return (
    <Grid container>
      <Grid item xs={12} container>
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
      <Grid container className="spacer__1" />
      <Grid item xs={12} container justify="space-between">
        <Grid
          item
          container
          xs={12}
          sm={12}
          md={12}
          lg={12}
          direction="column"
          alignContent="center"
          className={clsx(classes.banner, "py-2")}
        >
          <Typography align="center" variant="h6" className="text-white">
            Deposit at least $50 NOW and get up to $50 in risk-free contests
          </Typography>
          <Typography
            align="center"
            variant="caption"
            className="w-full text-white"
          >
             Offer valid week of deposit only. State restrictions apply.
          </Typography>
        </Grid>
      </Grid>
      <Grid container className="spacer__1" />
      <Typography variant={isSmall ? "h6" : "h5"}>Add Funds</Typography>
      <Grid container>
        <Divider style={{ width: "100%" }} />
      </Grid>
      <Grid container className="spacer__0-5" />

      <Grid item xs={12} container alignContent="center">
        {!fundingSources.length ? (
          <Grid item xs={12}>
            <Typography
              align="left"
              color="primary"
              variant={isSmall ? "h6" : "h5"}
            >
              Please add some funding sources to fund your wallet
            </Typography>
          </Grid>
        ) : (
          ""
        )}
        <Grid item xs={12}>
          <Formik
            initialValues={{
              fundingSourceDetails: fundingSources[0],
              amount: 100,
            }}
            enableReinitialize
            onSubmit={(values, { setSubmitting }) => {
              handleAddFundAttempt(values).then(() => {
                setSubmitting(false);
              });
            }}
          >
            {({
              values,
              handleSubmit,
              setFieldValue,
              isSubmitting,
            }: FormikProps<AddFundsForm>) => {
              return (
                <form>
                  <Grid container>
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
                              handleDeleteCard={()=>{}}
                            />
                          );
                        }
                      )}
                    </Grid>
                    <Grid container className="spacer__1" />

                    <Grid container className="spacer__0-5" />
                    <Grid item xs={12} container>
                      <Grid item xs={12} sm={4} md={6} lg={6}>
                        <Field
                          component={TextField}
                          size="small"
                          variant="outlined"
                          name="amount"
                          type="number"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography variant="h5">$</Typography>
                              </InputAdornment>
                            ),
                            inputProps: {
                              min: 10,
                            },
                          }}
                        />
                      </Grid>
                      <Grid container className="spacer__0-5" />
                      <Grid item xs={12} container className="mb-8" spacing={1}>
                        <Grid item xs={12} sm={1} md={2} lg={2}>
                          <Button
                            variant={
                              values.amount === 50 ? "contained" : "outlined"
                            }
                            size="large"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              setFieldValue("amount", 50);
                            }}
                            disabled={isSubmitting}
                          >
                            $50
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={1} md={2} lg={2}>
                          <Button
                            variant={
                              values.amount === 100 ? "contained" : "outlined"
                            }
                            size="large"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              setFieldValue("amount", 100);
                            }}
                            disabled={isSubmitting}
                          >
                            $100
                          </Button>
                        </Grid>
                        <Grid item xs={12} sm={1} md={2} lg={2}>
                          <Button
                            variant={
                              values.amount === 250 ? "contained" : "outlined"
                            }
                            size="large"
                            color="primary"
                            fullWidth
                            onClick={() => {
                              setFieldValue("amount", 250);
                            }}
                            disabled={isSubmitting}
                          >
                            $250
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid container className="spacer__0-5" />
                    <Grid item xs={12} container className="mb-8">
                      <Grid item xs={12} sm={3} md={6} lg={6}>
                        {isVerified ? (
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            fullWidth
                            onClick={() => openVerifyModal()}
                          >
                            Add funds
                          </Button>
                        ) : (
                          <Button
                            variant="contained"
                            size="large"
                            color="primary"
                            fullWidth
                            disabled={
                              values.amount < 10 ||
                              values.fundingSourceDetails === null ||
                              isSubmitting ||
                              !fundingSources.length
                            }
                            onClick={() => handleSubmit()}
                          >
                            Add funds
                          </Button>
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                </form>
              );
            }}
          </Formik>
        </Grid>
      </Grid>
      <AddFundsPrompt
        open={verifyModalOpen}
        handleClose={setVerifyModalOpen}
        handleConfirm={handleVerifyConfirm}
      />
    </Grid>
  );
};
export default AddFunds;
