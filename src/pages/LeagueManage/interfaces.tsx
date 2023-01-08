export interface LeagueContestsPayload {
  id:string,
  player: {
    photoUrl: string;
    name: string;
    team: {
      name: string;
      code: string;
    };
    position: string;
    entry: number;
    maxWin: number;
    spread: string;
  };
  opponent: {
    photoUrl: string;
    name: string;
    team: {
      name: string;
      code: string;
    };
    position: string;
    entry: number;
    maxWin: number;
    spread: string;
  };
  winBonus: boolean;
}
