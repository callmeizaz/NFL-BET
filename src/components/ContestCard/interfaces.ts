export interface ContestsPayload {
  contestData: {
    "createdAt": string;
    "updatedAt": string;
    "id": number;
    "entryAmount": string;
    "creatorPlayerProjFantasyPoints": string;
    "claimerPlayerProjFantasyPoints": string;
    "creatorPlayerCover": string;
    "claimerPlayerCover": string;
    "creatorPlayerWinBonus": string;
    "claimerPlayerWinBonus": string;
    "creatorPlayerSpread": string;
    "claimerPlayerSpread": string;
    "creatorPlayerMaxWin": string;
    "claimerPlayerMaxWin": string;
    "spreadValue": string;
    "mlValue": string;
    "type": string;
    "status": string;
    "ended": boolean;
    "endedAt": string | null;
    "winnerLabel": string | null;
    "creatorWinAmount": string | null;
    "claimerWinAmount": string | null;
    "topPropProfit": string;
    "winnerId": number | null,
    "creatorId": number;
    "claimerId": number | null,
    "creatorPlayerId": number;
    "claimerPlayerId": number;
    "spreadId": number | null,
    "creator": {
      "id": number;
      "fullName": string;
      "username": string;
      "email": string;
      "_customerToken": string;
      "_connectToken": string;
      "accountConfirmedAt": string;
      "confirmAccountToken": string | null;
      "forgotPasswordToken": string | null;
      "forgotPasswordTokenExpiresIn": string | null;
      "socialId": string | null;
      "profileImage": string | null;
      "createdAt": string;
      "updatedAt": string;
    },
    "claimer": {
      "id": number;
      "fullName": string;
      "username": string;
      "email": string;
      "_customerToken": string;
      "_connectToken": string;
      "accountConfirmedAt": string;
      "confirmAccountToken": string | null;
      "forgotPasswordToken": string | null;
      "forgotPasswordTokenExpiresIn": string | null;
      "socialId": string | null;
      "profileImage": string | null;
      "createdAt": string;
      "updatedAt": string;
    },
    "creatorPlayer": {
      "createdAt": string;
      "updatedAt": string;
      "id": number;
      "remoteId": number;
      "firstName": string;
      "lastName": string;
      "fullName": string;
      "shortName": string;
      "status": string;
      "photoUrl": string;
      "photoUrlHiRes": string;
      "available": boolean;
      "position": string;
      "teamName": string;
      "opponentName": string | null,
      "homeOrAway": string | null;
      "hasStarted": boolean;
      "isOver": boolean;
      "fantasyPoints": string;
      "projectedFantasyPoints": string;
      "teamId": number;
    },
    "claimerPlayer": {
      "createdAt": string;
      "updatedAt": string;
      "id": number;
      "remoteId": number;
      "firstName": string;
      "lastName": string;
      "fullName": string;
      "shortName": string;
      "status": string;
      "photoUrl": string;
      "photoUrlHiRes": string;
      "available": boolean;
      "position": string;
      "teamName": string;
      "opponentName": string | null,
      "homeOrAway": string | null;
      "hasStarted": boolean;
      "isOver": boolean;
      "fantasyPoints": string;
      "projectedFantasyPoints": string;
      "teamId": number;
    }
  };
  handleContestClaimClick: Function;
  handleContestShareClick?: Function;
}
