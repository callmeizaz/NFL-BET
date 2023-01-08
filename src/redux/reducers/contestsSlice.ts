import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  fetchAsyncContests,
  fetchAsyncMyContests,
  fetchAsyncContestValues,
  doAsyncCreateContest,
  doAsyncClaimContest,
  fetchAsyncPastContests,
  fetchAsyncPublicContest,
  doAsyncCloseContest,
  fetchAsyncContestStatus,
} from "../thunks/contests";

import {
  ContestValuesResponseInterface,
  ContestValuesInterface,
} from "../../typings/interfaces/contests";

import { contestList } from "../../constants/mocked/contests";

interface ContestsState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  contestsData: object[] | null;
  myContestsData: object[] | null;
  pastContestsData: object[] | null;
  selectedContest: object | null;
  spread: number | null;
  contestValues: ContestValuesInterface;
  contestStatus: string;
}

interface ContestsPayload {
  data: object[];
}

interface WriteResponseContestsPayload {
  data: {
    contests: object[];
    myContests: object[];
  };
}

interface StatusPayload {
  data: { status: number };
}

const initialState: ContestsState = {
  loading: "idle",
  contestsData: null,
  myContestsData: null,
  pastContestsData: null,
  selectedContest: null,
  spread: 0,
  contestValues: {
    withWinBonus: {
      spread: 0,
      cover: 0,
      winBonus: 0,
    },
    withoutWinBonus: {
      spread: 0,
      cover: 0,
      winBonus: 0,
    },
  },
};

export const contestsSlice = createSlice({
  name: "contests",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
    selectContest: (state, { payload }) => {
      return { ...state, selectedContest: payload };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncContests.pending, (state: RootState, action: any) => {
        return {
          ...state,
          loading: "pending",
          contestsData: null,
        };
      })
      .addCase(
        fetchAsyncContests.fulfilled,
        (state: RootState, action: PayloadAction<ContestsPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            contestsData: action.payload.data,
            // contestsData: contestList,
          };
        }
      )
      .addCase(
        fetchAsyncContests.rejected,
        (state: RootState, action: PayloadAction<ContestsPayload>) => {
          return {
            ...state,
            loading: "failed",
            contestsData: null,
          };
        }
      )
      .addCase(
        fetchAsyncMyContests.pending,
        (state: RootState, action: any) => {
          return {
            ...state,
            loading: "pending",
            myContestsData: null,
          };
        }
      )
      .addCase(
        fetchAsyncMyContests.fulfilled,
        (state: RootState, action: PayloadAction<ContestsPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            myContestsData: action.payload.data,
            // myContestsData: contestList,
          };
        }
      )
      .addCase(
        fetchAsyncMyContests.rejected,
        (state: RootState, action: PayloadAction<ContestsPayload>) => {
          return {
            ...state,
            loading: "failed",
            myContestsData: null,
          };
        }
      )
      .addCase(
        fetchAsyncPastContests.pending,
        (state: RootState, action: any) => {
          return {
            ...state,
            loading: "pending",
            pastContestsData: null,
          };
        }
      )
      .addCase(
        fetchAsyncPastContests.fulfilled,
        (state: RootState, action: PayloadAction<ContestsPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            pastContestsData: action.payload.data,
            // myContestsData: contestList,
          };
        }
      )
      .addCase(
        fetchAsyncPastContests.rejected,
        (state: RootState, action: PayloadAction<ContestsPayload>) => {
          return {
            ...state,
            loading: "failed",
            pastContestsData: null,
          };
        }
      )
      .addCase(
        fetchAsyncContestValues.pending,
        (state: RootState, action: any) => {
          return {
            ...state,
            loading: "pending",
            spread: 0,
            contestValues: null,
          };
        }
      )
      .addCase(
        fetchAsyncContestValues.fulfilled,
        (
          state: RootState,
          action: PayloadAction<ContestValuesResponseInterface>
        ) => {
          return {
            ...state,
            loading: "succeeded",
            contestValues: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncContestValues.rejected,
        (state: RootState, action: PayloadAction<ContestsPayload>) => {
          return {
            ...state,
            loading: "failed",
            spread: null,
          };
        }
      )
      .addCase(doAsyncCreateContest.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncCreateContest.fulfilled,
        (
          state: RootState,
          action: PayloadAction<WriteResponseContestsPayload>
        ) => {
          return {
            ...state,
            loading: "succeeded",
            myContestsData: action.payload.data.myContests,
            contestsData: action.payload.data.contests,
          };
        }
      )
      .addCase(doAsyncCreateContest.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(doAsyncClaimContest.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncClaimContest.fulfilled,
        (
          state: RootState,
          action: PayloadAction<WriteResponseContestsPayload>
        ) => {
          return {
            ...state,
            loading: "succeeded",
            myContestsData: action.payload.data.myContests,
            contestsData: action.payload.data.contests,
          };
        }
      )
      .addCase(doAsyncClaimContest.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(doAsyncCloseContest.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncCloseContest.fulfilled,
        (
          state: RootState,
          action: PayloadAction<WriteResponseContestsPayload>
        ) => {
          return {
            ...state,
            loading: "succeeded",
            myContestsData: action.payload.data.myContests,
            contestsData: action.payload.data.contests,
          };
        }
      )
      .addCase(doAsyncCloseContest.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
        };
      })
      .addCase(fetchAsyncContestStatus.pending, (state: RootState) => {
        return {
          ...state,
          contestStatus: "loading",
        };
      })
      .addCase(
        fetchAsyncContestStatus.fulfilled,
        (state: RootState, action: PayloadAction<StatusPayload>) => {
          return {
            ...state,
            contestStatus: action.payload.data.status,
          };
        }
      )
      .addCase(fetchAsyncContestStatus.rejected, (state: RootState) => {
        return {
          ...state,
          contestStatus: "failed",
        };
      });
  },
});

export const { resetLoading, selectContest } = contestsSlice.actions;

export default contestsSlice;
