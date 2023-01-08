import { RootState } from "../store";

export const selectContestsData = (state: RootState) => state.leagueContests.contestsData;
export const selectMyContestsData = (state: RootState) => state.leagueContests.myContestsData;
export const selectPastContestsData = (state: RootState) => state.leagueContests.pastContestsData;
export const selectSelectedContest = (state: RootState) => state.leagueContests.selectedContest;
export const selectSpread = (state: RootState) => state.leagueContests.spread;
export const selectContestValues = (state: RootState) => state.leagueContests.contestValues;
export const selectPublicContestsData = (state: RootState) => state.leagueContests.publicContestData;
// export const selectContestsData = state => state
