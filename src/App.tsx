import React from "react";
import { ConnectedRouter } from "connected-react-router";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import { SnackbarProvider } from "notistack";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/core/styles";
import { APP_ENV } from "./constants/config";
import MomentUtils from "@date-io/moment";
import history from "./redux/history";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { CaptureConsole as CaptureConsoleIntegration } from "@sentry/integrations";
import { ExtraErrorData as ExtraErrorDataIntegration } from "@sentry/integrations";
import store, { persistor, useAppSelector } from "./redux/store";

import CustomSnackbarProvider from "./providers/CustomSnackbarProvider";

import muiTheme from "./constants/theme";
import "./App.css";

import Router from "./Router";

import { SENTRY_DNS } from "./constants/config";

if (APP_ENV !== "development") {
  Sentry.init({
    dsn: SENTRY_DNS,
    integrations: [
      new Integrations.BrowserTracing({
        routingInstrumentation: Sentry.reactRouterV5Instrumentation(history),
      }),
      new CaptureConsoleIntegration({
        // array of methods that should be captured
        // defaults to ['log', 'info', 'warn', 'error', 'debug', 'assert']
        levels: ["debug", "error"],
      }),
      new ExtraErrorDataIntegration({
        // limit of how deep the object serializer should go. Anything deeper than limit will
        // be replaced with standard Node.js REPL notation of [Object], [Array], [Function] or
        // a primitive value. Defaults to 3.
        depth: 10,
      }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
}

const App = () => {
  const useStyles = makeStyles({
    success: { backgroundColor: "#b69056!important" },
  });

  const classes = useStyles();
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={muiTheme}>
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              classes={{
                variantSuccess: classes.success,
              }}
            >
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <CssBaseline>
                  <CustomSnackbarProvider>
                    <Router />
                  </CustomSnackbarProvider>
                </CssBaseline>
              </MuiPickersUtilsProvider>
            </SnackbarProvider>
          </MuiThemeProvider>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  );
};

export default App;
