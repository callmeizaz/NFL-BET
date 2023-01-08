export interface ContestFilterPayload {
  filter: {
    where?: {
      status?: string;
      ended?: boolean;
      creatorId: {
        neq: number;
      };
    };
    include?: string[];
    order?: string;
  };
}

export interface MyContestFilterPayload {
  filter: {
    where?: {
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
    order?: string;
  };
}

export interface PublicContestFilterPayload {
  filter: {
    where?: {
      id?: number;
    };
    include?: string[];
    order?: string;
  };
}

export interface ContestsPayloadInterface {
  data: string;
}

export interface UserPayloadInterface {
  userId: string | number;
}

export interface SpreadPayloadInterface {
  playerId: number | undefined;
  opponentId: number | undefined;
  type: string;
}

export interface ContestValuesPayloadInterface {
  playerId: number | undefined;
  opponentId: number | undefined;
  entry: number;
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


export interface CloseContestPayloadInterface {
  contestId: number | null;
}
