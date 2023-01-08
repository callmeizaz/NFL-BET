import React, { Fragment, useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Formik, Field } from "formik";
// import { Redirect } from "react-router-dom";

import routes from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { TextField } from "formik-material-ui";

import { useHistory, useLocation } from "react-router-dom";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import { resetLoading } from "../../redux/reducers/authenticationSlice";
import {
  resetPlayerData,
  resetOpponentData,
} from "../../redux/reducers/playersSlice";
import { doAsyncLogin } from "../../redux/thunks/authentication";

import { selectUserStateData } from "../../redux/selectors/users";

import { LoginPayload } from "./interfaces";
import loginSchema from "../../constants/schemas/login";

import TPLogo from "../../icons/logo/TopProp_Full_Logo.png";
import { fetchAsyncUserState } from "../../redux/thunks/users";
import { useSnackbar } from "notistack";
import { LOCATION_MESSAGES } from "../../constants/mocked/messages";
import { APP_ENV } from "../../constants/config";
import Footer from "../../components/Footer";

const Login = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSnackbarOpen, setSnackbarOpen] = useState(false);
  const [hasGeolocation, setHasGeolocation] = useState(false);
  const userState = useAppSelector(selectUserStateData);

  const { enqueueSnackbar } = useSnackbar();

  let history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const returnUrl = params.get("returnUrl");

  const handleLoginAttempt = (
    values: LoginPayload,
    setSubmitting: Function
  ) => {
    const stateLevel = userState?.results?.filter((addresses: any) => {
      return addresses.types.includes("administrative_area_level_1");
    })[0];

    const state = stateLevel?.address_components?.filter((component: any) => {
      return component.types.includes("administrative_area_level_1");
    })[0];

    const country = stateLevel?.address_components?.filter((component: any) => {
      return component.types.includes("country");
    })[0];

    setSubmitting(true);
    const fallbackCountry = APP_ENV === "development" ? "IN" : "";
    const fallbackState = APP_ENV === "development" ? "GA" : "";
    dispatch(
      doAsyncLogin({
        emailOrUsername: values.emailOrUsername,
        password: values.password,
        state: userState && state ? state?.short_name : fallbackState,
        // state: "AL",
        country: userState && country ? country?.short_name : fallbackCountry,
        // country: "US",
      })
    ).then((response) => {
      setSubmitting(false);
      if (response.type == "authentication/login/fulfilled") {
        setTimeout(() => {
          dispatch(resetLoading());
        }, 3000);
      } else {
        return;
      }
    });
  };

  const handleClose = (event: React.SyntheticEvent, reason: string | null) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  useEffect(() => {
    dispatch(resetPlayerData());
    dispatch(resetOpponentData());
  }, []);

  useEffect(() => {
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

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | Login</title>
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
            <Grid className="mb-2">
              <Typography variant="h4" align="center">
                Welcome to TopProp!
              </Typography>
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
                      Login
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1" className="float-left">
                      Not a Member?{" "}
                    </Typography>
                    <Link
                      to={{
                        pathname: routes.public.register,
                        search: returnUrl ? `returnUrl=${returnUrl}` : "",
                      }}
                      className="float-left ml-1"
                    >
                      <Typography
                        variant="body1"
                        color="primary"
                        className="font-bold"
                      >
                        Sign up now
                      </Typography>
                    </Link>
                  </Grid>
                </Grid>
                {/* <button onClick={methodDoesNotExist}>Break the world</button> */}
                <Formik
                  initialValues={{ emailOrUsername: "", password: "" }}
                  validationSchema={loginSchema}
                  onSubmit={(values, { setSubmitting }) => {
                    handleLoginAttempt(values, setSubmitting);
                  }}
                >
                  {(props) => {
                    const { dirty, handleSubmit, isSubmitting } = props;
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
                              name="emailOrUsername"
                              type="text"
                              label="Email or Username"
                              fullWidth
                            />
                          </Grid>

                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="password"
                              type={showPassword ? "text" : "password"}
                              label="Password"
                              fullWidth
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment position="start">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                      onMouseDown={handleMouseDownPassword}
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

                          <Grid
                            item
                            xs={12}
                            className="pb-4"
                            container
                            justify="flex-end"
                          >
                            <Link to={routes.public.forgotPassword}>
                              <Typography
                                variant="body1"
                                color="primary"
                                align="right"
                                className="font-bold"
                              >
                                Forgot Password
                              </Typography>
                            </Link>
                          </Grid>
                          <Grid
                            container
                            item
                            xs={12}
                            direction="row"
                            justify="flex-end"
                          >
                            <Grid item xs={12} sm={12} md={6} lg={4}>
                              <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={!hasGeolocation || isSubmitting}
                                disableElevation
                              >
                                Login
                              </Button>
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
        <Footer hideBorder />
      </Grid>

      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={isSnackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
        message="API call was a Success"
      />
    </Fragment>
  );
};

export default Login;
