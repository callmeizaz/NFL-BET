import { createSlice, PayloadAction, createReducer } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { sendAsyncForgotPasswordEmail } from "../thunks/register";


interface ForgotPasswordState {
  loading: "idle" | "pending" | "succeeded" | "failed";
}

interface RegistrationPayload {
  data: object;
}

const initialState: ForgotPasswordState = {
  loading: "idle",
};

export const forgotpasswordSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
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

export const { resetLoading } = forgotpasswordSlice.actions;

export default forgotpasswordSlice;
