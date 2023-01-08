import { League, TeamData } from "../../../typings/interfaces/leagues";

export interface IProps {
  setCreateContestModalOpen: Function;
  handleContestShareClick: Function;
  currentLeague: League;
}

export interface ContestPayload {
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
  creatorTeamSpread: string;
  claimerTeamSpread: string;
  creatorTeamMaxWin: string;
  claimerTeamMaxWin: string;
  spreadValue: string;
  mlValue: string;
  type: string;
  status: string;
  ended: boolean;
  endedAt: string | null;
  winnerLabel: string | null;
  creatorWinAmount: string | null;
  claimerWinAmount: string | null;
  topPropProfit: string;
  winnerId: number | null;
  creatorId: number;
  claimerId: number | null;
  creatorTeamId: number;
  claimerTeamId: number;
  spreadId: number | null;
  creator: {
    id: number;
    fullName: string;
    username: string;
    email: string;
    _customerToken: string;
    _connectToken: string;
    accountConfirmedAt: string;
    confirmAccountToken: string | null;
    forgotPasswordToken: string | null;
    forgotPasswordTokenExpiresIn: string | null;
    socialId: string | null;
    profileImage: string | null;
    createdAt: string;
    updatedAt: string;
  };
  claimer: {
    id: number;
    fullName: string;
    username: string;
    email: string;
    _customerToken: string;
    _connectToken: string;
    accountConfirmedAt: string;
    confirmAccountToken: string | null;
    forgotPasswordToken: string | null;
    forgotPasswordTokenExpiresIn: string | null;
    socialId: string | null;
    profileImage: string | null;
    createdAt: string;
    updatedAt: string;
  };
  creatorTeam: TeamData;
  claimerTeam: TeamData;
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

export interface ContestsPayload {
  contestData: {
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
    creatorTeamSpread: string;
    claimerTeamSpread: string;
    creatorTeamMaxWin: string;
    claimerTeamMaxWin: string;
    spreadValue: string;
    mlValue: string;
    type: string;
    status: string;
    ended: boolean;
    endedAt: string | null;
    winnerLabel: string | null;
    creatorWinAmount: string | null;
    claimerWinAmount: string | null;
    topPropProfit: string;
    winnerId: number | null;
    creatorId: number;
    claimerId: number | null;
    creatorTeamId: number;
    claimerTeamId: number;
    spreadId: number | null;
    creator: {
      id: number;
      fullName: string;
      username: string;
      email: string;
      _customerToken: string;
      _connectToken: string;
      accountConfirmedAt: string;
      confirmAccountToken: string | null;
      forgotPasswordToken: string | null;
      forgotPasswordTokenExpiresIn: string | null;
      socialId: string | null;
      profileImage: string | null;
      createdAt: string;
      updatedAt: string;
    };
    claimer: {
      id: number;
      fullName: string;
      username: string;
      email: string;
      _customerToken: string;
      _connectToken: string;
      accountConfirmedAt: string;
      confirmAccountToken: string | null;
      forgotPasswordToken: string | null;
      forgotPasswordTokenExpiresIn: string | null;
      socialId: string | null;
      profileImage: string | null;
      createdAt: string;
      updatedAt: string;
    };
    creatorTeam: {
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
    };
    claimerTeam: {
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
    };
  }[];
}
