import { Player } from "./leagueContests";

export interface YahooLeaguesFetchPayloadInterface {
  code: string;
}

export interface ESPNLeaguesFetchPayloadInterface {
  espnS2: string;
  swid: string;
}

export interface YahooLeaguesImportPayloadInterface {
  leagueKey: string | null;
  accessToken: string | null;
  refreshToken: string | null;
  scoringTypeId: number | null;
}

export interface ESPNLeaguesImportPayloadInterface {
  leagueId: string | null;
  espnS2: string | null;
  swid: string | null;
}

export interface YahooLeaguesResyncPayloadInterface {
  leagueId: number;
  code: string;
}

export interface ESPNLeaguesResyncPayloadInterface {
  leagueId: number;
  espnS2: string | null;
  swid: string | null;
}

export interface LeagueFilterPayload {
  filter: {
    where?: {};
    include?: string[];
  };
}

export interface LeagueByIdFilterPayload {
  id: string;
}

export interface LeaguePayload {
  inviteToken: string | number;
  id: number;
  teams: [
    {
      id: number;
      name: string;
      userId: number;
    }
  ];
  members: [{}];
  userId: number;
}

export interface LeagueInviteMember {
  leagueId: number;
  invitees: {
    email: string;
    teamId: number | null;
  }[];
}

export interface FetchLeagueInvite {
  token: string;
}

export interface JoinLeagueInvite {
  inviteId: number;
}

export interface JoinLeaguePublicInvite {
  token: string;
}

export interface SyncLeaguePayloadInterface {
  leagueId: number;
}
// Mark's code
export interface CreateLeagueContestPayloadInterface {
  creatorTeamId: number | null;
  claimerTeamId: number | null;
  entryAmount: number;
  winBonus: boolean;
}

export interface LeagueData {
  data: object[];
}

export interface TeamData {
  abbr: string | null;
  createdAt: Date;
  id: number;
  leagueId: number;
  logoUrl: string;
  name: string;
  remoteId: string;
  slug: string | null;
  updatedAt: Date;
  wordMarkUrl: string;
  rosters?: Array<Player>;
  user?: User;
}
// End of Mark's code

export interface League {
  createdAt: string;
  updatedAt: string;
  id: number;
  remoteId: string;
  name: string;
  syncStatus: string;
  lastSyncTime: string;
  userId: number;
  scoringTypeId: number;
  importSourceId: number;
  teams?: TeamsEntity[] | null;
  members?: MembersEntity[] | null;
  scoringType: ScoringType;
}
export interface TeamsEntity {
  createdAt: string;
  updatedAt: string;
  id: number;
  abbr?: null;
  slug?: null;
  name: string;
  remoteId: string;
  logoUrl: string;
  wordMarkUrl: string;
  userId?: null;
  leagueId: number;
  rosters: Array<any>;
  user: User;
}
export interface MembersEntity {
  createdAt: string;
  updatedAt: string;
  id: number;
  leagueId: number;
  userId: number;
  user: User;
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
export interface ScoringType {
  createdAt: string;
  updatedAt: string;
  id: number;
  name: string;
}
