import React from "react";
import { Redirect, Switch } from "react-router-dom";
import routes from "./constants/routes";

import ProtectedRoute from "./components/ProtectedRoute";
import UnProtectedRoute from "./components/UnProtectedRoute";
import UnChangedRoute from "./components/UnChangedRoute";

import BaseLayout from "./layouts/BaseLayout";
import DashboardLayout from "./layouts/DashboardLayout";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Dashboard from "./pages/Dashboard";
import Contests from "./pages/Contests";
import League from "./pages/League";
import ImportLeague from "./pages/ImportLeague";
import ImportInvite from "./pages/ImportInvite";
import LeagueManage from "./pages/LeagueManage";
import LeagueInvite from "./pages/LeagueInvite";
import LeaguePublicInvite from "./pages/LeaguePublicInvite";
import PrivacyPolicy from "./pages/PrivacyPolicy";

import PrivateGroup from "./pages/PrivateGroup";
import Profile from "./pages/Profile";
import PublicContest from "./pages/PublicContest";

import PageNotFound from "./pages/PageNotFound";
import TermsOfService from "./pages/TermsOfService";
import ResponsibleGaming from "./pages/ResponsibleGaming";

const Router = () => {
  return (
    <Switch>
      <UnProtectedRoute
        exact
        path={routes.public.login}
        component={Login}
        layout={BaseLayout}
      />

      <UnProtectedRoute
        exact
        path={routes.public.register}
        component={Register}
        layout={BaseLayout}
      />

      <UnProtectedRoute
        exact
        path={routes.public.forgotPassword}
        component={ForgotPassword}
        layout={BaseLayout}
      />

      <UnProtectedRoute
        exact
        path={routes.public.resetPassword}
        component={ResetPassword}
        layout={BaseLayout}
      />

      <UnProtectedRoute
        exact
        path={routes.public.contest}
        component={PublicContest}
        layout={BaseLayout}
      />

      <UnChangedRoute
        exact
        path={routes.public.privacyPolicy}
        component={PrivacyPolicy}
        layout={BaseLayout}
      />

      <UnChangedRoute
        exact
        path={routes.public.termsOfService}
        component={TermsOfService}
        layout={BaseLayout}
      />

      <UnChangedRoute
        exact
        path={routes.public.responsibleGaming}
        component={ResponsibleGaming}
        layout={BaseLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.league.invitation}
        component={LeagueInvite}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.league.publicInvitation}
        component={LeaguePublicInvite}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.home}
        component={Dashboard}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path="/"
        component={() => <Redirect to={routes.dashboard.home} />}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.contests}
        component={Contests}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.league.home}
        component={League}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.league.import}
        component={ImportLeague}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.league.importInvite}
        component={ImportInvite}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.league.manage}
        component={LeagueManage}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.dashboard.privateGroup}
        component={PrivateGroup}
        layout={DashboardLayout}
      />

      <ProtectedRoute
        exact
        path={routes.profile.home}
        component={Profile}
        layout={DashboardLayout}
      />

      <BaseLayout exact path="*" component={PageNotFound} />
    </Switch>
  );
};

export default Router;
