import { FundingSourceData } from "../Wallet/interfaces";

export interface WalletProps {}

export interface WithdrawFundsProps {}

export interface WithdrawFundsForm {
  fundingSourceDetails: FundingSourceData | null;
  amount: number;
}

export interface IBank {
  id: string;
  object: string;
  account_holder_name: string;
  account_holder_type: string;
  bank_name: string;
  country: string;
  currency: string;
  last4: string;
  name: string;
  routing_number: string;
  default_for_currency: boolean;
  status: string;
  type: string;
  used: boolean;
}

export interface BillingDetails {
  address: Address;
  email: null | string;
  name: string;
  phone: null;
}

export interface Address {
  city: null | string;
  country: string;
  line1: null | string;
  line2: null | string;
  postal_code: null | string;
  state: null | string;
}

export interface Card {
  brand: string;
  checks: Checks;
  country: string;
  exp_month: number;
  exp_year: number;
  fingerprint: string;
  funding: string;
  generated_from: null;
  last4: string;
  networks: Networks;
  three_d_secure_usage: ThreeDSecureUsage;
  wallet: null;
}

export interface Checks {
  address_line1_check: null;
  address_postal_code_check: null;
  cvc_check: string;
}

export interface Networks {
  available: string[];
  preferred: null;
}

export interface ThreeDSecureUsage {
  supported: boolean;
}

export interface Metadata {}
