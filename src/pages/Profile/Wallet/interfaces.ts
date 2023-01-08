import { UserPayloadInterface } from "../../../typings/interfaces/leagueContests";

export interface WalletProps {
  setTabIndex: Function;
}
export interface AddFundsForm {
  fundingSourceDetails: FundingSourceData | null;
  amount: number;
}

export interface Metadata {}

export interface RemoveFundingSourcePayload extends UserPayloadInterface {
  fundingSourceId: string;
}

export interface WalletInfo {
  id: string;
  status: string;
  created: string;

  firstName: string;
  lastName: string;
  email: string;
  ipAddress: string;
  businessName?: string;
  correlationId: string;

  //VERIFIED USER
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  phone?: string;
  dateOfBirth?: string;
  ssn?: string;
  type?: string;
}

export interface FundingSourceData {
  bankAccountType: string;
  bankName: string;
  created: string;
  id: string;
  status: string;
  type: string;
  name: string;
}

export interface TransferData {
  id: string;
  status: "processed" | "pending" | "cancelled" | "failed";
  amount: number;
  created?: string;
}
