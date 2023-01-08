import * as React from "react";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useLocation } from "react-router-dom";
import { Formik, Field } from "formik";
import { useSnackbar } from "notistack";
import Popover from "@material-ui/core/Popover";
import { debounce } from "lodash";

import routes from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";

import DoneSharpIcon from "@material-ui/icons/DoneSharp";
import FiberManualRecordSharpIcon from "@material-ui/icons/FiberManualRecordSharp";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import InfoIcon from "@material-ui/icons/Info";
import CloseIcon from "@material-ui/icons/Close";

import { Checkbox, TextField } from "formik-material-ui";

import registerSchema from "../../constants/schemas/register";

import { RegisterPayloadInterface } from "./interfaces";

import { doAsyncRegistration } from "../../redux/thunks/register";
import { resetLoading } from "../../redux/reducers/registrationSlice";

import { selectRegistrationData } from "../../redux/selectors/registration";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import TPLogo from "../../icons/logo/TopProp_Full_Logo.png";
// import useBreakpoint from "../../hooks/useBreakpoint";

import useStyles from "./styles";
import { useEffect } from "react";
import { fetchAsyncUserState } from "../../redux/thunks/users";
import { selectUserStateData } from "../../redux/selectors/users";
import { LOCATION_MESSAGES } from "../../constants/mocked/messages";
import { KeyboardDatePicker } from "formik-material-ui-pickers";
import moment, { Moment } from "moment";

const specialChars = [".", ".", "_"];

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Register = () => {
  const classes = useStyles();
  let query = useQuery();
  const dispatch: AppDispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState(null);
  const [minChar, setMinChar] = useState(false);
  const [maxChar, setMaxChar] = useState(false);
  const [conUpCase, setConUpCase] = useState(false);
  const [conNo, setConNo] = useState(false);
  const [conSpecChar, setConSpecChar] = useState(false);
  const [userNamePattern, setUserNamePattern] = useState(false);
  const [hasGeolocation, setHasGeolocation] = useState(false);
  const userState = useAppSelector(selectUserStateData);
  const returnUrl = query.get("returnUrl");
  // const point = useBreakpoint();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    // handleClickShowPassword("password");
  };

  let history = useHistory();

  const redirect = () => {
    history.push({
      pathname: routes.public.login,
      search: returnUrl ? `returnUrl=${returnUrl}` : "",
    });
  };

  const handleClickShowPassword = (field: string) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConPassword(!showConPassword);
    }
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  const registrationData = useAppSelector(selectRegistrationData);
  const token = registrationData ? registrationData.data : null;
  const user = registrationData ? registrationData.user : null;

  useEffect(() => {
    enqueueSnackbar("May require you to update your location settings", {
      anchorOrigin: { horizontal: "right", vertical: "top" },
      variant: "warning",
      preventDuplicate: true,
      autoHideDuration: 10000,
    });
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        getCoordinates,
        handleLocationError
      );
    } else {
      setHasGeolocation(false);
      enqueueSnackbar(LOCATION_MESSAGES.LOCATION_NOT_SUPPORTED, {
        variant: "default",
      });
    }
  }, []);

  const getCoordinates = (position: any) => {
    setHasGeolocation(true);
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    reverseGeocodeCoordinates(lat, lon);
  };

  const reverseGeocodeCoordinates = (lat: number, lon: number) => {
    dispatch(
      fetchAsyncUserState({
        locationData: { lat: lat, lon: lon },
      })
    ).then((response) => {
      if (response.type == "users/state/fulfilled") {
        setTimeout(() => {
          dispatch(resetLoading());
        }, 3000);
      } else {
        return;
      }
    });
  };

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleLocationError = (error: any) => {
    setHasGeolocation(false);
    switch (error.code) {
      case error.PERMISSION_DENIED:
        enqueueSnackbar(LOCATION_MESSAGES.PERMISSION_DENIED, {
          variant: "default",
        });
        break;
      case error.POSITION_UNAVAILABLE:
        enqueueSnackbar(LOCATION_MESSAGES.POSITION_UNAVAILABLE, {
          variant: "default",
        });
        break;
      case error.TIMEOUT:
        enqueueSnackbar(LOCATION_MESSAGES.TIMEOUT, {
          variant: "default",
        });
        break;
      case error.UNKNOWN_ERROR:
        enqueueSnackbar(LOCATION_MESSAGES.UNKNOWN_ERROR, {
          variant: "default",
        });
        break;
      default:
        enqueueSnackbar(LOCATION_MESSAGES.DEFAULT_ERROR, {
          variant: "default",
        });
        break;
    }
  };

  const handleSignupAttempt = (
    values: RegisterPayloadInterface,
    setSubmitting: Function
  ) => {
    if (!userState) {
      enqueueSnackbar(LOCATION_MESSAGES.POSITION_UNAVAILABLE, {
        variant: "default",
      });
    }

    const stateLevel = userState?.results?.filter((addresses: any) => {
      return addresses.types.includes("administrative_area_level_1");
    })[0];

    const state = stateLevel?.address_components?.filter((component: any) => {
      return component.types.includes("administrative_area_level_1");
    })[0];

    const country = stateLevel?.address_components?.filter((component: any) => {
      return component.types.includes("country");
    })[0];

    dispatch(
      doAsyncRegistration({
        fullName: values.fullName,
        username: values.username,
        email: values.email,
        phone: values.phone,
        password: values.password,
        confirmPassword: values.confirmPassword,
        promo: values.promo,
        signUpState: userState ? state.short_name : "",
        signUpCountry: userState ? country.short_name : "",
        dateOfBirth: values.dateOfBirth,
        // signUpCountry: "US",
      })
    ).then((response) => {
      if (response.type == "authentication/register/fulfilled") {
        localStorage.setItem("token", token);
        enqueueSnackbar("Account Registered Successfully. Please Login", {
          variant: "success",
        });
        redirect();
      } else {
        return;
      }
    });
  };

  const makeUserName = () => {
    let passwd = "";
    const chars =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for (let i = 1; i <= 5; i++) {
      var c = Math.floor(Math.random() * chars.length + 1);
      passwd += chars.charAt(c);
    }

    const index = Math.floor(Math.random() * 3 + 1);
    passwd += specialChars[index];

    for (let i = 1; i <= 5; i++) {
      var c = Math.floor(Math.random() * chars.length + 1);
      passwd += chars.charAt(c);
    }

    for (let i = 1; i <= 5; i++) {}

    return passwd;
  };
  const ptemp1 = makeUserName();

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | Signup</title>
      </Helmet>
      <Grid className="h-screen" container>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={12}
          alignItems="center"
          justify="center"
        >
          <Grid
            item
            container
            direction="column"
            justify="center"
            xs={12}
            sm={8}
            md={6}
            lg={4}
            className="p-6"
          >
            <Grid item xs={12} container justify="center" className="mb-4">
              <img src={TPLogo} alt="TopProp" className="w-full" />
            </Grid>
            <Card>
              <Box px={2} py={4}>
                <Grid
                  item
                  container
                  direction="row"
                  justify="flex-start"
                  alignItems="center"
                  xs={12}
                >
                  <Grid item xs={12}>
                    <Typography variant="h5" align="left" className="pr-20">
                      Signup
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" className="float-left">
                      Already have an account?{" "}
                    </Typography>
                    <Link
                      to={{
                        pathname: routes.public.login,
                        search: returnUrl ? `returnUrl=${returnUrl}` : "",
                      }}
                      className="float-left ml-1"
                    >
                      <Typography
                        variant="body1"
                        color="primary"
                        className="font-bold"
                      >
                        Login
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
                <div className="spacer__1" />
                <Formik
                  initialValues={{
                    fullName: "",
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    confirmPassword: "",
                    dateOfBirth: moment()
                      .subtract(18, "years")
                      .subtract(1, "days"),
                    promo: query.get("promo") ?? "",
                    tosAccepted: false,
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    handleSignupAttempt(values, setSubmitting);
                  }}
                  validationSchema={registerSchema}
                >
                  {(props) => {
                    const {
                      values,
                      dirty,
                      isValid,
                      isSubmitting,
                      handleSubmit,
                      setFieldValue,
                      errors,
                      touched,
                    } = props;

                    const usernamePassValidator = (fieldData: string) => {
                      const usernamePattern =
                        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]/;
                      setUserNamePattern(
                        fieldData.match(usernamePattern) ? true : false
                      );

                      const specialCharPattern = /[`@$!%*#?&']/;
                      setConSpecChar(
                        fieldData.match(specialCharPattern) ? true : false
                      );

                      // const isCussWord = JSON.stringify(cuss).includes(fieldData);
                      setMinChar(fieldData.length >= 4 ? true : false);
                      setMaxChar(fieldData.length <= 20 ? true : false);
                    };
                    const handleOnChange = (e: any, field: string) => {
                      e.preventDefault();
                      if (field === "username")
                        usernamePassValidator(e.target.value);
                      setFieldValue(field, e.target.value);
                    };
                    return (
                      <form onSubmit={handleSubmit}>
                        <Grid
                          container
                          item
                          direction="column"
                          alignItems="stretch"
                          xs={12}
                        >
                          <Grid item xs={12} className="pb-4 mt-4">
                            <Field
                              component={TextField}
                              name="fullName"
                              type="text"
                              label="Full Legal Name*"
                              fullWidth
                              value={values.fullName}
                            />
                          </Grid>
                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="username"
                              type="text"
                              label="Username*"
                              fullWidth
                              value={values.username}
                              onChange={(e: any) =>
                                handleOnChange(e, "username")
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton
                                      aria-label="toggle info"
                                      onClick={handleClick}
                                      onMouseDown={handleClose}
                                      edge="end"
                                      className={classes.Button}
                                    >
                                      <InfoIcon />
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="email"
                              type="text"
                              label="Email*"
                              fullWidth
                              value={values.email}
                            />
                          </Grid>
                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="phone"
                              type="text"
                              label="Phone"
                              fullWidth
                              value={values.phone}
                            />
                          </Grid>

                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={KeyboardDatePicker}
                              label="Date of Birth"
                              // inputVariant="outlined"
                              // variant="inline"
                              name="dateOfBirth"
                              format="MM/DD/YYYY"
                              maxDate={moment().subtract(18, "years")}
                              type="text"
                              fullWidth
                              value={values.dateOfBirth}
                              onChange={(
                                date: Moment,
                                value: string | null
                              ) => {
                                setFieldValue("dateOfBirth", date);
                              }}
                              required
                            />
                          </Grid>

                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="password"
                              type={showPassword ? "text" : "password"}
                              label="Password*"
                              fullWidth
                              value={values.password}
                              onChange={(e: any) =>
                                handleOnChange(e, "password")
                              }
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={(e) => {
                                        handleClickShowPassword("password");
                                      }}
                                      edge="end"
                                    >
                                      {showPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>
                          <Popover
                            // id="simple-menu"
                            open={Boolean(anchorEl)}
                            anchorEl={anchorEl}
                            onClose={handleClose}
                            onMouseDown={handleClose}
                            anchorOrigin={{
                              vertical: "center",
                              horizontal: "right",
                            }}
                            transformOrigin={{
                              vertical: "center",
                              horizontal: "left",
                            }}
                          >
                            <div className={classes.popover}>
                              <Grid
                                container
                                justify="space-between"
                                alignContent="center"
                              >
                                <Grid
                                  item
                                  xs
                                  container
                                  direction="column"
                                  justify="center"
                                >
                                  <Typography variant="subtitle2">
                                    Requirements
                                  </Typography>
                                </Grid>
                                <IconButton
                                  aria-label="close info"
                                  onClick={handleClose}
                                  edge="end"
                                  className="py-0"
                                >
                                  <CloseIcon />
                                </IconButton>
                              </Grid>
                              <Divider className={classes.spacer} />
                              <ul>
                                <li>
                                  <Typography variant="caption">
                                    {minChar ? (
                                      <DoneSharpIcon
                                        className={classes.checklistIconColor}
                                      />
                                    ) : (
                                      <FiberManualRecordSharpIcon
                                        className={classes.checklistIcon}
                                      />
                                    )}
                                    &nbsp;Minimum of 4 Characters
                                  </Typography>
                                </li>
                                <li>
                                  <Typography variant="caption">
                                    {maxChar ? (
                                      <DoneSharpIcon
                                        className={classes.checklistIconColor}
                                      />
                                    ) : (
                                      <FiberManualRecordSharpIcon
                                        className={classes.checklistIcon}
                                      />
                                    )}
                                    &nbsp;Maximum of 20 Characters
                                  </Typography>
                                </li>

                                {/* <li>
                                  <Typography variant="caption">
                                    {userNamePattern ? (
                                      <DoneSharpIcon
                                        className={classes.checklistIconColor}
                                      />
                                    ) : (
                                      <FiberManualRecordSharpIcon
                                        className={classes.checklistIcon}
                                      />
                                    )}
                                    &nbsp;Must contain at least one letter, one
                                    number and one special character
                                  </Typography>
                                </li> */}
                                <li>
                                  <Typography variant="caption">
                                    <FiberManualRecordSharpIcon
                                      className={classes.checklistIcon}
                                    />
                                    &nbsp;No spaces are permitted. Username must
                                    be a single word
                                  </Typography>
                                </li>
                                {/* <li>
                                  <Typography variant="caption">
                                    {conSpecChar ? (
                                      <DoneSharpIcon
                                        className={classes.checklistIconColor}
                                      />
                                    ) : (
                                      <FiberManualRecordSharpIcon
                                        className={classes.checklistIcon}
                                      />
                                    )}
                                    &nbsp;One of the following special chars
                                    only ! , @ , # , $ , % , ^ , & , *
                                  </Typography>
                                </li> */}
                              </ul>
                            </div>
                          </Popover>

                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="confirmPassword"
                              type={showConPassword ? "text" : "password"}
                              label="Confirm Password*"
                              fullWidth
                              value={values.confirmPassword}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={() =>
                                        handleClickShowPassword("confirm")
                                      }
                                      edge="end"
                                    >
                                      {showConPassword ? (
                                        <Visibility />
                                      ) : (
                                        <VisibilityOff />
                                      )}
                                    </IconButton>
                                  </InputAdornment>
                                ),
                              }}
                            />
                          </Grid>

                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="promo"
                              type="text"
                              label="Promo Code"
                              inputProps={{
                                className: "uppercase",
                              }}
                              fullWidth
                              value={values.promo}
                            />
                          </Grid>
                          <Grid item xs={12} className="pb-4">
                            <Grid container alignItems="center" wrap="nowrap">
                              <Grid item xs={2}>
                                <Field
                                  component={Checkbox}
                                  name="tosAccepted"
                                  type="checkbox"
                                  className="pl-0"
                                  color="primary"
                                  value={values.tosAccepted}
                                  checked={values.tosAccepted}
                                  onChange={(event: any) => {
                                    setFieldValue(
                                      "tosAccepted",
                                      event.target.checked
                                    );
                                  }}
                                />
                              </Grid>
                              <Typography align="left" className={classes.tos}>
                                By checking this box you agree to&nbsp;
                                <Link
                                  to={routes.public.termsOfService}
                                  className={classes.externalLink}
                                >
                                  Our Terms of Service
                                </Link>
                                &nbsp;and&nbsp;
                                <Link
                                  to={routes.public.privacyPolicy}
                                  className={classes.externalLink}
                                >
                                  Privacy Policy
                                </Link>
                                , &nbsp;as well as our partner&nbsp;
                                <a
                                  href="https://www.dwolla.com/legal/dwolla-account-terms-of-service/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.externalLink}
                                >
                                  Dwolla's Terms of Service
                                </a>
                                &nbsp;and&nbsp;
                                <a
                                  href="https://www.dwolla.com/legal/privacy/"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.externalLink}
                                >
                                  Dwolla's Privacy Policy
                                </a>
                                , &nbsp;and our banking partner Evolve Bank &
                                Trust's&nbsp;
                                <a
                                  href="https://www.dwolla.com/legal/virtual-account-number-business-account-demand-deposit-agreement-2/#legal-content"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.externalLink}
                                >
                                  Customer Account Terms
                                </a>
                                &nbsp;and&nbsp;
                                <a
                                  href="https://assets.getevolved.com/cdnevolve/privacy-policy/Consumer-Privacy-Policy-Notice---9.15.20-Final.pdf"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.externalLink}
                                >
                                  Privacy Notice
                                </a>
                                .
                              </Typography>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography variant="caption" color="error">
                                {errors.tosAccepted && touched.tosAccepted
                                  ? errors.tosAccepted
                                  : ""}
                              </Typography>
                            </Grid>
                          </Grid>

                          <Grid
                            container
                            item
                            xs={12}
                            className="pb-4"
                            direction="row"
                            justify="flex-end"
                          >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                              <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                                className={classes.signUpButton}
                                fullWidth
                                disabled={isSubmitting}
                                disableElevation
                              >
                                Sign Up
                              </Button>
                            </Grid>
                            <Grid item xs={12} justify="flex-end" container>
                              <Typography className={classes.tos}>
                                By registering, you agree to TopProp's&nbsp;
                                <a
                                  href="https://www.toppropsports.com/faq"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={classes.externalLink}
                                >
                                  Contest Rules
                                </a>
                                .
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </form>
                    );
                  }}
                </Formik>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default Register;
