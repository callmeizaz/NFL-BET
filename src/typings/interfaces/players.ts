export interface PlayerFilterPayload {
  filter: {
    where?: {
      or?: [
        { firstName?: string | { like?: string } },
        { lastName?: string | { like?: string } },
        { fullName?: string | { like?: string } }
      ];
      name?: string | { like?: string };
      hasStarted?: boolean;
      isOver?: boolean;
      position?: { inq?: string[] };
      id?: { neq: number };
      available?: boolean;
      projectedFantasyPoints?: any;
      projectedFantasyPointsHalfPpr?: any;
      and?: {}[];
      status?: string;
    };
    limit?: number;
    order?: string;
    include?: [
      {
        relation: string;
      }
    ];
  };
}

export interface PlayerData {
  available: boolean;
  createdAt: Date;
  fantasyPoints: string;
  firstName: string;
  hasStarted: boolean;
  homeOrAway: string;
  id: number;
  isOver: boolean;
  lastName: string;
  fullName: string;
  opponentName: string;
  photoUrl: string;
  photoUrlHiRes: string;
  position: string;
  projectedFantasyPoints: string;
  remoteId: number;
  shortName: string;
  status: string;
  teamId: number;
  teamName: string;
  updatedAt: Date;
}
