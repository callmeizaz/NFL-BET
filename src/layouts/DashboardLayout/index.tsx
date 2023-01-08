import React, { useState } from "react";
import { Route } from "react-router-dom";

import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

import { matchPath } from "react-router-dom";

import Footer from "../../components/Footer";

import routes from "../../constants/routes";
import { Props } from "./interfaces";
import useStyles from "./styles";

const DashboardLayout: React.VFC<Props> = ({
  component: Component,
  ...rest
}) => {
  const classes = useStyles();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("md"));

  const match = matchPath(location.pathname, routes.dashboard.league.manage);

  return (
    <main className={classes.content}>
      <Grid container direction="row" className="h-full">
        <div className={isSmall && !match ? "h-12" : ""}>
          <span className="text-white">{isSmall && !match ? "." : ""}</span>
        </div>
        <Grid item className="flex-1 h-full" container justify="space-between">
          <Box
            py={2}
            px={isSmall ? 1 : 3}
            className="w-screen max-w-screen-2xl my-0 mx-auto"
          >
            <Component {...rest} />
          </Box>
          <Footer />
        </Grid>
      </Grid>
    </main>
  );
};

export default DashboardLayout;
