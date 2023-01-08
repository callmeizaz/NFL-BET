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
  ClaimContestPayloadInterface,
} from "../../typings/interfaces/leagueContests";

import { FullFilterInterface } from "../../typings/interfaces/common";
const apiUrl = process.env.REACT_APP_BASE_API_URL;

// Contest service
export const FetchContests = (fetchParams: FullFilterInterface) => {
  return axiosInstance({
    method: "GET",
    url: `league-contest`,
    params: fetchParams,
  });
};

export const FetchMyContests = (fetchParams: FullFilterInterface) => {
  return axiosInstance({
    method: "GET",
    url: `league-contest`,
    params: fetchParams,
  });
};

export const FetchPastContests = (fetchParams: FullFilterInterface) => {
  return axiosInstance({
    method: "GET",
    url: `league-contest`,
    params: fetchParams,
  });
};

export const FetchPublicContest = (fetchParams: PublicContestFilterPayload) => {
  return axiosInstance({
    method: "GET",
    url: `league-contest`,
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
    url: `league-contest/calculate/values`,
    data: spreadData,
  });
};

// Fetch contest values based on playerid, opponentid, type and entry
export const FetchContestValues = (
  contestData: ContestValuesPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-contest/calculate/values`,
    data: contestData,
  });
};

export const CreateContest = (contestData: CreateContestPayloadInterface) => {
  return axiosInstance({
    method: "POST",
    url: `league-contest`,
    data: contestData,
  });
};

export const ClaimContest = (contestData: ClaimContestPayloadInterface) => {
  return axiosInstance({
    method: "PATCH",
    url: `league-contest`,
    data: contestData,
  });
};
