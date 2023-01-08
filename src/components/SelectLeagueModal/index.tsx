import React, { Fragment } from "react";
import { useHistory, Link } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import clsx from "classnames";
import { useTheme } from "@material-ui/core/styles";
import { browserName } from "react-device-detect";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import Hidden from "@material-ui/core/Hidden";
import GetAppIcon from "@material-ui/icons/GetApp";

import DialogTitle from "../DialogTitle";

import { IProps } from "./interfaces";

import useStyles from "./styles";
import routes from "../../constants/routes";
import {
  YAHOO_CLIENT_ID,
  YAHOO_OAUTH_REDIRECT_URL,
} from "../../constants/config";

const SelectLeagueModal = (props: IProps) => {
  const theme = useTheme();
  const classes = useStyles();
  const isSmall = useMediaQuery(theme.breakpoints.down("xs"));
  let history = useHistory();
  const {
    open,
    handleClose,
    //   changeTabs
  } = props;

  return (
    <Dialog
      open={open}
      onClose={() => handleClose(false)}
      fullWidth
      maxWidth="xs"
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle onClose={() => handleClose(false)}>{""}</DialogTitle>
      <Fragment>
        <DialogContent>
          <Grid
            container
            item
            direction="row"
            justify="space-evenly"
            alignItems="center"
            xs={12}
            className="pb-8"
          >
            <Grid item xs={10} className="-mt-4">
              <Hidden only={["sm", "xs", "md"]}>
                <Typography variant="h6" align="center">
                  Which Fantasy League do you want to import?
                </Typography>
              </Hidden>
            </Grid>
            <Hidden only={["sm", "xs", "md"]}>
              <Grid item xs={12} md={5} className="my-2">
                <Grid item container justify="center" alignItems="center">
                  <Grid item xs={5} md={12} container justify="center">
                    <a
                      href={
                        browserName === "Chrome"
                          ? `https://www.espn.com/fantasy/football/`
                          : "#"
                      }
                      className={classes.importButtons}
                    >
                      <Grid
                        container
                        className={clsx(
                          "h-24 w-24 md:h-32 md:w-32 rounded-xl",
                          browserName === "Chrome"
                            ? classes.espnCard
                            : classes.espnCardDisabled
                        )}
                        justify="center"
                        alignContent="center"
                      >
                        {browserName === "Chrome" ? (
                          <Typography
                            variant="h5"
                            className="text-white font-black"
                          >
                            ESPN
                          </Typography>
                        ) : (
                          <Typography
                            className="text-white font-black"
                            variant="caption"
                            align="center"
                          >
                            ESPN import is only available on Chrome
                          </Typography>
                        )}
                      </Grid>
                    </a>
                  </Grid>
                  <Grid item xs={7} md={12}>
                    <Typography variant="h6" align="center">
                      ESPN Fantasy
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden only={["lg", "xl"]}>
            <Grid item xs={12} md={5} className="my-2">
                <Grid item container justify="center" alignItems="center">
                  <Grid item xs={5} md={12} container justify="center">
                    <a
                      href="#"
                      className={classes.importButtons}
                    >
                      <Grid
                        container
                        className={clsx(
                          "h-24 w-24 md:h-32 md:w-32 rounded-xl",
                           classes.espnCardDisabled
                        )}
                        justify="center"
                        alignContent="center"
                      >
                        <Typography
                          className="text-white font-black"
                          variant="caption"
                          align="center"
                          style={{"padding": "3px 3px 3px 3px"}}
                        >
                          ESPN import is only available on Chrome Desktop Browsers
                        </Typography>
                      </Grid>
                    </a>
                  </Grid>
                </Grid>
              </Grid>
            </Hidden>
            <Hidden only={["md", "lg", "xl"]}>
              <Grid item xs={12} md={2} className="my-2">
                <Typography align="center">OR</Typography>
              </Grid>
            </Hidden>
            <Grid item xs={12} md={5} className="my-2">
              <Grid item container justify="center" alignItems="center">
                <Grid item xs={5} md={12} container justify="center">
                  <a
                    href={`https://api.login.yahoo.com/oauth2/request_auth?client_id=${YAHOO_CLIENT_ID}&redirect_uri=${YAHOO_OAUTH_REDIRECT_URL}&response_type=code`}
                    className={classes.importButtons}
                  >
                    <Grid
                      container
                      className={clsx(
                        "h-24 w-24 md:h-32 md:w-32 rounded-xl",
                        classes.yahooCard
                      )}
                      justify="center"
                      alignContent="center"
                    >
                      <Typography
                        variant="h5"
                        className="text-white font-black"
                      >
                        YAHOO
                      </Typography>
                    </Grid>
                  </a>
                </Grid>
                <Hidden only={["sm", "xs", "md"]}>
                <Grid item xs={7} md={12}>
                  <Typography variant="h6" align="center">
                    YAHOO Fantasy
                  </Typography>
                </Grid>
                </Hidden>
              </Grid>
            </Grid>
            <Hidden only={["sm", "xs", "md"]}>
              {browserName === "Chrome" ? (
                <Fragment>
                  <Grid item xs={12} md={12} justify="center">
                    <a
                      href="https://chrome.google.com/webstore/detail/topprop-espn-chrome-exten/ekjhoijglmkllgnapajfhagipmmofnkl?hl=en"
                      target="_blank"
                      className={classes.externalLink}
                    >
                      1. {/* <GetAppIcon></GetAppIcon> */}
                      Download Chrome Extension
                    </a>
                  </Grid>
                  <Grid item xs={12} md={12} justify="center">
                    <a
                      href="https://www.youtube.com/watch?v=xGgtUckUR5Y"
                      target="_blank"
                      className={classes.externalLink}
                    >
                      2. {/* <GetAppIcon></GetAppIcon> */}
                      Click Import on Extension
                    </a>
                  </Grid>
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}
            </Hidden>
          </Grid>
        </DialogContent>
      </Fragment>
    </Dialog>
  );
};
export default SelectLeagueModal;
