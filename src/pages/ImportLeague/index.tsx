import React, { Fragment, useState, useEffect } from "react";
import { Formik, Form, FormikProps } from "formik";
import jwt from "jsonwebtoken";

import { useHistory } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useLocalStorage, deleteFromStorage } from "@rehooks/local-storage";
import { reverse } from "named-urls";
import { Helmet } from "react-helmet";
import Select from "react-select";
import { Grid, Button, Typography, CircularProgress } from "@material-ui/core";

import { useLocation } from "react-router-dom";
import { useTheme } from "@material-ui/core/styles";

import { AppDispatch, useAppDispatch, useAppSelector } from "../../redux/store";

import {
  fetchAsyncYahooLeagues,
  fetchAsyncESPNLeagues,
  importAsyncYahooLeagues,
  importAsyncESPNLeagues,
  resyncAsyncYahooLeagues,
  resyncAsyncESPNLeagues,
} from "../../redux/thunks/import";

import {
  selectImportLoading,
  selectYahooLeaguesData,
  selectESPNLeaguesData,
  selectYahooTokensData,
} from "../../redux/selectors/import";

import LeagueTeamTable from "./../../components/LeagueTeamsTable";
import ReactSelectLeagueOption from "./../../components/ReactSelectLeagueOption";
import ReactSelectSingleLeagueValue from "./../../components/ReactSelectSingleLeagueValue";
import InfoBanner from "./../../components/InfoBanner";
import Loader from "./../../components/Loader";
import useStyles from "./styles";
import {
  processLeagueDropdownData,
  processLeagueTeamsData,
  processLeagueScoringData,
} from "../../helpers/leagueImport";
import routes from "../../constants/routes";
import { ImportLeagueForm } from "./interfaces";

import importLeagueSchema from "../../constants/schemas/importLeague";

const ImportLeague = () => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = useState("Something went wrong");
  const [syncTokenFailed, setSyncTokenFailed] = useState(false);
  const [syncLeagueData, setSyncLeagueData] = useState<any>(null);

  const [jwToken] = useLocalStorage<string>("tpsl");

  useEffect(() => {
    jwt.verify(jwToken || "", "topprop", (err, decoded) => {
      if (err) {
        setSyncTokenFailed(true);
        setErrorMessage(
          "Your league sync token has expired. Please restart league sync process to proceed"
        );
      } else {
        setSyncLeagueData(decoded);
      }
    });
  }, [jwToken]);

  const dispatch: AppDispatch = useAppDispatch();
  const history = useHistory();
  const yahooLeagues = useAppSelector(selectYahooLeaguesData);
  const espnLeagues = useAppSelector(selectESPNLeaguesData);
  const tokens = useAppSelector(selectYahooTokensData);
  const loading = useAppSelector(selectImportLoading);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const hashParams = new URLSearchParams(location.hash.replace("#", "?"));

  const yahooCode = params.get("code");
  const espnS2 = hashParams.get("espnS2");
  const SWID = hashParams.get("SWID");

  let type = "";

  if (yahooCode && !jwToken) {
    type = "yahoo";
  } else if (espnS2 && !jwToken) {
    type = "espn";
  } else if (yahooCode && jwToken) {
    type = "yahooSync";
  } else {
    type = "espnSync";
  }

  useEffect(() => {
    switch (type) {
      case "espn":
        dispatch(
          fetchAsyncESPNLeagues({ espnS2: espnS2 || "", swid: SWID || "" })
        ).then((response) => {
          if (response.type === "espn/league/fetch/rejected") {
            setErrorMessage(response?.payload?.error?.message);
          }
        });
        break;
      case "yahoo":
        dispatch(fetchAsyncYahooLeagues({ code: yahooCode || "" })).then(
          (response) => {
            if (response.type === "yahoo/league/fetch/rejected") {
              setErrorMessage(response?.payload?.error?.message);
            }
          }
        );
        break;
      case "yahooSync":
        if (syncLeagueData) {
          dispatch(
            resyncAsyncYahooLeagues({
              code: yahooCode || "",
              leagueId: syncLeagueData?.leagueId,
            })
          ).then((response) => {
            if (response.type === "yahoo/league/resync/rejected") {
              setErrorMessage(response?.payload?.error?.message);
            }
            if (response.type === "yahoo/league/resync/fulfilled") {
              history.push(
                reverse(`${routes.dashboard.league.manage}`, {
                  id: syncLeagueData?.leagueId,
                })
              );
            }
          });
        }
        break;
      case "espnSync":
        if (syncLeagueData) {
          dispatch(
            resyncAsyncESPNLeagues({
              espnS2: espnS2 || "",
              swid: SWID || "",
              leagueId: syncLeagueData?.leagueId,
            })
          ).then((response) => {
            if (response.type === "espn/league/resync/rejected") {
              setErrorMessage(response?.payload?.error?.message);
            }
            if (response.type === "espn/league/resync/fulfilled") {
              history.push(
                reverse(`${routes.dashboard.league.manage}`, {
                  id: syncLeagueData?.leagueId,
                })
              );
            }
          });
        }
        break;
    }
  }, [dispatch, type, yahooCode, syncLeagueData]);

  const theme = useTheme();

  const fetchLeagueName = (type: string | null) => {
    let name = "";
    switch (type) {
      case "espn":
        name = "ESPN";
        break;
      case "yahoo":
        name = "YAHOO";
        break;
    }
    return name;
  };

  const scoringTypes = [
    {
      value: 3,
      label: "Standard",
    },
    {
      value: 1,
      label: "Half PPR",
    },
    {
      value: 2,
      label: "Full PPR",
    },
  ];

  return (
    <Fragment>
      <Helmet>
        <title>TopProp | League Import</title>
      </Helmet>
      {type === "yahooSync" || type === "espnSync" ? (
        <InfoBanner
          icon="sync"
          title={
            syncTokenFailed
              ? errorMessage
              : `Please wait while we sync ${
                  // @ts-ignore
                  syncLeagueData?.leagueName || ""
                }`
          }
          action={{
            text: "Cancel Import",
            link: routes.dashboard.league.home,
          }}
        />
      ) : (
        <Fragment>
          <Typography variant="h4" className="font-bold">
            Import {fetchLeagueName(type)} League
          </Typography>
          {loading === "pending" ? (
            <Loader />
          ) : (
            <Fragment>
              {loading === "failed" ? (
                <InfoBanner
                  icon="error_outline"
                  title={errorMessage}
                  action={{
                    text: "Cancel Import",
                    link: routes.dashboard.league.home,
                  }}
                />
              ) : (
                <Formik
                  initialValues={{
                    league: null,
                    scoringType: processLeagueScoringData(
                      type,
                      yahooLeagues,
                      espnLeagues
                    ),
                  }}
                  validationSchema={importLeagueSchema}
                  enableReinitialize
                  onSubmit={(values, { setSubmitting }) => {
                    const { league, scoringType } = values;
                    switch (type) {
                      case "espn":
                        const espnPayload = {
                          // @ts-ignore: Object is possibly 'null'.
                          leagueId: !!league ? league.value.id : league,
                          espnS2: espnS2,
                          swid: SWID,
                          scoringTypeId: !!scoringType
                            ? scoringType.value
                            : null,
                        };

                        dispatch(importAsyncESPNLeagues(espnPayload)).then(
                          (response) => {
                            if (
                              response.type === "espn/league/import/fulfilled"
                            ) {
                              const leagueId = response.payload.data.league.id;
                              history.push(
                                reverse(
                                  `${routes.dashboard.league.importInvite}`,
                                  {
                                    id: leagueId,
                                  }
                                )
                              );
                            }

                            if (
                              response.type === "espn/league/import/rejected"
                            ) {
                              setErrorMessage(
                                response?.payload?.error?.message
                              );
                            }
                          }
                        );
                        break;
                      case "yahoo":
                        const yahooPayload = {
                          // @ts-ignore: Object is possibly 'null'.
                          leagueKey: !!league ? league.value.key : league,
                          accessToken: tokens.accessToken,
                          refreshToken: tokens.refreshToken,
                          scoringTypeId: !!scoringType
                            ? scoringType.value
                            : null,
                        };

                        dispatch(importAsyncYahooLeagues(yahooPayload)).then(
                          (response) => {
                            if (
                              response.type === "yahoo/league/import/fulfilled"
                            ) {
                              const leagueId = response.payload.data.league.id;
                              history.push(
                                reverse(
                                  `${routes.dashboard.league.importInvite}`,
                                  {
                                    id: leagueId,
                                  }
                                )
                              );
                            }

                            if (
                              response.type === "yahoo/league/import/rejected"
                            ) {
                              setErrorMessage(
                                response?.payload?.error?.message
                              );
                            }
                          }
                        );
                        break;
                    }
                  }}
                >
                  {({
                    values,
                    setFieldValue,
                    isSubmitting,
                    errors,
                  }: FormikProps<ImportLeagueForm>) => {
                    return (
                      <Form>
                        <Grid
                          container
                          direction="row"
                          justify="flex-start"
                          alignItems="stretch"
                        >
                          <Grid item xs={12} sm={12} md={6} className="pt-8">
                            <Grid
                              container
                              item
                              direction="column"
                              alignItems="stretch"
                              xs={12}
                            >
                              <Grid item xs={12} className="my-2">
                                <Typography>Select your League</Typography>
                                <Select
                                  placeholder="Select League..."
                                  name="tram"
                                  menuPortalTarget={document.body}
                                  styles={{
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                    singleValue: (base) => ({
                                      ...base,
                                      width: "100%",
                                    }),
                                  }}
                                  components={{
                                    Option: ReactSelectLeagueOption,
                                    SingleValue: ReactSelectSingleLeagueValue,
                                  }}
                                  options={processLeagueDropdownData(
                                    type,
                                    yahooLeagues,
                                    espnLeagues
                                  )}
                                  onChange={(selectedLeague) => {
                                    setFieldValue("league", selectedLeague);
                                  }}
                                />
                              </Grid>
                              <Grid item xs={12} className="my-2">
                                <Typography>Set your Scoring Type</Typography>
                                <Select
                                  placeholder="Select Scoring Type..."
                                  options={scoringTypes}
                                  menuPortalTarget={document.body}
                                  value={values.scoringType}
                                  styles={{
                                    menuPortal: (base) => ({
                                      ...base,
                                      zIndex: 9999,
                                    }),
                                    singleValue: (base) => ({
                                      ...base,
                                      width: "100%",
                                    }),
                                  }}
                                  onChange={(selectedScoringType) => {
                                    setFieldValue(
                                      "scoringType",
                                      selectedScoringType
                                    );
                                  }}
                                />
                                <Typography
                                  className="w-full"
                                  variant="caption"
                                  align="right"
                                >
                                  Scoring type cannot be changed later
                                </Typography>
                              </Grid>
                              <Grid item xs={12}></Grid>
                            </Grid>

                            <Grid
                              container
                              item
                              xs={12}
                              direction="row"
                              justify="flex-end"
                            >
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                className="p-1"
                              >
                                <Button
                                  fullWidth
                                  color="primary"
                                  variant="outlined"
                                  component={RouterLink}
                                  to={routes.dashboard.league.home}
                                >
                                  Cancel
                                </Button>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                sm={6}
                                md={6}
                                lg={4}
                                className="p-1"
                              >
                                <Button
                                  fullWidth
                                  type="submit"
                                  variant="contained"
                                  color="primary"
                                  disabled={
                                    values.league === null ||
                                    values.scoringType === null ||
                                    isSubmitting
                                  }
                                >
                                  Import
                                </Button>
                              </Grid>
                            </Grid>
                          </Grid>
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            className="px-1 lg:px-4"
                          >
                            {values?.league ? (
                              <LeagueTeamTable
                                teamsData={processLeagueTeamsData(
                                  type,
                                  values?.league?.value?.teams
                                )}
                              />
                            ) : (
                              ""
                            )}
                          </Grid>
                        </Grid>
                      </Form>
                    );
                  }}
                </Formik>
              )}
            </Fragment>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ImportLeague;
