export interface ContestsPayload {
  contestData: {
    createdAt: string;
    updatedAt: string;
    id: number;
    entryAmount: string;
    creatorPlayerProjFantasyPoints: string;
    claimerPlayerProjFantasyPoints: string;
    creatorPlayerCover: string;
    claimerPlayerCover: string;
    creatorPlayerWinBonus: string;
    claimerPlayerWinBonus: string;
    creatorPlayerSpread: string;
    claimerPlayerSpread: string;
    creatorPlayerMaxWin: string;
    claimerPlayerMaxWin: string;
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
    creatorPlayerId: number;
    claimerPlayerId: number;
    winLoseDraw: string | null;
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
    creatorPlayer: {
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
    claimerPlayer: {
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
    myDetails: {
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
    theirDetails: {
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
    myTeam: {
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
      logoUrl: string;
      name: string;
      user: {
        fullName: string;
      };
    };
    theirTeam: {
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
      logoUrl: string;
      name: string;
      user: {
        fullName: string;
      };
    };
    myContestTeam: {
      contestRosters: [
        {
          player: {
            fullName: string;
          };
        }
      ];
    };
    theirContestTeam: {
      contestRosters: [
        {
          player: {
            fullName: string;
          };
        }
      ];
    };
    myTeamMaxWin: number | string;
    theirTeamMaxWin: number | string;
    myTeamCover: number | string | null;
    theirTeamCover: number | string | null;
    myTeamSpread: number | string;
    theirTeamSpread: number | string;
  };
  handleContestClaimClick?: Function;
  handleContestShareClick?: Function;
}
