import { createAsyncThunk } from "@reduxjs/toolkit";
import * as playerAPIs from "../../services/api/players";
import { PlayerFilterPayload } from "../../typings/interfaces/players";

export const fetchAsyncPlayers = createAsyncThunk(
  "players/player/fetch",
  async (payload: PlayerFilterPayload) => {
    const response = await playerAPIs.FetchPlayers(payload);
    return response.data;
  }
);

export const fetchAsyncOpponents = createAsyncThunk(
  "players/opponent/fetch",
  async (payload: PlayerFilterPayload) => {
    const response = await playerAPIs.FetchPlayers(payload);
    return response.data;
  }
);

export const runFetchProjections = createAsyncThunk(
  "players/fetch-projections",
  async () => {
    const response = await playerAPIs.FetchProjections();
    return response.data;
  }
);

export const runFetchPoints = createAsyncThunk(
  "players/fetch-points",
  async () => {
    const response = await playerAPIs.FetchPoints();
    return response.data;
  }
);

export const runWinCriteria = createAsyncThunk(
  "players/win-check",
  async () => {
    const response = await playerAPIs.WinCheck();
    return response.data;
  }
);

export const runCloseContests = createAsyncThunk(
  "players/close-contest",
  async () => {
    const response = await playerAPIs.CloseContests();
    return response.data;
  }
);

export const fetchAsyncTopPlayer = createAsyncThunk(
  "players/top-player/fetch",
  async () => {
    const response = await playerAPIs.FetchTopPlayer();
    return response.data;
  }
);

export const fetchAsyncRecommendedPlayers = createAsyncThunk(
  "players/recommended-players/fetch",
  async (currentPlayerId: number) => {
    const response = await playerAPIs.FetchRecommendedPlayers(currentPlayerId);
    return response.data;
  }
);
