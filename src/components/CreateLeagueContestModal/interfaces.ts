import { TeamData } from "../../typings/interfaces/leagues";

export interface IProps {
  open: boolean;
  handleClose: Function;
    changeTabs: Function;
}

export interface CreateLeagueContestForm {
  creatorTeam: {
    label: string;
    value: TeamData;
  } | null;
  claimerTeam: {
    label: string;
    value: TeamData;
  } | null;
  entry: {
    label: string;
    value: number;
  } | null;
  winBonusFlag: boolean;
  // spread: number;
  // coverFlag: boolean;
  // cover: number;
  winBonus: number;
  // maxWin: number;
  // nextScreen: boolean;
  currentScreen: string;
}

export interface LeagueContestValuesPayloadInterface {
  teamId: number | undefined;
  opponentId: number | undefined;
  type: string;
  entry: number;
}

// export interface ContestValuesPayloadInterface {
//   playerId: number | undefined;
//   opponentId: number | undefined;
//   type: string;
//   entry: number;
// }

// {
//   "creatorTeamId": 1,
//   "claimerTeamId": 2,
//   "entryAmount": 200,
//   "winBonus": true
//   }
