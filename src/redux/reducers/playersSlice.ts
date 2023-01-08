import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  fetchAsyncPlayers,
  fetchAsyncOpponents,
  runFetchProjections,
  runFetchPoints,
  runWinCriteria,
  fetchAsyncTopPlayer,
  fetchAsyncRecommendedPlayers,
} from "../thunks/players";

import { PlayerData } from "../../typings/interfaces/players";

interface PlayersState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  playersData: object[] | null;
  opponentsData: object[] | null;
}

interface PlayersPayload {
  data: PlayerData[];
}
interface TopPlayerPayload {
  data: PlayerData;
}

interface RecommendedPlayersPayload {
  data: {
    currentPlayer: PlayerData;
    recommendations: PlayerData[];
  };
}

const initialState: PlayersState = {
  loading: "idle",
  playersData: [],
  opponentsData: [],
};

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
    resetPlayerData: (state) => {
      return { ...state, playersData: [] };
    },
    resetOpponentData: (state) => {
      return { ...state, opponentsData: [] };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncPlayers.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncPlayers.fulfilled,
        (state: RootState, action: PayloadAction<PlayersPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            playersData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncPlayers.rejected,
        (state: RootState, action: PayloadAction<PlayersPayload>) => {
          return {
            ...state,
            loading: "failed",
            playersData: [],
          };
        }
      )
      .addCase(fetchAsyncOpponents.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncOpponents.fulfilled,
        (state: RootState, action: PayloadAction<PlayersPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            opponentsData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncOpponents.rejected,
        (state: RootState, action: PayloadAction<PlayersPayload>) => {
          return {
            ...state,
            loading: "failed",
            opponentsData: [],
          };
        }
      )
      .addCase(runFetchProjections.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(runFetchProjections.fulfilled, (state: RootState) => {
        return {
          ...state,
          loading: "succeeded",
        };
      })
      .addCase(runFetchProjections.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(runFetchPoints.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(runFetchPoints.fulfilled, (state: RootState) => {
        return {
          ...state,
          loading: "succeeded",
        };
      })
      .addCase(runFetchPoints.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(runWinCriteria.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(runWinCriteria.fulfilled, (state: RootState) => {
        return {
          ...state,
          loading: "succeeded",
        };
      })
      .addCase(runWinCriteria.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(fetchAsyncTopPlayer.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncTopPlayer.fulfilled,
        (state: RootState, action: PayloadAction<TopPlayerPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            topPlayerData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncTopPlayer.rejected,
        (state: RootState, action: PayloadAction<TopPlayerPayload>) => {
          return {
            ...state,
            loading: "failed",
            TopPlayerData: [],
          };
        }
      )
      .addCase(fetchAsyncRecommendedPlayers.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncRecommendedPlayers.fulfilled,
        (state: RootState, action: PayloadAction<RecommendedPlayersPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            recommendedPlayersData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncRecommendedPlayers.rejected,
        (state: RootState, action: PayloadAction<RecommendedPlayersPayload>) => {
          return {
            ...state,
            loading: "failed",
            recommendedPlayersData: [],
          };
        }
      );
  },
});

export const { resetLoading, resetPlayerData, resetOpponentData } =
  playersSlice.actions;

export default playersSlice;
