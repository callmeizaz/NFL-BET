import { FilterInterface } from "./common";

export interface ContestFilterPayload {
  filter: FilterInterface;
}

export interface MyContestFilterPayload {
  filter: {
    where?: {
      userId: string;
      and?: [
        { ended?: boolean },
        { or?: [{ creatorId?: number }, { claimerId?: number }] },
        {
          or?: [{ status?: string }, { status?: string }, { status?: string }];
        }
      ];
    };
    include?: string[];
    order?: string;
  };
}

export interface PastContestFilterPayload {
  filter: {
    where?: {
      and?: [
        { ended?: boolean },
        { or?: [{ creatorId?: number }, { claimerId?: number }] },
        {
          or?: [{ status?: string }];
        }
      ];
    };
    include?: string[];
  };
}

export interface PublicContestFilterPayload {
  filter: {
    where?: {
      id?: number;
    };
    include?: string[];
  };
}

export interface ContestsPayloadInterface {
  data: string;
}

export interface UserPayloadInterface {
  userId: string;
}

export interface SpreadPayloadInterface {
  playerId: number | undefined;
  opponentId: number | undefined;
  type: string;
}

export interface ContestValuesPayloadInterface {
  claimerTeamId: number | undefined;
  creatorTeamId: number | undefined;
  entryAmount: number;
}

export interface ContestValuesInterface {
  withWinBonus: {
    spread: number;
    cover: number;
    winBonus: number;
  };
  withoutWinBonus: {
    spread: number;
    cover: number;
    winBonus: number;
  };
}

export interface ContestValuesResponseInterface {
  data: ContestValuesInterface;
}

export interface CreateContestPayloadInterface {
  creatorPlayerId: number | null;
  claimerPlayerId: number | null;
  entryAmount: number;
  winBonus: boolean;
}



export interface LeagueContest {
  createdAt: string;
  updatedAt: string;
  id: number;
  entryAmount: string;
  creatorTeamProjFantasyPoints: string;
  claimerTeamProjFantasyPoints: string;
  creatorTeamCover: string;
  claimerTeamCover: string;
  creatorTeamWinBonus: string;
  claimerTeamWinBonus: string;
  creatorTeamFantasyPoints?: null;
  claimerTeamFantasyPoints?: null;
  creatorTeamSpread: string;
  claimerTeamSpread: string;
  creatorTeamMaxWin: string;
  claimerTeamMaxWin: string;
  spreadValue: string;
  mlValue: string;
  type: string;
  status: string;
  ended: boolean;
  endedAt?: null;
  winnerLabel?: null;
  creatorWinAmount?: null;
  claimerWinAmount?: null;
  topPropProfit: string;
  winnerId?: null;
  creatorId: number;
  claimerId?: number | null;
  creatorTeamId: number;
  claimerTeamId: number;
  spreadId?: null;
  leagueId: number;
  creator: CreatorOrClaimer;
  claimer: CreatorOrClaimer;
  creatorTeam: CreatorTeam;
  claimerTeam: ClaimerTeam;
  claimerContestTeam: {
    contestRosters: [
      {
        player: {
          fullName: string;
        };
      }
    ];
  };
  creatorContestTeam: {
    contestRosters: [
      {
        player: {
          fullName: string;
        };
      }
    ];
  };
}
export interface CreatorOrClaimer {
  id: number;
  fullName: string;
  username: string;
  email: string;
  _customerToken?: string | null;
  _connectToken?: null;
  yahooAccessToken?: string | null;
  yahooRefreshToken?: string | null;
  espns2?: null;
  espnswid?: null;
  accountConfirmedAt: string;
  confirmAccountToken?: null;
  forgotPasswordToken?: null;
  forgotPasswordTokenExpiresIn?: null;
  socialId?: null;
  profileImage?: null;
  promo?: string | null;
  signUpState?: string | null;
  lastLoginState?: string | null;
  createdAt: string;
  updatedAt: string;
}
export interface CreatorTeam {
  createdAt: string;
  updatedAt: string;
  id: number;
  abbr?: null;
  slug?: null;
  name: string;
  remoteId: string;
  logoUrl: string;
  wordMarkUrl: string;
  userId?: number | null;
  leagueId: number;
  rosters?: (RostersEntity)[] | null;
  user?: User | null;
}
export interface RostersEntity {
  createdAt: string;
  updatedAt: string;
  id: number;
  displayPosition: string;
  teamId: number;
  playerId: number;
  player: Player;
}
export interface Player {
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
  opponentName: string;
  homeOrAway: string;
  hasStarted: boolean;
  isOver: boolean;
  fantasyPoints: string;
  fantasyPointsHalfPpr?: null;
  fantasyPointsFullPpr?: null;
  projectedFantasyPoints: string;
  teamId: number;
}
export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  _customerToken: string;
  _connectToken: string;
  yahooAccessToken: string;
  yahooRefreshToken: string;
  espns2?: null;
  espnswid?: null;
  accountConfirmedAt: string;
  confirmAccountToken?: null;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiresIn: string;
  socialId?: null;
  profileImage?: null;
  promo?: null;
  signUpState?: null;
  lastLoginState: string;
  createdAt: string;
  updatedAt: string;
}
export interface ClaimerTeam {
  createdAt: string;
  updatedAt: string;
  id: number;
  abbr?: null;
  slug?: null;
  name: string;
  remoteId: string;
  logoUrl: string;
  wordMarkUrl: string;
  userId: number;
  leagueId: number;
  rosters?: (RostersEntity1)[] | null;
  user: User1;
}
export interface RostersEntity1 {
  createdAt: string;
  updatedAt: string;
  id: number;
  displayPosition: string;
  teamId: number;
  playerId: number;
  player: Player1;
}
export interface Player1 {
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
  opponentName?: string | null;
  homeOrAway?: string | null;
  hasStarted: boolean;
  isOver: boolean;
  fantasyPoints: string;
  fantasyPointsHalfPpr?: null;
  fantasyPointsFullPpr?: null;
  projectedFantasyPoints: string;
  teamId: number;
}
export interface User1 {
  id: number;
  fullName: string;
  username: string;
  email: string;
  _customerToken: string;
  _connectToken: string;
  yahooAccessToken: string;
  yahooRefreshToken: string;
  espns2?: null;
  espnswid?: null;
  accountConfirmedAt: string;
  confirmAccountToken?: null;
  forgotPasswordToken: string;
  forgotPasswordTokenExpiresIn: string;
  socialId?: null;
  profileImage?: null;
  promo?: null;
  signUpState?: null;
  lastLoginState: string;
  createdAt: string;
  updatedAt: string;
}

export interface ClaimContestPayloadInterface {
  leagueContestId: number;
}
