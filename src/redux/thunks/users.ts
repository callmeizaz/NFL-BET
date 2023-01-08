import { createAsyncThunk } from "@reduxjs/toolkit";
import * as usersAPIS from "../../services/api/users";

import { UserPayloadInterface } from "../../typings/interfaces/contests";

import { SupportTicketPayloadInterface } from "../../typings/interfaces/support";
import { UserLocationPayloadInterface } from "../../typings/interfaces/location";
import { UserInfo } from "../../typings/interfaces/users";

export const fetchAsyncUserInfo = createAsyncThunk(
  "users/info",
  async (userData: UserPayloadInterface): Promise<UserInfo> => {
    const response = await usersAPIS.FetchUserInfo(userData);
    return response.data;
  }
);

export const sendAsyncSupportMessage = createAsyncThunk(
  "users/support",
  async (supportData: SupportTicketPayloadInterface) => {
    const response = await usersAPIS.SendSupportMessage(supportData);
    return response.data;
  }
);

export const fetchAsyncUserState = createAsyncThunk(
  "users/state",
  async (locationData: UserLocationPayloadInterface) => {
    const response = await usersAPIS.FetchUserState(locationData);
    return response;
  }
);
