import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  FundingSourceData,
  TransferData,
  WalletInfo,
} from "../../pages/Profile/Wallet/interfaces";
import type { RootState } from "../store";

import {
  fetchAsyncWallet,
  fetchAsyncWalletFunds,
  addAsyncWalletFunds,
  addAsyncIdVerification,
  verifyAsyncFile,
  requestAsyncWithdrawal,
  generateAsyncIavToken,
  removeAsyncFundingSource,
  fetchAsyncFundingSources,
  fetchAsyncTransfers,
} from "../thunks/wallet";

interface walletState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  walletData: object | null;
  funds: number;
  fundingSources: FundingSourceData[];
  transfers: TransferData[];
}

interface WalletPayload {
  data: WalletInfo;
}

interface WalletFundsPayload {
  data: { data: number };
}
interface WalletFundingSourcesPayload {
  data: FundingSourceData[];
}
interface WalletTransfersPayload {
  data: TransferData[];
}

const initialWalletState: walletState = {
  loading: "idle",
  walletData: null,
  funds: 0,
  fundingSources: [],
  transfers: [],
};

interface addFundState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  addFundsData: object | null;
}

interface AddFundPayload {
  data: object;
}

const initialAddFundState: addFundState = {
  loading: "idle",
  addFundsData: null,
};

interface CardState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  newCardData: object | null;
}

interface CardPayload {
  data: object;
}

const initialCardState: CardState = {
  loading: "idle",
  newCardData: null,
};

interface FetchCardState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  cardsData: object[] | null;
}

interface FetchCardPayload {
  data: object[];
}

const initialFetchCardState: FetchCardState = {
  loading: "idle",
  cardsData: null,
};

interface newCardState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  newCardData: object | null;
}

interface NewCardPayload {
  data: object;
}

const initialNewCardState: newCardState = {
  loading: "idle",
  newCardData: null,
};

interface profileInfoState {
  loading: "idle" | "pending" | "succeeded" | "failed";
}

interface profileInfoPayload {
  data: object;
}

const initialProfileState: profileInfoState = {
  loading: "idle",
};

interface PayoutState {
  loading: "idle" | "pending" | "succeeded" | "failed";
  newPayoutData: object | null;
}

interface PayoutPayload {
  data: object;
}

const initialPayoutState: PayoutState = {
  loading: "idle",
  newPayoutData: null,
};

interface WithdrawlRequestState {
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialWithdrawlRequestState: WithdrawlRequestState = {
  loading: "idle",
};

interface WithdrawlRequestPayload {
  data: object;
}

//* DWOLLA INTEGRATION

interface GenerateIavTokenPayload {
  data: string;
}

export const walletSlice = createSlice({
  name: "wallet",
  initialState: initialWalletState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchAsyncWallet.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncWallet.fulfilled,
        (state: RootState, action: PayloadAction<WalletPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            walletData: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncWallet.rejected,
        (state: RootState, action: PayloadAction<WalletPayload>) => {
          return {
            ...state,
            loading: "failed",
            walletData: null,
          };
        }
      )
      // .addCase(createAsyncWallet.pending, (state: RootState) => {
      //   return {
      //     ...state,
      //     loading: "pending",
      //   };
      // })
      // .addCase(
      //   createAsyncWallet.fulfilled,
      //   (state: RootState, action: PayloadAction<WalletPayload>) => {
      //     return {
      //       ...state,
      //       loading: "succeeded",
      //     };
      //   }
      // )
      // .addCase(
      //   createAsyncWallet.rejected,
      //   (state: RootState, action: PayloadAction<WalletPayload>) => {
      //     return {
      //       ...state,
      //       loading: "failed",
      //     };
      //   }
      // )
      .addCase(fetchAsyncWalletFunds.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        fetchAsyncWalletFunds.fulfilled,
        (state: RootState, action: PayloadAction<WalletFundsPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            funds: action.payload.data,
          };
        }
      )
      .addCase(fetchAsyncWalletFunds.rejected, (state: RootState) => {
        return {
          ...state,
          loading: "failed",
          funds: 0,
        };
      })
      .addCase(generateAsyncIavToken.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        generateAsyncIavToken.fulfilled,
        (state: RootState, action: PayloadAction<GenerateIavTokenPayload>) => {
          return {
            ...state,
            loading: "succeeded",
          };
        }
      )
      .addCase(
        generateAsyncIavToken.rejected,
        (state: RootState, action: PayloadAction<GenerateIavTokenPayload>) => {
          return {
            ...state,
            loading: "failed",
          };
        }
      )
      .addCase(removeAsyncFundingSource.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        removeAsyncFundingSource.fulfilled,
        (state: RootState, action: PayloadAction) => {
          return {
            ...state,
            loading: "succeeded",
          };
        }
      )
      .addCase(
        removeAsyncFundingSource.rejected,
        (state: RootState, action: PayloadAction) => {
          return {
            ...state,
            loading: "failed",
          };
        }
      )
      .addCase(
        fetchAsyncFundingSources.rejected,
        (state: RootState, action: PayloadAction) => {
          return {
            ...state,
            loading: "failed",
            fundingSources: [],
          };
        }
      )
      .addCase(
        fetchAsyncFundingSources.pending,
        (state: RootState, action: PayloadAction) => {
          return {
            ...state,
            loading: "pending",
          };
        }
      )
      .addCase(
        fetchAsyncFundingSources.fulfilled,
        (
          state: RootState,
          action: PayloadAction<WalletFundingSourcesPayload>
        ) => {
          return {
            ...state,
            loading: "succeeded",
            fundingSources: action.payload.data,
          };
        }
      )
      .addCase(
        fetchAsyncTransfers.rejected,
        (state: RootState, action: PayloadAction) => {
          return {
            ...state,
            loading: "failed",
            transfers: [],
          };
        }
      )
      .addCase(
        fetchAsyncTransfers.pending,
        (state: RootState, action: PayloadAction) => {
          return {
            ...state,
            loading: "pending",
          };
        }
      )
      .addCase(
        fetchAsyncTransfers.fulfilled,
        (state: RootState, action: PayloadAction<WalletTransfersPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            transfers: action.payload.data,
          };
        }
      );
  },
});

export const addFundSlice = createSlice({
  name: "addFunds",
  initialState: initialAddFundState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(addAsyncWalletFunds.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
          addFundsData: null,
        };
      })
      .addCase(
        addAsyncWalletFunds.fulfilled,
        (state: RootState, action: PayloadAction<WalletPayload>) => {
          return {
            ...state,
            loading: "succeeded",
            addFundsData: action.payload.data,
          };
        }
      )
      .addCase(
        addAsyncWalletFunds.rejected,
        (state: RootState, action: PayloadAction<WalletPayload>) => {
          return {
            ...state,
            loading: "failed",
            addFundsData: null,
          };
        }
      );
  },
});

export const addProfileInfoSlice = createSlice({
  name: "addProfile",
  initialState: initialProfileState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(
        addAsyncIdVerification.pending,
        (state: RootState, action: any) => {
          return {
            ...state,
            loading: "pending",
          };
        }
      )
      .addCase(
        addAsyncIdVerification.fulfilled,
        (state: RootState, action: PayloadAction<profileInfoPayload>) => {
          return {
            ...state,
            loading: "succeeded",
          };
        }
      )
      .addCase(
        addAsyncIdVerification.rejected,
        (state: RootState, action: PayloadAction<profileInfoPayload>) => {
          return {
            ...state,
            loading: "failed",
          };
        }
      );
  },
});

export const verifyFileSlice = createSlice({
  name: "verifyFile",
  initialState: initialProfileState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(verifyAsyncFile.pending, (state: RootState, action: any) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        verifyAsyncFile.fulfilled,
        (state: RootState, action: PayloadAction<profileInfoPayload>) => {
          return {
            ...state,
            loading: "succeeded",
          };
        }
      )
      .addCase(
        verifyAsyncFile.rejected,
        (state: RootState, action: PayloadAction<profileInfoPayload>) => {
          return {
            ...state,
            loading: "failed",
          };
        }
      );
  },
});

export const requestWithdrawalSlice = createSlice({
  name: "requestWithdrawal",
  initialState: initialWithdrawlRequestState,
  reducers: {
    resetLoading: (state) => {
      return { ...state, loading: "idle" };
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(requestAsyncWithdrawal.pending, (state: RootState) => {
        return {
          ...state,
          loading: "pending",
        };
      })
      .addCase(
        requestAsyncWithdrawal.fulfilled,
        (state: RootState, action: PayloadAction<WithdrawlRequestPayload>) => {
          return {
            ...state,
            loading: "succeeded",
          };
        }
      )
      .addCase(
        requestAsyncWithdrawal.rejected,
        (state: RootState, action: PayloadAction<WithdrawlRequestPayload>) => {
          return {
            ...state,
            loading: "failed",
          };
        }
      );
  },
});

export const { resetLoading } = walletSlice.actions;

export default walletSlice;
