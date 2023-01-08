import { LeagueContest } from "../../typings/interfaces/leagueContests";

export interface ClaimLeagueContestModalProps {
  open: boolean;
  handleClose: Function;
  handleSubmit: Function;
  changeTabs: Function;
}

export interface ClaimContestForm {
  player: PlayerData | null;
  opponent: PlayerData | null;
  toWin: number;
  winBonus: boolean;
  coverSpread: boolean;
  entry: number;
  maxWin: number;
  spread: number;
  cover: number;
}

export interface PlayerData {
  createdAt: string;
  updatedAt: string;
  id: number;
  remoteId: number;
  firstName: string;
  lastName: string;
  fullName: string;
  shortName: string;
  status: string;
  photoUrl: string;
  photoUrlHiRes: string;
  available: boolean;
  position: string;
  teamName: string;
  opponentName: string | null;
  homeOrAway: string | null;
  hasStarted: boolean;
  isOver: boolean;
  fantasyPoints: string;
  projectedFantasyPoints: string;
  teamId: number;
}
