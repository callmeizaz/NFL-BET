import { axiosInstance } from "../api";
import { PlayerFilterPayload } from "../../typings/interfaces/players";

// Players service
export const FetchPlayers = (fetchParams: PlayerFilterPayload) => {
  return axiosInstance({
    method: "GET",
    url: `players`,
    params: fetchParams,
  });
};

export const FetchProjections = () => {
  return axiosInstance({
    method: "GET",
    url: `crons/fetch-projections`,
  });
};

export const FetchPoints = () => {
  return axiosInstance({
    method: "GET",
    url: `crons/fetch-points`,
  });
};

export const WinCheck = () => {
  return axiosInstance({
    method: "GET",
    url: `crons/win-check`,
  });
};


export const CloseContests = () => {
  return axiosInstance({
    method: "GET",
    url: `crons/close-contests`,
  });
};

export const FetchTopPlayer = () => {
  return axiosInstance({
    method: "GET",
    url: `players/top`,
  });
};

export const FetchRecommendedPlayers = (currentPlayerId: number) => {
  return axiosInstance({
    method: "GET",
    url: `players/${currentPlayerId}/recommendations`,
  });
};
