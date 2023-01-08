import { WalletTransfer } from "../../components/TransfersTable/interfaces";
import {
  FundingSourceData,
  WalletInfo,
} from "../../pages/Profile/Wallet/interfaces";
import { RootState } from "../store";

export const selectWalletData = (state: RootState): WalletInfo =>
  state.wallet.walletData;
export const selectWalletFundsData = (state: RootState): number =>
  state.wallet.funds;
export const selectWalletFundingSourcesData = (
  state: RootState
): FundingSourceData[] => state.wallet.fundingSources;
export const selectWalletTransfersData = (state: RootState): WalletTransfer[] =>
  state.wallet.transfers;
export const selectCardsData = (state: RootState) => state.cards.cardsData;
export const selectCards = (state: RootState) => state.cards;
export const selectPayoutData = (state: RootState) =>
  state.payoutData.payoutData;
