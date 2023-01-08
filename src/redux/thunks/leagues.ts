import { createAsyncThunk } from "@reduxjs/toolkit";
import * as leagueAPIs from "../../services/api/leagues";
import {
  LeagueByIdFilterPayload,
  LeagueInviteMember,
  FetchLeagueInvite,
  JoinLeagueInvite,
  SyncLeaguePayloadInterface,
  JoinLeaguePublicInvite,
} from "../../typings/interfaces/leagues";

import { CreateLeagueContestPayloadInterface } from "./../../typings/interfaces/leagues";

export const fetchAsyncLeagues = createAsyncThunk("league/fetch", async (p) => {
  const response = await leagueAPIs.FetchLeagues();
  return response.data;
});

export const fetchAsyncLeagueById = createAsyncThunk(
  "league/fetch/id",
  async (payload: LeagueByIdFilterPayload) => {
    const response = await leagueAPIs.FetchLeaguesById(payload);
    return response.data;
  }
);

export const doAsyncLeagueInvite = createAsyncThunk(
  "league/invite",
  async (payload: LeagueInviteMember) => {
    const response = await leagueAPIs.SendLeagueInvites(payload);
    return response.data;
  }
);

export const doAsyncFetchLeagueInvite = createAsyncThunk(
  "league/invite/fetch",
  async (payload: FetchLeagueInvite) => {
    const response = await leagueAPIs.FetchLeagueInviteByToken(payload);
    return response.data;
  }
);

export const doAsyncFetchLeaguePublicInvite = createAsyncThunk(
  "league/public-invite/fetch",
  async (payload: FetchLeagueInvite) => {
    const response = await leagueAPIs.FetchLeaguePublicInviteByToken(payload);
    return response.data;
  }
);

export const doAsyncJoinLeagueInvite = createAsyncThunk(
  "league/invite/join",
  async (payload: JoinLeagueInvite) => {
    const response = await leagueAPIs.JoinLeagueInviteById(payload);
    return response.data;
  }
);

export const doAsyncJoinLeaguePublicInvite = createAsyncThunk(
  "league/public-invite/join",
  async (payload: JoinLeaguePublicInvite) => {
    const response = await leagueAPIs.JoinLeaguePublicInviteByToken(payload);
    return response.data;
  }
);

export const doAsyncCreateLeagueContest = createAsyncThunk(
  "league/create/contest",
  async (contestData: CreateLeagueContestPayloadInterface) => {
    const response = await leagueAPIs.CreateLeagueContest(contestData);
    return response.data;
  }
);

export const doAsyncSyncLeague = createAsyncThunk(
  "league/source/sync",
  async (leagueData: SyncLeaguePayloadInterface) => {
    const response = await leagueAPIs.SyncLeague(leagueData);
    return response.data;
  }
);

export const runWinCriteria = createAsyncThunk("league/win-check", async () => {
  const response = await leagueAPIs.WinCheck();
  return response.data;
});

export const runCloseContests = createAsyncThunk(
  "league/close-contest",
  async () => {
    const response = await leagueAPIs.CloseContests();
    return response.data;
  }
);
