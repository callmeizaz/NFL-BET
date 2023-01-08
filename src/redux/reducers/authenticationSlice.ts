import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import {
  doAsyncLogin,
  doAsyncRegistration,
  sendAsyncForgotPasswordEmail,
} from "../thunks/authentication";
import jwt_decode from "jwt-decode";

interface AuthenticationState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  userData: object | null;
  registrationData: object | null;
  token: string | null;
  type: string;
}

interface LoginPayload {
  data: {
    token: string;
    type: string;
    DWOLLA_ENV: string;
    COMET_APP_ID: string;
    COMET_AUTH_KEY: string;
    COMET_API_KEY: string;
    COMET_REGION: string;
    config: {
      name: string;
      abbr: string;
      appAccess: boolean;
      paidContests: boolean;
      minAge: number;
      weeklyDepositLimit: number;
      leaguesEnabled: boolean;
      battlegroundEnabled: boolean;
    };
  };
}

interface RegistrationPayload {
  data: object;
}

const initialState: AuthenticationState = {
  loading: "idle",
  userData: null,
  registrationData: null,
  token: null,
  type: "principle",
};

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
    logout: (state) => {
      localStorage.removeItem("token");
      return { ...state, userData: null, token: null };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(doAsyncLogin.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          userData: null,
          token: null,
        };
      })
      .addCase(
        doAsyncLogin.fulfilled,
        (
          state: RootState,
          { payload: { data } }: PayloadAction<LoginPayload>
        ) => {
          const {
            token,
            type,
            DWOLLA_ENV,
            COMET_APP_ID,
            COMET_AUTH_KEY,
            COMET_API_KEY,
            COMET_REGION,
            config,
          } = data;
          localStorage.setItem("token", token);
          const decoded = jwt_decode(token);
          return {
            ...state,
            loading: "succeeded",
            userData: decoded,
            token: token,
            type: type,
            DWOLLA_ENV: DWOLLA_ENV,
            COMET_APP_ID: COMET_APP_ID,
            COMET_AUTH_KEY: COMET_AUTH_KEY,
            COMET_API_KEY: COMET_API_KEY,
            COMET_REGION: COMET_REGION,
            config: config,
          };
        }
      )
      .addCase(
        doAsyncLogin.rejected,
        (state: RootState, action: PayloadAction<LoginPayload>) => {
          return {
            ...state,
            loading: "failed",
            userData: null,
            token: null,
          };
        }
      )
      .addCase(doAsyncRegistration.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          registrationData: null,
          token: null,
        };
      })
      .addCase(
        doAsyncRegistration.fulfilled,
        (state: RootState, action: PayloadAction<RegistrationPayload>) => {
          // var token = data;
          // var decoded = jwt_decode(token);
          return {
            ...state,
            loading: "succeeded",
            // userData: decoded,
            registrationData: action.payload,
            token: null,
          };
        }
      )
      .addCase(
        doAsyncRegistration.rejected,
        (state: RootState, action: PayloadAction<RegistrationPayload>) => {
          return {
            ...state,
            loading: "failed",
            registrationData: null,
            token: null,
          };
        }
      )
      .addCase(sendAsyncForgotPasswordEmail.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        sendAsyncForgotPasswordEmail.fulfilled,
        (state: RootState, action: PayloadAction<RegistrationPayload>) => {
          return {
            ...state,
            loading: "succeeded",
          };
        }
      )
      .addCase(
        sendAsyncForgotPasswordEmail.rejected,
        (state: RootState, action: PayloadAction<RegistrationPayload>) => {
          return {
            ...state,
            loading: "failed",
          };
        }
      );
  },
});

export const { resetLoading, logout } = authenticationSlice.actions;

export default authenticationSlice;
