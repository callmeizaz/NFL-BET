import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface CometPayload {
  data: object | null;
  auth: string | null;
  loading: "idle" | "pending" | "succeeded" | "failed";
  isLoggedIn: boolean;
  registrationData: object | null;
  userData: object | null;
}
interface LoginPayload {
  data: {
    token: string;
  };
}

// initial states
const initialState: CometPayload = {
  loading: "idle",
  isLoggedIn: false,
  data: null,
  auth: null,
  registrationData: null,
  userData: null,
};

interface RegistrationPayload {
  data: object;
}
export const cometAuthSlice = createSlice({
  name: "comet",
  initialState,
  reducers: {
    setCometUser: (state, action) => {
      return { ...state, userData: action.payload };
    },
  },
});

export const { setCometUser } = cometAuthSlice.actions;

export default cometAuthSlice;
