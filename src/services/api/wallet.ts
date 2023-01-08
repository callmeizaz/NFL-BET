import { axiosInstance } from "../api";
import { UserPayloadInterface } from "../../typings/interfaces/contests";
import {
  AddFundsInterface,
  WithdrawFundInterface,
} from "../../typings/interfaces/fund";
import { IdentityVerificationFormPayload } from "../../typings/interfaces/identityverfication";
import { FileVerificationFormPayload } from "../../typings/interfaces/fileverification";
import { RemoveFundingSourcePayload } from "../../pages/Profile/Wallet/interfaces";

// Funds service
export const FetchUserWallet = (userData: UserPayloadInterface) => {
  const { userId } = userData;
  return axiosInstance({
    method: "GET",
    url: `/users/${userId}/wallet`,
  });
};

//*NO LONGER NEEDED
// export const CreateUserWallet = (userData: UserPayloadInterface) => {
//   const { userId } = userData;
//   return axiosInstance({
//     method: "POST",
//     url: `/users/${userId}/wallet`,
//   });
// };

export const FetchUserWalletFunds = (userData: UserPayloadInterface) => {
  const { userId } = userData;
  return axiosInstance({
    method: "GET",
    url: `/users/${userId}/wallet/funds`,
  });
};

export const FetchCards = (userData: UserPayloadInterface) => {
  const { userId } = userData;
  return axiosInstance({
    method: "GET",
    url: `/users/${userId}/wallet/payment-methods`,
  });
};

export const AddFunds = (AddFundData: AddFundsInterface) => {
  const { userId, amount, sourceFundingSourceId } = AddFundData;
  return axiosInstance({
    method: "POST",
    url: `/users/${userId}/wallet/funds`,
    data: {
      amount: amount,
      sourceFundingSourceId,
    },
  });
};

export const VerifyProfile = (
  IdVerificationData: IdentityVerificationFormPayload
) => {
  const { userId, identificationData } = IdVerificationData;
  return axiosInstance({
    method: "PATCH",
    url: `/users/${userId}/wallet`,
    data: identificationData,
  });
};

export const VerifyFile = (
  fileVerificationData: FileVerificationFormPayload
) => {
  const { userId, formData } = fileVerificationData;
  return axiosInstance({
    method: "POST",
    url: `/users/${userId}/wallet/verification-file`,
    headers: {
      "content-type": "multipart/form-data",
    },
    data: formData,
  });
};

export const RequestWithdrawal = (withdrawData: WithdrawFundInterface) => {
  const { userId, destinationFundingSourceId } = withdrawData;
  return axiosInstance({
    method: "POST",
    url: `/users/${userId}/withdraw-requests`,
    data: { destinationFundingSourceId },
  });
};

//*DWOLLA INTEGRATION
export const GenerateIavUserToken = (userData: UserPayloadInterface) => {
  const { userId } = userData;
  return axiosInstance({
    method: "POST",
    url: `/users/${userId}/wallet/account-verification-token`,
  });
};

export const RemoveFundingSource = (userData: RemoveFundingSourcePayload) => {
  const { userId, fundingSourceId } = userData;
  return axiosInstance({
    method: "DELETE",
    url: `/users/${userId}/wallet/funding-sources/${fundingSourceId}`,
  });
};

export const FetchUserFundingSources = (userData: UserPayloadInterface) => {
  const { userId } = userData;
  return axiosInstance({
    method: "GET",
    url: `/users/${userId}/wallet/funding-sources`,
  });
};
export const FetchUserTransfers = (userData: UserPayloadInterface) => {
  const { userId } = userData;
  return axiosInstance({
    method: "GET",
    url: `/users/${userId}/wallet/transfers`,
  });
};
