import { createSlice, PayloadAction} from "@reduxjs/toolkit";
import type { RootState } from "../store";
import { doAsyncCreateSupportTicket } from "../thunks/support";


interface SupportState {
  loading: "idle" | "pending" | "succeeded" | "failed";
}
const initialState: SupportState = {
  loading: "idle",
};

export const registrationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(doAsyncCreateSupportTicket.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        doAsyncCreateSupportTicket.fulfilled,
        (state: RootState) => {
          return {
            ...state,
            loading: "succeeded",
          };
        }
      )
      .addCase(
        doAsyncCreateSupportTicket.rejected,
        (state: RootState) => {
          return {
            ...state,
            loading: "failed",
          };
        }
      );
  },
});

export const { resetLoading } = registrationSlice.actions;

export default registrationSlice;
