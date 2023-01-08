import { axiosInstance } from "../api";
import {
  LeagueByIdFilterPayload,
  LeagueInviteMember,
  FetchLeagueInvite,
  JoinLeagueInvite,
  SyncLeaguePayloadInterface,
  JoinLeaguePublicInvite
} from "../../typings/interfaces/leagues";
import { LeagueFilterPayload } from "../../typings/interfaces/leagues";
import { CreateLeagueContestPayloadInterface } from "./../../typings/interfaces/leagues";

export const FetchLeagues = () => {
  return axiosInstance({
    method: "GET",
    url: `league`,
  });
};

export const FetchLeaguesById = (payload: LeagueByIdFilterPayload) => {
  return axiosInstance({
    method: "GET",
    url: `league/${payload.id}`,
  });
};

export const SendLeagueInvites = (payload: LeagueInviteMember) => {
  return axiosInstance({
    method: "POST",
    url: `league/${payload.leagueId}/invite`,
    data: payload,
  });
};

export const FetchLeagueInviteByToken = (payload: FetchLeagueInvite) => {
  return axiosInstance({
    method: "POST",
    url: `league/invite/`,
    data: payload,
  });
};

export const FetchLeaguePublicInviteByToken = (payload: FetchLeagueInvite) => {
  return axiosInstance({
    method: "POST",
    url: `league/public-invite/`,
    data: payload,
  });
};

export const JoinLeagueInviteById = (payload: JoinLeagueInvite) => {
  return axiosInstance({
    method: "POST",
    url: `league/join/`,
    data: payload,
  });
};

export const JoinLeaguePublicInviteByToken = (payload: JoinLeaguePublicInvite) => {
  return axiosInstance({
    method: "POST",
    url: `league/public-join/`,
    data: payload,
  });
};



export const CreateLeagueContest = (
  leagueContestData: CreateLeagueContestPayloadInterface
) => {
  return axiosInstance({
    method: "POST",
    url: `league-contest`,
    data: leagueContestData,
  });
};

export const SyncLeague = (leagueData: SyncLeaguePayloadInterface) => {
  return axiosInstance({
    method: "PATCH",
    url: `league/resync`,
    data: leagueData,
  });
};

export const WinCheck = () => {
  return axiosInstance({
    method: "GET",
    url: `crons/league-win-check`,
  });
};


export const CloseContests = () => {
  return axiosInstance({
    method: "GET",
    url: `crons/league-close-contests`,
  });
};
