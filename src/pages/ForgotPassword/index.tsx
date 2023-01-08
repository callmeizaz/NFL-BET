import React, { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useHistory } from "react-router-dom";
import { Formik, Field } from "formik";
import { useSnackbar } from "notistack";
import { debounce } from "lodash";

import routes from "../../constants/routes";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import { TextField } from "formik-material-ui";

import forgotPasswordSchema from "../../constants/schemas/forgotPassword";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";
import { ForgotPasswordPayload } from "./interfaces";

import { sendAsyncForgotPasswordEmail } from "../../redux/thunks/register";
import { resetLoading } from "../../redux/reducers/authenticationSlice";

import TPLogo from "../../icons/logo/TopProp_Full_Logo.png";

const ForgotPassword = () => {
  const dispatch: AppDispatch = useAppDispatch();

  const { enqueueSnackbar } = useSnackbar();

  let history = useHistory();

  const redirect = () => {
    history.push("/login");
  };

  const handleEmailSubmit = debounce((values: ForgotPasswordPayload) => {
    dispatch(
      sendAsyncForgotPasswordEmail({
        email: values.email,
      })
    ).then((response) => {
      if (response.type == "authentication/forgotPassword/fulfilled") {
        setTimeout(() => {
          dispatch(resetLoading());
        }, 30000);
        enqueueSnackbar(response.payload.message, {
          variant: "success",
        });
        redirect();
      } else {
        // if(response.type === "authentication/forgotPassword/rejected" ) {
        //   if(response.error.statusCode === 429) {
        //     enqueueSnackbar("Too many request sent", {
        //       variant: "warning",
        //     });
        //   }
        // }
        // enqueueSnackbar(response.payload.error.message, {
        //     variant: "warning",
        // });
        return;
      }
    });
  }, 1000);

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
                      Forgot Password
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      Please input your registered email id and we will send you
                      a reset link.
                    </Typography>
                  </Grid>
                </Grid>
                <div className="spacer__1" />
                <Formik
                  initialValues={{
                    email: "",
                  }}
                  onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(true);
                    handleEmailSubmit(values);
                  }}
                  validationSchema={forgotPasswordSchema}
                >
                  {(props) => {
                    const {
                      values,
                      touched,
                      errors,
                      dirty,
                      handleChange,
                      handleBlur,
                      isSubmitting,
                      handleSubmit,
                    } = props;
                    return (
                      <form onSubmit={handleSubmit}>
                        <Grid
                          container
                          item
                          direction="column"
                          alignItems="stretch"
                          xs={12}
                        >
                          <Grid item xs={12} className="pb-4">
                            <Field
                              component={TextField}
                              name="email"
                              type="text"
                              label="Email"
                              fullWidth
                              value={values.email}
                            />
                          </Grid>

                          <Grid
                            item
                            xs={12}
                            className="pb-4"
                            container
                            justify="flex-end"
                          >
                            <Link to={routes.public.login}>
                              <Typography
                                variant="body1"
                                color="primary"
                                align="right"
                                className="font-bold pb-4"
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
                                Send Email
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

export default ForgotPassword;
