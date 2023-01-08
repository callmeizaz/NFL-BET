export interface ClaimContestModalProps {
  open: boolean;
  handleClose: Function;
}

export interface ShareContestModalProps {
  open: boolean;
  handleClose: Function;
  userId: number;
}

export interface ClaimContestForm {
  player: PlayerData | null;
  opponent: PlayerData | null;
  toWin: number | string;
  winBonus: boolean;
  coverSpread: boolean;
  entry: number | string;
  maxWin: number | string;
  spread: number;
  cover: number | string;
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
