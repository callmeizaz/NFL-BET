import { FetchLeagues } from "./../../services/api/leagues";
import { createAsyncThunk } from "@reduxjs/toolkit";
import * as importAPIs from "../../services/api/import";
import {
  YahooLeaguesFetchPayloadInterface,
  ESPNLeaguesFetchPayloadInterface,
  YahooLeaguesImportPayloadInterface,
  ESPNLeaguesImportPayloadInterface,
  YahooLeaguesResyncPayloadInterface,
  ESPNLeaguesResyncPayloadInterface,
} from "../../typings/interfaces/leagues";

export const fetchAsyncYahooLeagues = createAsyncThunk(
  "yahoo/league/fetch",
  async (payload: YahooLeaguesFetchPayloadInterface, { rejectWithValue }) => {
    try {
      const response = await importAPIs.FetchYahooLeagues(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const fetchAsyncESPNLeagues = createAsyncThunk(
  "espn/league/fetch",
  async (payload: ESPNLeaguesFetchPayloadInterface, { rejectWithValue }) => {
    try {
      const response = await importAPIs.FetchESPNLeagues(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const importAsyncYahooLeagues = createAsyncThunk(
  "yahoo/league/import",
  async (payload: YahooLeaguesImportPayloadInterface, { rejectWithValue }) => {
    try {
      const response = await importAPIs.ImportYahooLeague(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const importAsyncESPNLeagues = createAsyncThunk(
  "espn/league/import",
  async (payload: ESPNLeaguesImportPayloadInterface, { rejectWithValue }) => {
    try {
      const response = await importAPIs.ImportESPNLeague(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resyncAsyncYahooLeagues = createAsyncThunk(
  "yahoo/league/resync",
  async (payload: YahooLeaguesResyncPayloadInterface, { rejectWithValue }) => {
    try {
      const response = await importAPIs.ResyncYahooLeague(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);

export const resyncAsyncESPNLeagues = createAsyncThunk(
  "espn/league/resync",
  async (payload: ESPNLeaguesResyncPayloadInterface, { rejectWithValue }) => {
    try {
      const response = await importAPIs.ResyncESPNLeague(payload);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);
