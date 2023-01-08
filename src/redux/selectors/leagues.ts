import { RootState } from "../store";

export const selectLeaguesData = (state: RootState) =>
  state.leagues.leaguesData;
export const selectLoading = (state: RootState) => state.leagues.loading;
export const selectCurrentLeague = (state: RootState) =>
  state.leagues.currentLeague;
  export const selectInviteData = (state: RootState) => state.leagues.inviteData;
  export const selectSyncLoading = (state: RootState) => state.leagues.syncLoading;
