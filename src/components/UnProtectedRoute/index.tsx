import React, { useState, useEffect } from "react";
import { useHistory, useLocation, matchPath } from "react-router-dom";
import { Route } from "react-router-dom";
import { reverse } from "named-urls";

import CssBaseline from "@material-ui/core/CssBaseline";

import Sidebar from "../Sidebar";

import { useAppSelector } from "../../redux/store";

import { selectUserData } from "../../redux/selectors/authentication";

import redirectPaths from "../../constants/redirectRoutes";
import { Props } from "./interfaces";
import routes from "../../constants/routes";
import useStyles from "./styles";
import { matches } from "voca";

const UnProtectedRoute: React.VFC<Props> = ({
  component,
  layout: Layout,
  ...rest
}) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const returnUrl = params.get("returnUrl");

  const userData = useAppSelector(selectUserData);

  useEffect(() => {
    if (userData !== null) {
      if (returnUrl) {
        let matchedParams = { found: false, path: "", params: {} };
        redirectPaths.forEach((path) => {
          const match = matchPath(returnUrl, path);
          if (match?.isExact) {
            matchedParams = { ...matchedParams, found: true, ...match };
          }
        });


        console.log("🚀 ~ file: index.tsx ~ line 45 ~ useEffect ~ matchedParams", matchedParams)

        if (matchedParams.found) {
          history.push(
            reverse(`${matchedParams?.path}`, matchedParams?.params)
          );
        } else {
          history.push(routes.dashboard.home);
        }
      } else {
        history.push(routes.dashboard.home);
      }
    }
  }, [userData, returnUrl]);

  return (
    <Route render={(props) => <Layout component={component} />} {...rest} />
  );
};

export default UnProtectedRoute;
