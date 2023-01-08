import { RootState } from "../store";

export const selectPlayersData = (state: RootState) =>
  state.players.playersData;
export const selectOpponentData = (state: RootState) =>
  state.players.opponentsData;
export const selectTopPlayerData = (state: RootState) =>
  state.players.topPlayerData;
export const selectRecommendedPlayersData = (state: RootState) =>
  state.players.recommendedPlayersData;
export const isPlayersLoading = (state: RootState) => state.players.loading;
