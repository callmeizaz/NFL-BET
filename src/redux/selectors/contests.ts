import { RootState } from "../store";

export const selectContestsData = (state: RootState) => state.contests.contestsData;
export const selectMyContestsData = (state: RootState) => state.contests.myContestsData;
export const selectPastContestsData = (state: RootState) => state.contests.pastContestsData;
export const selectSelectedContest = (state: RootState) => state.contests.selectedContest;
export const selectSpread = (state: RootState) => state.contests.spread;
export const selectContestValues = (state: RootState) => state.contests.contestValues;
export const selectPublicContestsData = (state: RootState) => state.contests.publicContestData;
export const selectContestsStatus = (state: RootState) => state.contests.contestStatus;
// export const selectContestsData = state => state
