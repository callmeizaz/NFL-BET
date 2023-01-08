import { createAsyncThunk } from "@reduxjs/toolkit";
import { Register, ForgotPassword } from "../../services/api/registration";
import { RegisterPayloadInterface } from "../../typings/interfaces/register";
import { ForgotPasswordPayloadInterface } from "../../typings/interfaces/forgotpassword";

export const doAsyncRegistration = createAsyncThunk(
  "authentication/register",
  async (payload: RegisterPayloadInterface) => {
    const response = await Register(payload);
    return response.data;
  }
);

export const sendAsyncForgotPasswordEmail = createAsyncThunk(
  "authentication/forgotPassword",
  async (payload: ForgotPasswordPayloadInterface) => {
    const response = await ForgotPassword(payload);
    return response.data;
  }
);
