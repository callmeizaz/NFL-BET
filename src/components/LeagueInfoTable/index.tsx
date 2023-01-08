import { Fragment, useState } from "react";

import Grid from "@material-ui/core/Grid";

import TeamTable from "./TeamTable";
import MemberTable from "./MemberTable";
import RosterModal from "./../RosterModal";

import { TeamData } from "../../typings/interfaces/leagues";
import { Iprops } from "./interfaces";

const LeagueInfoTable = ({ currentLeague }: Iprops) => {
  const [isRosterModalOpen, setRosterModalOpen] = useState(false);
  const [currentTeam, setCurrentTeam] = useState<TeamData | null>(null);

  const handleTeamClick = (selectedTeam: TeamData) => {
    setCurrentTeam(selectedTeam);
    setRosterModalOpen(true);
  };
  
  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={8}>
          <TeamTable
            currentLeague={currentLeague}
            handleTeamClick={handleTeamClick}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={4}>
          <MemberTable currentLeague={currentLeague} />
        </Grid>
      </Grid>
      <RosterModal
        open={isRosterModalOpen}
        handleClose={setRosterModalOpen}
        currentTeam={currentTeam}
      />
    </Fragment>
  );
};

export default LeagueInfoTable;
