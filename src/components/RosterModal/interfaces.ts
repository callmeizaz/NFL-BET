import { TeamData } from "../../typings/interfaces/leagues";

export interface RosterModalProps {
  open: boolean;
  handleClose: Function;
  currentTeam: TeamData | null;
}
