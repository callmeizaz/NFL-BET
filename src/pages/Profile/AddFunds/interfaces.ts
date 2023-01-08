import { FundingSourceData } from "../Wallet/interfaces";

export interface AddFundsProps {
  setTabIndex: Function;
}

export interface AddFundsForm {
  fundingSourceDetails: FundingSourceData | null;
  amount: number;
}

export interface WalletProps {}
