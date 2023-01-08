import { LeaguePayload, TeamData } from "../../typings/interfaces/leagues";

export interface Iprops {
  currentLeague: LeaguePayload;
}

export interface ITeamsprops {
  currentLeague: LeaguePayload;
  handleTeamClick: Function;
}

export interface IMemberprops {
  currentLeague: LeaguePayload;
}

export interface IRosterprops {
  currentTeam?: TeamData | null;
}
