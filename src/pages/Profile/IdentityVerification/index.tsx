import React, { ReactElement, Fragment, useState, useEffect } from "react";
import moment, { Moment } from "moment";
import { Formik, Field, FormikProps } from "formik";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Link from "@material-ui/core/Link";

import ErrorIcon from "@material-ui/icons/Error";
import HelpIcon from "@material-ui/icons/Help";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

import Select from "react-select";
import { TextField } from "formik-material-ui";
import { KeyboardDatePicker } from "formik-material-ui-pickers";

import FileUploadField from "../../../components/FileUploadField";
import DialogTitle from "../../../components/DialogTitle";

import { useSnackbar } from "notistack";

import identityVerificationSchema from "../../../constants/schemas/identityVerificationSchema";
import { USStates } from "../../../constants/mocked/states";

import { IdentityVerificationForm } from "./interfaces";
import useStyles from "./styles";

import {
  AppDispatch,
  useAppDispatch,
  useAppSelector,
} from "../../../redux/store";

import {
  fetchAsyncWallet,
  addAsyncIdVerification,
  verifyAsyncFile,
} from "../../../redux/thunks/wallet";
import { resetLoading } from "../../../redux/reducers/walletSlice";

import { selectUserData } from "../../../redux/selectors/authentication";
import { selectWalletData } from "../../../redux/selectors/wallet";
import { SportsRugbySharp } from "@material-ui/icons";
import { selectUserInfoData } from "../../../redux/selectors/users";
import { UserInfo } from "../../../typings/interfaces/users";

const IdentityVerification = () => {
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [isModalOpen, setModalOpen] = useState(false);

  const classes = useStyles();

  const { enqueueSnackbar } = useSnackbar();

  const dispatch: AppDispatch = useAppDispatch();

  const userData = useAppSelector<UserInfo>(selectUserInfoData);
  const userInfoData = useAppSelector<UserInfo>(selectUserInfoData);
  const walletData = useAppSelector(selectWalletData);

  useEffect(() => {
    const payload = { userId: userData?.id };
    var walletPromise = dispatch(fetchAsyncWallet(payload));

    Promise.all([walletPromise]).then((values) => {
      dispatch(resetLoading());
    });
  }, []);

  const userVerificationStatus = walletData?.status;
  const isVerified = userVerificationStatus === "verified";
  const isUnverified = userVerificationStatus === "unverified";
  const isRetry = userVerificationStatus === "retry";
  const isSuspended = userVerificationStatus === "suspended";
  const isDeactivated = userVerificationStatus === "deactivated";
  const isDocument = userVerificationStatus === "document";
  const idVerificationUploaded = userInfoData?.verificationFileUploaded;
  const verificationFileName = userInfoData?.verificationFileName;

  const handleVerificationAttempt = (values: IdentityVerificationForm) => {
    if (isUnverified || isRetry) {
      return dispatch(
        addAsyncIdVerification({
          userId: userData.id,
          identificationData: {
            address1: values.address1,
            city: values.city,
            phone: values.phone,

            postalCode: values.zipcode,
            state: values.state ? values.state.value.key : "",

            dateOfBirth: moment(values.dateOfBirth)
              .startOf("day")
              .format("YYYY-MM-DD"), // FORMAT REQUIRED BY DWOLLA

            firstName: values.firstName,
            lastName: values.lastName,
            ssn: values.ssn,
          },
        })
      ).then((response) => {
        if (response.type == "wallet/profileVerification/fulfilled")
          dispatch(fetchAsyncWallet({ userId: userData.id })).then(() => {
            dispatch(resetLoading());
          });
      });
    }
    if (isDocument) {
      const frontFormData = new FormData();
      frontFormData.append("verification-file", values.file || "");
      return dispatch(
        verifyAsyncFile({
          userId: userData.id,
          formData: frontFormData,
        })
      )
        .then((values) => {
          setModalOpen(true);
          return dispatch(fetchAsyncWallet({ userId: userData.id }));
        })
        .then(() => {
          dispatch(resetLoading());
        });
    }
  };

  const fetchVerificationConfig = (status: string) => {
    let logo: string | ReactElement = "";
    let color: string = "";
    let text: string = "";
    switch (status) {
      case "unverified":
        logo = <ErrorIcon />;
        color = "text-red-500";
        text = "unverified";
        break;
      case "suspended":
        logo = <ErrorIcon />;
        color = "text-red-500";
        text = "suspended";
        break;
      case "document":
        logo = <HelpIcon />;
        color = "text-blue-500";
        text = "provide document";
        break;
      case "retry":
        logo = <HelpIcon />;
        color = "text-blue-500";
        text = "retry";
        break;
      case "verified":
        logo = <CheckCircleIcon />;
        color = "text-green-500";
        text = "verified";
        break;
      default:
      // code block
    }
    return { logo, color, text };
  };

  const config = fetchVerificationConfig(userVerificationStatus);

  const stateDropdownData = USStates.map((state) => {
    return {
      label: state.text,
      value: {
        key: state.value,
      },
    };
  });

  const selectedState = stateDropdownData.find((state) => {
    return walletData?.state === state.value.key;
  });

  const countryDropdownData = [
    {
      label: "US",
      value: { key: "US" },
    },
  ];

  return (
    <Grid container direction="column" spacing={4}>
      <Grid item xs={12} container alignContent="center">
        <Grid item xs={6}>
          <Typography variant={isSmall ? "h6" : "h5"}>
            Account Verification
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          container
          direction="column"
          justify="center"
          alignContent="flex-end"
          className={config.color}
        >
          <Grid item container justify="flex-end">
            {config.logo}
            <Typography variant="body1">{config.text}</Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className="px-2">
        <Formik
          initialValues={{
            firstName: walletData?.firstName ?? "",
            lastName: walletData?.lastName ?? "",
            ssn: isVerified ? "****" : walletData?.ssn ?? "",
            dateOfBirth: userInfoData.dateOfBirth
              ? moment(userInfoData.dateOfBirth)
              : moment().subtract(18, "years"),
            address1: walletData?.address1 ?? "",
            city: walletData?.city ?? "",
            state: selectedState || null,
            phone: (walletData?.phone || userInfoData?.phone ) ?? "",
            zipcode: walletData?.postalCode ?? "",
            file: null,
            // uploadBack: null,
          }}
          validationSchema={identityVerificationSchema(
            isRetry || isDocument ? 9 : 4
          )}
          onSubmit={(values, { setSubmitting }) => {
            handleVerificationAttempt(values)?.then(() => {
              setSubmitting(false);
            });
          }}
        >
          {({
            values,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }: FormikProps<IdentityVerificationForm>) => {
            return (
              <form>
                <Grid container className="p-3 mt-4" spacing={3}>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Field
                      component={TextField}
                      size="small"
                      label="First Name"
                      variant="outlined"
                      name="firstName"
                      type="text"
                      fullWidth
                      disabled={isVerified || isDeactivated || isSuspended}
                      value={values.firstName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("firstName", e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Field
                      component={TextField}
                      size="small"
                      label="Last Name"
                      variant="outlined"
                      name="lastName"
                      disabled={isVerified || isDeactivated || isSuspended}
                      type="text"
                      fullWidth
                      value={values.lastName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("lastName", e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Field
                      component={TextField}
                      size="small"
                      label={
                        isRetry || isDocument
                          ? "Full Social Security Number"
                          : "Social Security Number (Last 4)"
                      }
                      variant="outlined"
                      name="ssn"
                      type="text"
                      fullWidth
                      disabled={isVerified || isDeactivated || isSuspended}
                      value={values.ssn}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("ssn", e.target.value);
                      }}
                      required
                      minLength={4}
                      maxLength={9}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Field
                      component={KeyboardDatePicker}
                      size="small"
                      label="Date of Birth"
                      inputVariant="outlined"
                      name="dateOfBirth"
                      disabled={isVerified}
                      format="MM/DD/YYYY"
                      maxDate={moment().subtract(18, "years")}
                      type="text"
                      fullWidth
                      value={values.dateOfBirth}
                      onChange={(date: Moment, value: string | null) => {
                        setFieldValue("dateOfBirth", date);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Field
                      component={TextField}
                      size="small"
                      label="Address"
                      variant="outlined"
                      name="address1"
                      disabled={isVerified || isDeactivated || isSuspended}
                      type="text"
                      fullWidth
                      value={values.address1}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("address1", e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Field
                      component={TextField}
                      size="small"
                      label="City"
                      variant="outlined"
                      name="city"
                      disabled={isVerified || isDeactivated || isSuspended}
                      type="text"
                      fullWidth
                      value={values.city}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("city", e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    <Field
                      component={TextField}
                      size="small"
                      label="Phone"
                      variant="outlined"
                      name="phone"
                      disabled={isVerified || isDeactivated || isSuspended}
                      type="text"
                      fullWidth
                      value={values.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("phone", e.target.value);
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Select
                      className=""
                      isClearable
                      isSearchable
                      placeholder="Select State"
                      value={values.state}
                      isDisabled={selectedState !== undefined || isVerified}
                      name="state"
                      styles={{
                        control: (provided) => ({
                          ...provided,
                          backgroundColor: "none",
                          fontSize: "1rem",
                        }),
                      }}
                      menuPortalTarget={document.body}
                      options={stateDropdownData}
                      onChange={(selectedState) => {
                        setFieldValue("state", selectedState);
                      }}
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={3} lg={3}>
                    <Field
                      component={TextField}
                      size="small"
                      label="Zip Code"
                      variant="outlined"
                      name="zipcode"
                      disabled={isVerified || isDeactivated || isSuspended}
                      autoComplete=""
                      type="text"
                      fullWidth
                      value={values.zipcode}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setFieldValue("zipcode", e.target.value);
                      }}
                      required
                    />
                  </Grid>

                  {isDocument && (
                    <React.Fragment>
                      <Grid item xs={12}>
                        {idVerificationUploaded && verificationFileName ? (
                          <React.Fragment>
                            {verificationFileName}{" "}
                            <CheckCircleIcon className={"text-green-500"} />
                            <Typography>
                              Your Id is in review, we will let you know once we
                              have some news about it.
                            </Typography>
                          </React.Fragment>
                        ) : (
                          <Typography>
                            Please upload an image (PNG or JPG) of a government
                            issued ID, like a Driver’s License or Passport (9mb
                            max).
                          </Typography>
                        )}
                      </Grid>
                      {!idVerificationUploaded && !verificationFileName && (
                        <Grid item xs={12} sm={6} md={6} lg={6}>
                          <Field
                            className={classes.uploadButtons}
                            name="file"
                            component={FileUploadField}
                            label="Upload Verification File"
                            size={9}
                            setFieldValue={(file: any) =>
                              setFieldValue("file", file)
                            }
                          />
                        </Grid>
                      )}
                    </React.Fragment>
                  )}
                  <Grid
                    item
                    xs={12}
                    md={6}
                    container
                    justify="flex-start"
                    className="mt-2"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      container
                      alignContent="flex-start"
                      justify="flex-start"
                    >
                      {/* @ts-ignore */}
                      <Button
                        fullWidth
                        size="large"
                        variant="outlined"
                        color="primary"
                        component={Link}
                        href="https://topprop-static-assets.s3.us-west-2.amazonaws.com/ID_Verification.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        download
                      >
                        Download Instructions
                      </Button>
                    </Grid>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    md={6}
                    container
                    justify="flex-end"
                    className="mt-2"
                  >
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      container
                      alignContent="flex-end"
                      justify="flex-end"
                      className="my-auto"
                    >
                      <Button
                        onClick={() => {
                          handleSubmit();
                        }}
                        fullWidth
                        size="large"
                        disabled={
                          isVerified ||
                          isSubmitting ||
                          isDeactivated ||
                          isSuspended
                        }
                        variant="contained"
                        color="primary"
                      >
                        Submit Verification
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </form>
            );
          }}
        </Formik>
      </Grid>
      <Dialog
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        fullWidth
        maxWidth="sm"
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle onClose={() => setModalOpen(false)}>
          Verification File Submitted
        </DialogTitle>
        <Fragment>
          <DialogContent>
            <Typography>
              Your file has been submitted. We will let you know once this is
              approved.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Grid container justify="flex-end">
              <Grid
                item
                xs={12}
                sm={6}
                md={6}
                lg={4}
                container
                justify="center"
              >
                <Button
                  onClick={() => {
                    setModalOpen(false);
                  }}
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  I Understand
                </Button>
              </Grid>
            </Grid>
          </DialogActions>
        </Fragment>
      </Dialog>
    </Grid>
  );
};
export default IdentityVerification;
