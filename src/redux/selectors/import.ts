import { RootState } from "../store";

export const selectImportLoading = (state: RootState) => state.import.loading;
export const selectYahooLeaguesData = (state: RootState) =>
  state.import.yahooLeagues;
export const selectYahooTokensData = (state: RootState) =>
  state.import.yahooTokens;
export const selectESPNLeaguesData = (state: RootState) =>
  state.import.espnLeagues;
