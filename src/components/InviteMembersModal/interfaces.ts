import { LeaguePayload } from "../../typings/interfaces/leagues";

export interface InviteMemberModalProps {
  open: boolean;
  handleClose: Function;
  league: LeaguePayload;
}

export interface InviteMemberForm {
  invitees: [
    {
      email: string;
      team?: {
        label: string;
        value: {
          teamId: number;
        };
      } | null;
    }
  ];
}
