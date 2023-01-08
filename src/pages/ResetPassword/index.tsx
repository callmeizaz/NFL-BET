import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory, useParams } from "react-router-dom";
import { Formik, Field } from "formik";
import { useSnackbar } from "notistack";

import routes from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";

import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

import { TextField } from "formik-material-ui";

import resetPasswordSchema from "../../constants/schemas/resetPassword";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { ResetPasswordPayload } from "./interfaces";

import { sendAsyncResetPassword } from "../../redux/thunks/authentication";
import { resetLoading } from "../../redux/reducers/authenticationSlice";

import TPLogo from "../../icons/logo/TopProp_Full_Logo.png";

const ResetPassword = () => {
  const dispatch: AppDispatch = useAppDispatch();
  const { token } = useParams<{ token: string }>();
  const [showPassword, setShowPassword] = useState(false);

  const { enqueueSnackbar } = useSnackbar();

  let history = useHistory();

  const redirect = () => {
    history.push("/login");
  };

  const handlePasswordResetSubmit = (values: ResetPasswordPayload) => {
    dispatch(
      sendAsyncResetPassword({
        forgotPasswordToken: token,
        ...values,
      })
    ).then((response) => {
      if (response.type == "authentication/resetPassword/fulfilled") {
        setTimeout(() => {
          dispatch(resetLoading());
        }, 3000);
        enqueueSnackbar(response.payload.message, {
          variant: "success",
        });
        redirect();
      } else {
        // enqueueSnackbar(response.payload.error.message, {
        //     variant: "warning",
        // });
        return;
      }
    });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | Forgot Password</title>
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
                      Reset Password
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Please input your new password
                    </Typography>
                  </Grid>
                </Grid>
                <div className="spacer__1" />
                <Formik
                  initialValues={{
                    password: "",
                    confirmPassword: "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    handlePasswordResetSubmit(values);
                  }}
                  validationSchema={resetPasswordSchema}
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
                          spacing={2}
                          xs={12}
                        >
                          <Grid item xs={12}>
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

                          <Grid item xs={12}>
                            <Field
                              component={TextField}
                              name="confirmPassword"
                              type={showPassword ? "text" : "password"}
                              label="Confirm Password"
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

                          <Grid item xs={12} container justify="flex-end">
                            <Link to={routes.public.login}>
                              <Typography
                                variant="body1"
                                color="primary"
                                align="right"
                                className="font-bold"
                              >
                                Back to Login
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
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Button
                                type="submit"
                                color="primary"
                                variant="contained"
                                size="large"
                                fullWidth
                                disabled={!dirty || isSubmitting}
                                disableElevation
                              >
                                Reset Password
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
      </Grid>
    </Fragment>
  );
};

export default ResetPassword;
