import { createAsyncThunk } from "@reduxjs/toolkit";
import * as authenticationAPIs from "../../services/api/authentication";
import {
  LoginPayloadInterface,
  RegisterPayloadInterface,
  ForgotPasswordPayloadInterface,
  ResetPasswordPayloadInterface
} from "../../typings/interfaces/authentication";


export const doAsyncLogin = createAsyncThunk(
  "authentication/login",
  async (payload: LoginPayloadInterface) => {
    const response = await authenticationAPIs.Login(payload);
    return response.data;
  }
);

export const doAsyncRegistration = createAsyncThunk(
  "authentication/register",
  async (payload: RegisterPayloadInterface) => {
    const response = await authenticationAPIs.Register(payload);
    return response.data;
  }
);

export const sendAsyncForgotPasswordEmail = createAsyncThunk(
  "authentication/forgotPassword",
  async (payload: ForgotPasswordPayloadInterface) => {
    const response = await authenticationAPIs.ForgotPassword(payload);
    return response.data;
  }
);

export const sendAsyncResetPassword = createAsyncThunk(
  "authentication/resetPassword",
  async (payload: ResetPasswordPayloadInterface) => {
    const response = await authenticationAPIs.ResetPassword(payload);
    return response.data;
  }
);

// export const fetchUsers = () => async (dispatch) => {
//   dispatch(actionCreators.usersLoading());
//   const response = await authenticationAPIs.fetchAll();
//   dispatch(actionCreators.usersReceived(response.data));
// };
