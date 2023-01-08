import { FundingSourceData } from "../../pages/Profile/Wallet/interfaces";
export interface FundingSourceProps {
  fundingSource: FundingSourceData;
  selectedFundingSource: FundingSourceData | null;
  handleDeleteCard: Function;
}
