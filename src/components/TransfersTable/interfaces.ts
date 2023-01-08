export interface TransfersData {
  data: WalletTransfer[];
}
export interface WalletTransfer {
  id?: string;
  status?: "processed" | "pending" | "cancelled" | "failed";
  amount: number;
  created?: string;
}
