import { createAsyncThunk } from "@reduxjs/toolkit";
import * as contestsAPIs from "../../services/api/contests";
import {
  ContestFilterPayload,
  MyContestFilterPayload,
  SpreadPayloadInterface,
  ContestValuesPayloadInterface,
  CreateContestPayloadInterface,
  PastContestFilterPayload,
  PublicContestFilterPayload,
  CloseContestPayloadInterface,
} from "../../typings/interfaces/contests";

export const fetchAsyncContests = createAsyncThunk(
  "contests/publicContests/fetch",
  async (filters: ContestFilterPayload) => {
    const response = await contestsAPIs.FetchContests(filters);
    return response.data;
  }
);

export const fetchAsyncMyContests = createAsyncThunk(
  "contests/myContests/fetch",
  async (filters: MyContestFilterPayload) => {
    const response = await contestsAPIs.FetchMyContests(filters);
    return response.data;
  }
);

export const fetchAsyncPastContests = createAsyncThunk(
  "contests/pastContests/fetch",
  async (filters: PastContestFilterPayload) => {
    const response = await contestsAPIs.FetchPastContests(filters);
    return response.data;
  }
);

export const fetchAsyncPublicContest = createAsyncThunk(
  "contests/publicContest/fetch",
  async (filters: PublicContestFilterPayload) => {
    const response = await contestsAPIs.FetchPublicContest(filters);
    return response.data;
  }
);

export const fetchAsyncSpread = createAsyncThunk(
  "contests/spread/fetch",
  async (spreadData: SpreadPayloadInterface) => {
    const response = await contestsAPIs.FetchSpread(spreadData);
    return response.data;
  }
);

export const fetchAsyncContestValues = createAsyncThunk(
  "contests/values/fetch",
  async (contestData: ContestValuesPayloadInterface) => {
    const response = await contestsAPIs.FetchContestValues(contestData);
    return response.data;
  }
);

export const doAsyncCreateContest = createAsyncThunk(
  "contests/create/contest",
  async (contestData: CreateContestPayloadInterface) => {
    const response = await contestsAPIs.CreateContest(contestData);
    return response.data;
  }
);

export const doAsyncClaimContest = createAsyncThunk(
  "contests/claim/contest",
  async (contestId: string) => {
    const response = await contestsAPIs.ClaimContest(contestId);
    return response.data;
  }
);

export const doAsyncCloseContest = createAsyncThunk(
  "contests/close/contest",
  async (contestId: number) => {
    const response = await contestsAPIs.CloseContest(contestId);
    return response.data;
  }
);

export const fetchAsyncContestStatus = createAsyncThunk(
  "contests/status/fetch",
  async () => {
    const response = await contestsAPIs.FetchStatus();
    return response.data;
  }
);
