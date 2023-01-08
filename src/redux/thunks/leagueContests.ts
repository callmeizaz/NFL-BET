import { createAsyncThunk } from "@reduxjs/toolkit";
import * as leagueContestsAPI from "../../services/api/leagueContests";
import {
  ContestFilterPayload,
  MyContestFilterPayload,
  SpreadPayloadInterface,
  ContestValuesPayloadInterface,
  CreateContestPayloadInterface,
  PastContestFilterPayload,
  PublicContestFilterPayload,
  ClaimContestPayloadInterface,
} from "../../typings/interfaces/leagueContests";

export const fetchAsyncContests = createAsyncThunk(
  "leagueContestspublicContests/fetch",
  async (filters: ContestFilterPayload) => {
    const response = await leagueContestsAPI.FetchContests(filters);
    return response.data;
  }
);

export const fetchAsyncMyContests = createAsyncThunk(
  "leagueContestsmyContests/fetch",
  async (filters: ContestFilterPayload) => {
    const response = await leagueContestsAPI.FetchMyContests(filters);
    return response.data;
  }
);

export const fetchAsyncPastContests = createAsyncThunk(
  "leagueContestspastContests/fetch",
  async (filters: ContestFilterPayload) => {
    const response = await leagueContestsAPI.FetchPastContests(filters);
    return response.data;
  }
);

export const fetchAsyncPublicContest = createAsyncThunk(
  "leagueContestspublicContest/fetch",
  async (filters: PublicContestFilterPayload) => {
    const response = await leagueContestsAPI.FetchPublicContest(filters);
    return response.data;
  }
);

export const fetchAsyncSpread = createAsyncThunk(
  "leagueContestsspread/fetch",
  async (spreadData: SpreadPayloadInterface) => {
    const response = await leagueContestsAPI.FetchSpread(spreadData);
    return response.data;
  }
);

export const fetchAsyncContestValues = createAsyncThunk(
  "leagueContestsvalues/fetch",
  async (contestData: ContestValuesPayloadInterface) => {
    const response = await leagueContestsAPI.FetchContestValues(contestData);
    return response.data;
  }
);

export const doAsyncCreateContest = createAsyncThunk(
  "leagueContestscreate/contest",
  async (contestData: CreateContestPayloadInterface) => {
    const response = await leagueContestsAPI.CreateContest(contestData);
    return response.data;
  }
);

export const doAsyncClaimContest = createAsyncThunk(
  "leagueContestsclaim/contest",
  async (contestData: ClaimContestPayloadInterface) => {
    const response = await leagueContestsAPI.ClaimContest(contestData);
    return response.data;
  }
);
