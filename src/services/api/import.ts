import { axiosInstance } from "../api";

import {
  YahooLeaguesFetchPayloadInterface,
  ESPNLeaguesFetchPayloadInterface,
  YahooLeaguesImportPayloadInterface,
  ESPNLeaguesImportPayloadInterface,
  YahooLeaguesResyncPayloadInterface,
  ESPNLeaguesResyncPayloadInterface,
} from "../../typings/interfaces/leagues";
const apiUrl = process.env.REACT_APP_BASE_API_URL;

// Fetch Leagues
export const FetchYahooLeagues = (
  leagueData: YahooLeaguesFetchPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-import/fetch-yahoo-leagues`,
    data: leagueData,
  });
};

export const FetchESPNLeagues = (
  leagueData: ESPNLeaguesFetchPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-import/fetch-espn-leagues`,
    data: leagueData,
  });
};

export const ImportYahooLeague = (
  importData: YahooLeaguesImportPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-import/import-yahoo-league`,
    data: importData,
  });
};

export const ImportESPNLeague = (
  importData: ESPNLeaguesImportPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-import/import-espn-league`,
    data: importData,
  });
};

export const ResyncYahooLeague = (
  importData: YahooLeaguesResyncPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-import/resync-yahoo-league`,
    data: importData,
  });
};

export const ResyncESPNLeague = (
  importData: ESPNLeaguesResyncPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-import/resync-espn-league`,
    data: importData,
  });
};
