import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { fetchAsyncTeams } from "../thunks/teams";

interface TeamsState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  teamsData: object[] | null;
}

interface TeamsPayload {
  data: object[];
}

const initialState: TeamsState = {
  loading: "idle",
  teamsData: null,
};

export const teamsSlice = createSlice({
  name: "contests",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncTeams.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          teamsData: null,
        };
      })
      .addCase(
        fetchAsyncTeams.fulfilled,
        (state: RootState, action: PayloadAction<TeamsPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            teamsData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncTeams.rejected,
        (state: RootState, action: PayloadAction<TeamsPayload>) => {
          return {
            ...state,
            loading: "failed",
            teamsData: null,
          };
        }
      );
  },
});

export const { resetLoading } = teamsSlice.actions;

export default teamsSlice;
