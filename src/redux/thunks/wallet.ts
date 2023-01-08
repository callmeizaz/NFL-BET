import { createAsyncThunk } from "@reduxjs/toolkit";
import * as walletAPIS from "../../services/api/wallet";

import { UserPayloadInterface } from "../../typings/interfaces/contests";
import {
  AddFundsInterface,
  WithdrawFundInterface,
} from "../../typings/interfaces/fund";

import { IdentityVerificationFormPayload } from "../../typings/interfaces/identityverfication";

import { FileVerificationFormPayload } from "../../typings/interfaces/fileverification";
import {
  FundingSourceData,
  RemoveFundingSourcePayload,
  TransferData,
  WalletInfo,
} from "../../pages/Profile/Wallet/interfaces";

export const fetchAsyncWallet = createAsyncThunk(
  "wallet/info",
  async (userData: UserPayloadInterface): Promise<WalletInfo> => {
    const response = await walletAPIS.FetchUserWallet(userData);
    return response.data;
  }
);

//*NO LONGER NEEDED

export const fetchAsyncWalletFunds = createAsyncThunk(
  "wallet/funds",
  async (userData: UserPayloadInterface): Promise<string> => {
    const response = await walletAPIS.FetchUserWalletFunds(userData);
    return response.data;
  }
);

export const addAsyncWalletFunds = createAsyncThunk(
  "wallet/addFunds",
  async (addFundsPayload: AddFundsInterface) => {
    const response = await walletAPIS.AddFunds(addFundsPayload);
    return response.data;
  }
);

export const addAsyncIdVerification = createAsyncThunk(
  "wallet/profileVerification",
  async (payload: IdentityVerificationFormPayload) => {
    const response = await walletAPIS.VerifyProfile(payload);
    return response.data;
  }
);

export const verifyAsyncFile = createAsyncThunk(
  "wallet/fileVerification",
  async (payload: FileVerificationFormPayload) => {
    const response = await walletAPIS.VerifyFile(payload);
    return response.data;
  }
);

export const requestAsyncWithdrawal = createAsyncThunk(
  "withdraw/request",
  async (withdrawData: WithdrawFundInterface) => {
    const response = await walletAPIS.RequestWithdrawal(withdrawData);
    return response.data;
  }
);

//*DWOLLA INTEGRATION
export const generateAsyncIavToken = createAsyncThunk(
  "wallet/generateIavToken",
  async (userData: UserPayloadInterface) => {
    const response = await walletAPIS.GenerateIavUserToken(userData);
    return response.data;
  }
);
export const removeAsyncFundingSource = createAsyncThunk(
  "fundingSources/remove",
  async (removeData: RemoveFundingSourcePayload) => {
    const response = await walletAPIS.RemoveFundingSource(removeData);
    return response.data;
  }
);
export const fetchAsyncFundingSources = createAsyncThunk(
  "fundingSources/fetch",
  async (userData: UserPayloadInterface): Promise<FundingSourceData[]> => {
    const response = await walletAPIS.FetchUserFundingSources(userData);
    return response.data;
  }
);
export const fetchAsyncTransfers = createAsyncThunk(
  "transfers/fetch",
  async (userData: UserPayloadInterface): Promise<TransferData[]> => {
    const response = await walletAPIS.FetchUserTransfers(userData);
    return response.data;
  }
);
