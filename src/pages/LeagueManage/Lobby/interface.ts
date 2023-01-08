import { League } from "../../../typings/interfaces/leagues";

export interface IProps {
  handleContestClaimClick: Function;
  setCreateContestModalOpen: Function;
  currentLeague: League;
}
