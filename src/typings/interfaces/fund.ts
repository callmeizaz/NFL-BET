export interface AddFundsInterface {
  userId: string;
  amount: number;
  sourceFundingSourceId: string;
}

export interface WithdrawFundInterface {
  userId: string;
  amount: number;
  destinationFundingSourceId: string;
}
