import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import { UserInfo } from "../../typings/interfaces/users";
import type { RootState } from "../store";
import {
  fetchAsyncUserInfo,
  sendAsyncSupportMessage,
  fetchAsyncUserState,
} from "../thunks/users";

//User Info interfaces
interface userInfoState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  userInfoData: UserInfo | null;
}

interface UserInfoPayload {
  data: object;
}

const initialUserInfoState: userInfoState = {
  loading: "idle",
  userInfoData: null,
};

// Suppport interfaces
interface supportState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  supportData: object | null;
}

interface supportPayload {
  data: object;
}

const initialLocationState: locationState = {
  loading: "idle",
  locationData: null,
};

// Location interfaces
interface locationState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  locationData: object | null;
}

interface locationPayload {
  data: object;
}

const initialSupportState: supportState = {
  loading: "idle",
  supportData: null,
};

// User Info Slice
export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: initialUserInfoState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncUserInfo.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          userInfoData: null,
        };
      })
      .addCase(
        fetchAsyncUserInfo.fulfilled,
        (state: RootState, action: PayloadAction<UserInfoPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            userInfoData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncUserInfo.rejected,
        (state: RootState, action: PayloadAction<UserInfoPayload>) => {
          return {
            ...state,
            loading: "failed",
            userInfoData: null,
          };
        }
      );
  },
});

//Suppport Slice
export const userSupportMessageSlice = createSlice({
  name: "support",
  initialState: initialSupportState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(sendAsyncSupportMessage.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          supportData: null,
        };
      })
      .addCase(
        sendAsyncSupportMessage.fulfilled,
        (state: RootState, action: PayloadAction<supportPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            supportData: action.payload.data,
          };
        }
      )
      .addCase(
        sendAsyncSupportMessage.rejected,
        (state: RootState, action: PayloadAction<supportPayload>) => {
          return {
            ...state,
            loading: "failed",
            supportData: null,
          };
        }
      );
  },
});

//User Location Slice
export const userStateSlice = createSlice({
  name: "state",
  initialState: initialLocationState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncUserState.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          locationData: null,
        };
      })
      .addCase(
        fetchAsyncUserState.fulfilled,
        (state: RootState, action: PayloadAction<locationPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            locationData: action.payload,
          };
        }
      )
      .addCase(
        fetchAsyncUserState.rejected,
        (state: RootState, action: PayloadAction<locationPayload>) => {
          return {
            ...state,
            loading: "failed",
            locationData: null,
          };
        }
      );
  },
});

export const { resetLoading } = userInfoSlice.actions;

export default userInfoSlice;
