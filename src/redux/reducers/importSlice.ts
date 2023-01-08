import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  fetchAsyncYahooLeagues,
  fetchAsyncESPNLeagues,
  importAsyncYahooLeagues,
  importAsyncESPNLeagues,
} from "../thunks/import";

interface ImportState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  yahooLeagues: object[] | null;
  yahooTokens: {
    accessToken: string;
    refreshToken: string;
  } | null;
}

interface YahooLeaguesPayload {
  data: {
    leagues: [
      {
        logo_url: string | boolean;
      }
    ];
    tokens: {
      accessToken: string;
      refreshToken: string;
    };
  };
}

interface ESPNLeaguesPayload {
  data: {
    leagues: [
      {
        logo_url: string | boolean;
      }
    ];
  };
}

const initialState: ImportState = {
  loading: "idle",
  yahooLeagues: null,
  yahooTokens: null,
};

const importSlice = createSlice({
  name: "import",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncYahooLeagues.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncYahooLeagues.fulfilled,
        (state: RootState, action: PayloadAction<YahooLeaguesPayload>) => {
          const {
            payload: { data },
          } = action;

          const yahooleagues = data.leagues;
          const tokens = data.tokens;

          const leagues = yahooleagues.map((league: any, index: number) => {
            return {
              ...league,
              logo_url:
                league.logo_url ||
                `https://g.espncdn.com/lm-static/ffl/images/default_logos/${
                  index + 1
                }.svg`,
            };
          });

          return {
            ...state,
            loading: "succeeded",
            yahooLeagues: leagues,
            yahooTokens: tokens,
          };
        }
      )
      .addCase(fetchAsyncYahooLeagues.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(fetchAsyncESPNLeagues.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncESPNLeagues.fulfilled,
        (state: RootState, action: PayloadAction<ESPNLeaguesPayload>) => {
          const {
            payload: { data },
          } = action;

          const leagues = data.leagues;

          return {
            ...state,
            loading: "succeeded",
            espnLeagues: leagues,
          };
        }
      )
      .addCase(fetchAsyncESPNLeagues.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(importAsyncYahooLeagues.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(importAsyncYahooLeagues.fulfilled, (state: RootState) => {
        return {
          ...state,
          loading: "succeeded",
        };
      })
      .addCase(importAsyncYahooLeagues.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(importAsyncESPNLeagues.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(importAsyncESPNLeagues.fulfilled, (state: RootState) => {
        return {
          ...state,
          loading: "succeeded",
        };
      })
      .addCase(importAsyncESPNLeagues.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      });
  },
});

export const { resetLoading } = importSlice.actions;

export default importSlice;
