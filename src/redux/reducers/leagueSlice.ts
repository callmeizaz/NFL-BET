import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  fetchAsyncLeagues,
  fetchAsyncLeagueById,
  doAsyncLeagueInvite,
  doAsyncFetchLeagueInvite,
  doAsyncJoinLeagueInvite,
  doAsyncSyncLeague,
  doAsyncFetchLeaguePublicInvite,
  doAsyncJoinLeaguePublicInvite,
} from "../thunks/leagues";

interface LeaguesState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  leaguesData: object[] | null;
  currentLeague: object | null;
  inviteData: object | null;
  syncLoading: "idle" | "pending" | "succeeded" | "failed";
}

interface LeaguesPayload {
  data: object[];
}

interface InvitePayload {
  data: object;
}

interface JoinPayload {
  data: {
    currentLeague: object;
    leagues: object[];
  };
}

const initialState: LeaguesState = {
  loading: "idle",
  leaguesData: null,
  currentLeague: null,
  inviteData: null,
  syncLoading: "idle",
};

export const leaguesSlice = createSlice({
  name: "leagues",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },

    resetLeagueData: (state) => {
      return { ...state, leaguesData: [] };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncLeagues.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          leaguesData: null,
        };
      })
      .addCase(
        fetchAsyncLeagues.fulfilled,
        (state: RootState, action: PayloadAction<LeaguesPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            leaguesData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncLeagues.rejected,
        (state: RootState, action: PayloadAction<LeaguesPayload>) => {
          return {
            ...state,
            loading: "failed",
            leaguesData: null,
          };
        }
      )

      .addCase(fetchAsyncLeagueById.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          currentLeague: null,
        };
      })
      .addCase(
        fetchAsyncLeagueById.fulfilled,
        (state: RootState, action: PayloadAction<LeaguesPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            currentLeague: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncLeagueById.rejected,
        (state: RootState, action: PayloadAction<LeaguesPayload>) => {
          return {
            ...state,
            loading: "failed",
            currentLeague: null,
          };
        }
      )
      .addCase(doAsyncLeagueInvite.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncLeagueInvite.fulfilled,
        (state: RootState, action: PayloadAction<LeaguesPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            currentLeague: action.payload.data,
          };
        }
      )
      .addCase(doAsyncLeagueInvite.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(doAsyncFetchLeagueInvite.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncFetchLeagueInvite.fulfilled,
        (state: RootState, action: PayloadAction<InvitePayload>) => {
          return {
            ...state,
            loading: "succeeded",
            inviteData: action.payload.data,
          };
        }
      )
      .addCase(doAsyncFetchLeagueInvite.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(doAsyncFetchLeaguePublicInvite.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncFetchLeaguePublicInvite.fulfilled,
        (state: RootState, action: PayloadAction<InvitePayload>) => {
          return {
            ...state,
            loading: "succeeded",
            inviteData: action.payload.data,
          };
        }
      )
      .addCase(doAsyncFetchLeaguePublicInvite.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(doAsyncJoinLeagueInvite.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncJoinLeagueInvite.fulfilled,
        (state: RootState, action: PayloadAction<JoinPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            currentLeague: action.payload.data.currentLeague,
            leaguesData: action.payload.data.leagues,
          };
        }
      )
      .addCase(doAsyncJoinLeagueInvite.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })

      .addCase(doAsyncJoinLeaguePublicInvite.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncJoinLeaguePublicInvite.fulfilled,
        (state: RootState, action: PayloadAction<JoinPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            currentLeague: action.payload.data.currentLeague,
            leaguesData: action.payload.data.leagues,
          };
        }
      )
      .addCase(doAsyncJoinLeaguePublicInvite.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })

      .addCase(doAsyncSyncLeague.pending, (state: RootState) => {
        return {
          ...state,
          syncLoading: "pending",
        };
      })
      .addCase(
        doAsyncSyncLeague.fulfilled,
        (state: RootState, action: PayloadAction<LeaguesPayload>) => {
          return {
            ...state,
            syncLoading: "succeeded",
            currentLeague: action.payload.data,
          };
        }
      )
      .addCase(doAsyncSyncLeague.rejected, (state: RootState) => {
        return {
          ...state,
          syncLoading: "failed",
        };
      });
  },
});

export const { resetLoading, resetLeagueData } = leaguesSlice.actions;

export default leaguesSlice;
