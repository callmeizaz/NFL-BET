import { useState, useEffect } from "react";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "clsx";

import Grid from "@material-ui/core/Grid";
import MuiCard from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ButtonBase from "@material-ui/core/ButtonBase";

import AddIcon from "@material-ui/icons/Add";
import ConfirmationDialog from "../../../components/ConfirmationDialog";
import CreateFundingSourceModal from "../../../components/CreateFundingSourceModal";

import { WalletProps, FundingSourceData } from "./interfaces";

import { renderCurrency } from "../../../helpers/currency";

import useStyles from "./styles";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import { selectUserData } from "../../../redux/selectors/authentication";
import {
  selectWalletData,
  selectWalletFundingSourcesData,
  selectWalletFundsData,
} from "../../../redux/selectors/wallet";
import {
  addAsyncWalletFunds,
  fetchAsyncFundingSources,
  fetchAsyncTransfers,
  fetchAsyncWallet,
  fetchAsyncWalletFunds,
  generateAsyncIavToken,
  removeAsyncFundingSource,
} from "../../../redux/thunks/wallet";
import { resetLoading } from "../../../redux/reducers/walletSlice";
import { Button, CircularProgress, InputAdornment } from "@material-ui/core";
import FundingSource from "../../../components/FundingSource";
import { useSnackbar } from "notistack";
import AddFundsPrompt from "../../../components/AddFundsPrompt";
import { Formik, Field, FormikProps } from "formik";
import { TextField } from "formik-material-ui";

import { AddFundsForm } from "./interfaces";
import SelectionFundingSource from "../../../components/SelectionFundingSource";

const Wallet = (props: WalletProps) => {
  const { setTabIndex } = props;
  const classes = useStyles();
  const theme = useTheme();
  const dispatch: AppDispatch = useAppDispatch();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [isDeleteConfrimationOpen, setDeleteConfirmationOpen] = useState(false);
  const [isAddCardModalOpen, setAddCardModalOpen] = useState(false);
  const [currentFundingSourceId, setCurrentFundingSourceId] = useState<
    string | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [iavToken, setIavToken] = useState<string | null>(null);
  const [verifyModalOpen, setVerifyModalOpen] = useState(false);
  const [amountSuggestion, setAmountSuggestion] = useState(100);

  const userData = useAppSelector(selectUserData);
  const walletData = useAppSelector(selectWalletData);
  const fundingSources = useAppSelector(selectWalletFundingSourcesData);
  const isVerified = walletData?.status === "verified";

  // fetchAsyncFundingSources({ userId: userData.id }).
  // useEffect(() => {

  // })
  useEffect(() => {
    if (userData) {
      const payload = { userId: userData?.id };
      dispatch(fetchAsyncFundingSources({ userId: userData.id })).then(() => {
        setLoading(false);
        dispatch(resetLoading());
      });
    }
  }, [userData]);

  // const iavToken= useAppSelector(selectIavToken)
  // const cards = walletData ? walletData.paymentMethods : [];

  const funds = useAppSelector(selectWalletFundsData);
  const { enqueueSnackbar } = useSnackbar();

  // let dwollaComponent

  const handleDeleteCardInititiate = (cardId: string) => {
    setDeleteConfirmationOpen(true);
    setCurrentFundingSourceId(cardId);
  };

  const handleCloseConfirmationDialog = (success: boolean) => {
    setDeleteConfirmationOpen(false);
    success &&
      dispatch(fetchAsyncFundingSources({ userId: userData.id })).then(() => {
        setLoading(false);
        dispatch(resetLoading());
        // handleCreateCard();
        // handleClose();
      });

    // dispatch(walltda)
  };
  const handleCloseAddFundingSourceDialog = (success: boolean) => {
    setAddCardModalOpen(false);
    if (success) {
      dispatch(fetchAsyncFundingSources({ userId: userData.id })).then(() => {
        setLoading(false);
        dispatch(resetLoading());
        // handleCreateCard();
        // handleClose();
      });
    }
    // dispatch(walltda)
  };

  const handleDeleteCard = () => {
    currentFundingSourceId &&
      dispatch(
        removeAsyncFundingSource({
          userId: userData.id,
          fundingSourceId: currentFundingSourceId,
        })
      )
        .then(() => dispatch(fetchAsyncFundingSources({ userId: userData.id })))
        .then(() => {
          setLoading(false);
          dispatch(resetLoading());
          // handleCreateCard();
          // handleClose();
        });
  };

  const handleAddCardInitiate = () => {
    setLoading(true);
    dispatch(generateAsyncIavToken({ userId: userData.id })).then(
      (response) => {
        if (response.type == "wallet/generateIavToken/fulfilled") {
          const iavToken = response.payload.data;
          setIavToken(iavToken);
          setAddCardModalOpen(true);

          setTimeout(() => {
            setLoading(false);
            dispatch(resetLoading());
          }, 500);
        } else {
          return;
        }
      }
    );
  };

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
    setTabIndex(3);
    setVerifyModalOpen(false);
  };

  const handleClose = () => {
    setVerifyModalOpen(false);
  };

  return (
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
            100% Deposit Match in immediately playable funds up to $50
          </Typography>
          <Typography
            align="center"
            variant="caption"
            className="w-full text-white"
          >
            First deposit only. State restrictions apply.
          </Typography>
        </Grid>
      </Grid>
      <Grid item xs={12} container alignContent="center">
        <Grid item xs={12}>
          <Typography variant={isSmall ? "h6" : "h5"}>
            Funding Sources
          </Typography>
          This information is for TopProp’s private use only. By adding your
          bank information, you can fund your wallet and withdraw your profits
          for direct deposit.
          <Divider className="my-2" />
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
          <Grid container spacing={2}>
            {/* {fundingSources.map((foundingSource: FundingSourceData) => {
              return (
                <Box key={foundingSource.id}>
                  <FundingSource
                    fundingSource={foundingSource}
                    handleDeleteCard={handleDeleteCardInititiate}
                  />
                </Box>
              );
            })} */}
          </Grid>
        </Grid>
      </Grid>

      <ConfirmationDialog
        open={isDeleteConfrimationOpen}
        handleClose={handleCloseConfirmationDialog}
        handleConfirm={handleDeleteCard}
        titleText="Delete this funding source?"
        descriptionText="This action cannot be reversed. It will remove this funding source from your account"
        agreeText="Delete Funding Source"
      />

      <CreateFundingSourceModal
        open={isAddCardModalOpen}
        iavToken={iavToken}
        handleClose={handleCloseAddFundingSourceDialog}
      />

      <Grid container></Grid>

      <Grid item xs={12} container alignContent="center">
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
                      <Grid
                        className={classes.flexContainer}
                        item
                        xs={6}
                        sm={6}
                        md={4}
                        lg={2}
                      >
                        <ButtonBase
                          onClick={() => {
                            handleAddCardInitiate();
                          }}
                          disableRipple
                          className="w-full"
                          disabled={loading}
                        >
                          <MuiCard
                            className={clsx(
                              "rounded-2xl",
                              "h-64",
                              "px-4",
                              "pb-2",
                              "w-80",
                              "m-auto"
                            )}
                          >
                            <Box className="p-2 h-full">
                              <Grid
                                container
                                justify="center"
                                alignContent="center"
                                className="h-full"
                              >
                                <Grid item xs={12} container justify="center">
                                  {!loading && (
                                    <AddIcon
                                      color="primary"
                                      fontSize="large"
                                      className="text-6xl"
                                    />
                                  )}
                                  {loading && (
                                    <CircularProgress
                                      size={24}
                                      className="top-1/2 left-1/2 -mt-3 -ml-3"
                                    />
                                  )}
                                </Grid>

                                <Grid item xs={12} container justify="center">
                                  <Typography
                                    color="primary"
                                    variant="h6"
                                    align="center"
                                  >
                                    add funding source
                                  </Typography>
                                </Grid>
                              </Grid>
                            </Box>
                          </MuiCard>
                        </ButtonBase>
                      </Grid>
                      {fundingSources.map(
                        (fundingSource: FundingSourceData) => {
                          return (
                            <SelectionFundingSource
                              key={fundingSource.id}
                              fundingSource={fundingSource}
                              selectedFundingSource={
                                values.fundingSourceDetails
                              }
                              handleDeleteCard={handleDeleteCardInititiate}
                            />
                          );
                        }
                      )}
                    </Grid>
                    <Grid item xs={12} container>
                      <Divider className="my-4" />
                    </Grid>
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
                        {!isVerified  ? (
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
export default Wallet;
