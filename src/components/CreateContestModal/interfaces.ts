import { PlayerData } from "../../typings/interfaces/players";

export interface CreateContestModalProps {
  open: boolean;
  handleClose: Function;
  changeTabs: Function;
}

export interface CreateContestForm {
  player: PlayerData | null;
  opponent: PlayerData | null;
  entry: {
    label: string;
    value: number;
  } | null;
  winBonusFlag: boolean;
  spread: number;
  coverFlag: boolean;
  cover: number;
  winBonus: number;
  maxWin: number;
  nextScreen: boolean;
}

export interface ContestValuesPayloadInterface {
  playerId: number | undefined;
  opponentId: number | undefined;
  type: string;
  entry?: number;  
}
