import { axiosInstance } from "../api";
import {
  UserPayloadInterface,
  SpreadPayloadInterface,
  ContestValuesPayloadInterface,
  CreateContestPayloadInterface,
  ContestFilterPayload,
  MyContestFilterPayload,
  PastContestFilterPayload,
  PublicContestFilterPayload,
} from "../../typings/interfaces/contests";
const apiUrl = process.env.REACT_APP_BASE_API_URL;

// Contest service
export const FetchContests = (fetchParams: ContestFilterPayload) => {
  return axiosInstance({
    method: "GET",
    url: `contests`,
    params: fetchParams,
  });
};

export const FetchMyContests = (fetchParams: MyContestFilterPayload) => {
  return axiosInstance({
    method: "GET",
    url: `contests`,
    params: fetchParams,
  });
};

export const FetchPastContests = (fetchParams: PastContestFilterPayload) => {
  return axiosInstance({
    method: "GET",
    url: `contests`,
    params: fetchParams,
  });
};

export const FetchPublicContest = (fetchParams: PublicContestFilterPayload) => {
  return axiosInstance({
    method: "GET",
    url: `contests`,
    params: fetchParams,
  });
};

// Teams service
export const FetchTeams = () => {
  return axiosInstance({
    method: "GET",
    url: apiUrl + `players`,
  });
};

// Fetch spread based on playerid and opponentid
export const FetchSpread = (spreadData: SpreadPayloadInterface) => {
  return axiosInstance({
    method: "POST",
    url: `contests/calculate/values`,
    data: spreadData,
  });
};

// Fetch contest values based on playerid, opponentid, type and entry
export const FetchContestValues = (
  contestData: ContestValuesPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `contests/calculate/values`,
    data: contestData,
  });
};

export const CreateContest = (contestData: CreateContestPayloadInterface) => {
  return axiosInstance({
    method: "POST",
    url: `contests`,
    data: contestData,
  });
};

export const ClaimContest = (contestId: string) => {
  return axiosInstance({
    method: "PATCH",
    url: `contests`,
    data: {
      contestId: contestId,
    },
  });
};

export const CloseContest = (contestId: number) => {
  return axiosInstance({
    method: "POST",
    url: `contests/close`,
    data: {
      contestId: contestId,
    },
  });
};

export const FetchStatus = () => {
  return axiosInstance({
    method: "GET",
    url: `contests/status`,
  });
};
