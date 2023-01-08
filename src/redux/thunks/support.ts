import { createAsyncThunk } from "@reduxjs/toolkit";
import * as supportAPIS from "../../services/api/support";
import { SupportTicketPayloadInterface } from "../../typings/interfaces/support";

export const doAsyncCreateSupportTicket = createAsyncThunk(
  "support/ticket",
  async (supportTicket: SupportTicketPayloadInterface) => {
    const response = await supportAPIS.FetchUserInfo(supportTicket);
    return response.data;
  }
);
